from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from pathlib import Path
from backend.app.database import get_db
from backend.app.models.resume import ResumeRecord
from backend.app.models.job import Job, JobMatch
from backend.app.models.application import Application
from backend.app.schemas.resume import ResumeGenerateRequest, ResumeResponse, ATSValidationReport
from backend.app.services.cv_parser import get_or_init_master_profile
from backend.app.services.resume_generator import generate_role_specific_resume_content, TARGET_ROLE_TAXONOMY
from backend.app.services.pdf_service import generate_ats_resume_pdf
from backend.app.services.ats_validator import score_ats_compatibility, test_pdf_ats_extractability, validate_anti_fabrication
from backend.app.services.tracking_service import transition_application_status

router = APIRouter(prefix="/resumes", tags=["Resumes"])

@router.get("", response_model=List[ResumeResponse])
def list_resumes(db: Session = Depends(get_db)):
    return db.query(ResumeRecord).order_by(ResumeRecord.created_at.desc()).all()

@router.get("/templates")
def list_role_templates():
    return [
        {
            "id": k,
            "name": v["name"],
            "folder": v["folder"],
            "title": v["resume_title"],
            "summary": v["summary"],
            "priority_skills": v["priority_skills"]
        }
        for k, v in TARGET_ROLE_TAXONOMY.items()
    ]

@router.post("/generate")
def generate_resume(payload: ResumeGenerateRequest, db: Session = Depends(get_db)):
    profile = get_or_init_master_profile(db)
    
    role_cat = payload.role_category or "PYTHON_DEVELOPER"
    company = payload.company_name or "General"
    job = None
    match_dict = None
    
    if payload.job_id:
        job = db.query(Job).filter(Job.id == payload.job_id).first()
        if job:
            company = job.company
            if not payload.role_category and job.target_role_category:
                role_cat = job.target_role_category
            match = db.query(JobMatch).filter(JobMatch.job_id == job.id).first()
            if match:
                match_dict = {
                    "score": match.overall_score,
                    "matched_skills": match.matched_skills,
                    "missing_skills": match.missing_skills
                }
                
    resume_content = generate_role_specific_resume_content(
        profile,
        role_category=role_cat,
        company_name=company
    )
    
    profile_dict = {
        "personal_info": profile.personal_info,
        "education": profile.education,
        "skills": profile.skills,
        "projects": profile.projects,
        "experience": profile.experience
    }
    
    pdf_result = generate_ats_resume_pdf(
        resume_data=resume_content,
        master_profile_data=profile_dict,
        job_description=job.raw_description if job else "",
        match_analysis=match_dict
    )
    
    # Save record in DB
    resume_rec = ResumeRecord(
        job_id=payload.job_id,
        role_category=role_cat,
        company_name=company,
        file_path=pdf_result["pdf_path"],
        file_name=pdf_result["pdf_filename"],
        resume_title=resume_content["resume_title"],
        summary=resume_content["summary"],
        selected_skills=resume_content["skills"],
        selected_projects=resume_content["projects"],
        selected_experience=resume_content["experience"],
        ats_score=pdf_result["ats_score"],
        ats_validation_passed=pdf_result["ats_validation_passed"],
        facts_verified=pdf_result["facts_verified"],
        fabricated_claims_count=len(pdf_result.get("unverified_claims", [])),
        page_count=1 if pdf_result.get("is_single_page") else 2,
        metadata_json_path=pdf_result["metadata_path"]
    )
    db.add(resume_rec)
    db.commit()
    db.refresh(resume_rec)
    
    if payload.job_id:
        app = db.query(Application).filter(Application.job_id == payload.job_id).first()
        if app:
            app.resume_id = resume_rec.id
            app.resume_path = resume_rec.file_path
            transition_application_status(db, app.id, "RESUME_GENERATED")
            
    return resume_rec

@router.get("/{resume_id}/pdf")
def view_or_download_pdf(resume_id: int, db: Session = Depends(get_db)):
    rec = db.query(ResumeRecord).filter(ResumeRecord.id == resume_id).first()
    if not rec or not Path(rec.file_path).exists():
        raise HTTPException(status_code=404, detail="Resume PDF not found on disk")
    return FileResponse(rec.file_path, media_type="application/pdf", filename=rec.file_name)
