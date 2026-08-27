from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.app.database import get_db
from backend.app.models.application import Application
from backend.app.models.job import Job, JobMatch
from backend.app.models.resume import ResumeRecord
from backend.app.schemas.application import (
    ApplicationResponse,
    ApplicationPrepareRequest,
    ApplicationSubmitRequest,
    BatchApproveRequest
)
from backend.app.services.cv_parser import get_or_init_master_profile
from backend.app.services.resume_generator import generate_role_specific_resume_content
from backend.app.services.pdf_service import generate_ats_resume_pdf
from backend.app.services.automation.app_preparer import prepare_job_application_fields
from backend.app.services.automation.indeed_adapter import PlaywrightIndeedAdapter
from backend.app.services.automation.mock_adapter import MockPlatformAdapter
from backend.app.services.tracking_service import transition_application_status, log_audit_action
from backend.app.config import settings
from datetime import datetime

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.get("", response_model=List[ApplicationResponse])
def list_applications(status: str = None, db: Session = Depends(get_db)):
    query = db.query(Application)
    if status:
        query = query.filter(Application.status == status)
    return query.order_by(Application.match_score.desc(), Application.date_discovered.desc()).all()

@router.get("/{app_id}", response_model=ApplicationResponse)
def get_application(app_id: int, db: Session = Depends(get_db)):
    app = db.query(Application).filter(Application.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.post("/prepare")
def prepare_application(payload: ApplicationPrepareRequest, db: Session = Depends(get_db)):
    app = db.query(Application).filter(Application.job_id == payload.job_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found for this job")
        
    job = db.query(Job).filter(Job.id == payload.job_id).first()
    profile = get_or_init_master_profile(db)
    
    # 1. Ensure role-specific resume is generated
    role_category = payload.role_category or app.role_category or "PYTHON_DEVELOPER"
    resume_rec = db.query(ResumeRecord).filter(ResumeRecord.job_id == job.id).first()
    if not resume_rec:
        res_content = generate_role_specific_resume_content(profile, role_category, company_name=job.company)
        profile_dict = {
            "personal_info": profile.personal_info,
            "education": profile.education,
            "skills": profile.skills,
            "projects": profile.projects,
            "experience": profile.experience
        }
        pdf_res = generate_ats_resume_pdf(res_content, profile_dict, job.raw_description)
        resume_rec = ResumeRecord(
            job_id=job.id,
            role_category=role_category,
            company_name=job.company,
            file_path=pdf_res["pdf_path"],
            file_name=pdf_res["pdf_filename"],
            resume_title=res_content["resume_title"],
            summary=res_content["summary"],
            selected_skills=res_content["skills"],
            selected_projects=res_content["projects"],
            selected_experience=res_content["experience"],
            ats_score=pdf_res["ats_score"],
            ats_validation_passed=pdf_res["ats_validation_passed"],
            facts_verified=pdf_res["facts_verified"],
            page_count=1
        )
        db.add(resume_rec)
        db.commit()
        db.refresh(resume_rec)
        
    app.resume_id = resume_rec.id
    app.resume_path = resume_rec.file_path
    
    # 2. Prepare fields & Questions
    prep_data = prepare_job_application_fields(profile, resume_rec.file_path, job.raw_description)
    app.prepared_fields = prep_data["prepared_fields"]
    app.application_questions = prep_data["questions"]
    
    transition_application_status(db, app.id, "APPLICATION_READY")
    return app

@router.post("/submit")
def submit_application(payload: ApplicationSubmitRequest, db: Session = Depends(get_db)):
    app = db.query(Application).filter(Application.id == payload.application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    if not payload.confirmed:
        raise HTTPException(status_code=400, detail="Explicit user approval confirmation is required.")
        
    adapter = PlaywrightIndeedAdapter() if not settings.demo_mode else MockPlatformAdapter()
    result = adapter.submit_application(app.id)
    
    if result.get("success"):
        transition_application_status(db, app.id, "SUBMITTED", notes=result.get("notes"))
    else:
        transition_application_status(db, app.id, "FAILED", notes=result.get("error"))
        
    return {
        "status": app.status,
        "application_id": app.id,
        "result": result
    }

@router.post("/batch-submit")
def batch_submit_applications(payload: BatchApproveRequest, db: Session = Depends(get_db)):
    if not payload.confirmed:
        raise HTTPException(status_code=400, detail="Batch approval requires explicit user confirmation.")
        
    results = []
    adapter = PlaywrightIndeedAdapter() if not settings.demo_mode else MockPlatformAdapter()
    
    for aid in payload.application_ids:
        app = db.query(Application).filter(Application.id == aid).first()
        if not app:
            continue
            
        sub_res = adapter.submit_application(aid)
        if sub_res.get("success"):
            transition_application_status(db, app.id, "SUBMITTED", notes="Submitted via Batch Approval Mode")
            results.append({"app_id": aid, "company": app.company, "status": "SUBMITTED"})
        else:
            transition_application_status(db, app.id, "FAILED", notes="Failed in batch submission")
            results.append({"app_id": aid, "company": app.company, "status": "FAILED"})
            
    return {
        "total_processed": len(results),
        "results": results
    }

@router.post("/{app_id}/skip")
def skip_application(app_id: int, db: Session = Depends(get_db)):
    app = transition_application_status(db, app_id, "SKIPPED")
    return app
