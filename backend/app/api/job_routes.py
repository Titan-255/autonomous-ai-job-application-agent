from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.database import get_db
from backend.app.models.job import Job, JobMatch
from backend.app.models.application import Application, SearchRun
from backend.app.models.resume import ResumeRecord
from backend.app.schemas.job import JobResponse, JobSearchQuery
from backend.app.services.cv_parser import get_or_init_master_profile
from backend.app.services.job_matching import calculate_job_match
from backend.app.services.duplicate_detector import generate_job_fingerprint
from backend.app.services.automation.indeed_adapter import PlaywrightIndeedAdapter
from backend.app.services.automation.mock_adapter import MockPlatformAdapter
from backend.app.services.resume_generator import generate_role_specific_resume_content
from backend.app.services.pdf_service import generate_ats_resume_pdf
from backend.app.config import settings
from datetime import datetime

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.get("")
def list_jobs(
    category: Optional[str] = None,
    min_score: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Job)
    if category:
        query = query.filter(Job.target_role_category == category)
    jobs = query.order_by(Job.created_at.desc()).all()
    
    results = []
    for j in jobs:
        match = db.query(JobMatch).filter(JobMatch.job_id == j.id).first()
        app = db.query(Application).filter(Application.job_id == j.id).first()
        
        if min_score and match and match.overall_score < min_score:
            continue
        if status and app and app.status != status:
            continue
            
        match_dict = None
        if match:
            match_dict = {
                "overall_score": match.overall_score,
                "classification": match.classification,
                "role_match_score": match.role_match_score,
                "tech_skill_match_score": match.tech_skill_match_score,
                "project_match_score": match.project_match_score,
                "education_match_score": match.education_match_score,
                "experience_match_score": match.experience_match_score,
                "location_match_score": match.location_match_score,
                "ai_ml_relevance_score": match.ai_ml_relevance_score,
                "internship_score": match.internship_score,
                "matched_skills": match.matched_skills,
                "missing_skills": match.missing_skills,
                "matched_projects": match.matched_projects,
                "match_reasoning": match.match_reasoning,
                "recommended_role_category": match.recommended_role_category,
                "recommended_resume_title": match.recommended_resume_title
            }
            
        results.append({
            "id": j.id,
            "title": j.title,
            "company": j.company,
            "location": j.location,
            "work_mode": j.work_mode,
            "job_url": j.job_url,
            "posted_date": j.posted_date,
            "salary": j.salary,
            "employment_type": j.employment_type,
            "raw_description": j.raw_description,
            "normalized_description": j.normalized_description,
            "application_method": j.application_method,
            "target_role_category": j.target_role_category,
            "match": match_dict,
            "application_status": app.status if app else "DISCOVERED",
            "created_at": j.created_at
        })
    return results

@router.get("/{job_id}")
def get_job_detail(job_id: int, db: Session = Depends(get_db)):
    j = db.query(Job).filter(Job.id == job_id).first()
    if not j:
        raise HTTPException(status_code=404, detail="Job not found")
    match = db.query(JobMatch).filter(JobMatch.job_id == j.id).first()
    app = db.query(Application).filter(Application.job_id == j.id).first()
    resume = db.query(ResumeRecord).filter(ResumeRecord.job_id == j.id).first()
    
    return {
        "job": j,
        "match": match,
        "application": app,
        "resume": resume
    }

@router.post("/search")
def search_jobs(payload: JobSearchQuery, db: Session = Depends(get_db)):
    profile = get_or_init_master_profile(db)
    query_str = f"{payload.role_title or ''} {payload.experience_level or 'Intern'}".strip()
    location_str = payload.location or settings.default_location
    
    adapter = PlaywrightIndeedAdapter() if not settings.demo_mode else MockPlatformAdapter()
    raw_jobs = adapter.search_jobs(query_str, location_str, max_results=payload.max_results or 20)
    
    new_jobs_count = 0
    duplicates_count = 0
    
    for rj in raw_jobs:
        fp = generate_job_fingerprint(rj["company"], rj["title"], rj["location"], rj["job_url"])
        existing = db.query(Job).filter(Job.fingerprint == fp).first()
        if existing:
            duplicates_count += 1
            continue
            
        # Create Job
        job = Job(
            fingerprint=fp,
            platform="indeed",
            title=rj["title"],
            normalized_title=rj["title"],
            company=rj["company"],
            location=rj["location"],
            work_mode=rj.get("work_mode", "on-site"),
            job_url=rj["job_url"],
            posted_date=rj.get("posted_date", "Recently"),
            salary=rj.get("salary"),
            employment_type=rj.get("employment_type", "Internship"),
            raw_description=rj["raw_description"],
            normalized_description=rj["raw_description"],
            application_method=rj.get("application_method", "indeed_easy_apply")
        )
        db.add(job)
        db.commit()
        db.refresh(job)
        
        # Calculate Match
        match_data = calculate_job_match(job.title, job.raw_description, job.location, profile)
        job.target_role_category = match_data["recommended_role_category"]
        
        job_match = JobMatch(
            job_id=job.id,
            overall_score=match_data["overall_score"],
            classification=match_data["classification"],
            role_match_score=match_data["role_match_score"],
            tech_skill_match_score=match_data["tech_skill_match_score"],
            project_match_score=match_data["project_match_score"],
            education_match_score=match_data["education_match_score"],
            experience_match_score=match_data["experience_match_score"],
            location_match_score=match_data["location_match_score"],
            ai_ml_relevance_score=match_data["ai_ml_relevance_score"],
            internship_score=match_data["internship_score"],
            matched_skills=match_data["matched_skills"],
            missing_skills=match_data["missing_skills"],
            matched_projects=match_data["matched_projects"],
            match_reasoning=match_data["match_reasoning"],
            recommended_role_category=match_data["recommended_role_category"],
            recommended_resume_title=match_data["recommended_resume_title"]
        )
        db.add(job_match)
        
        # Create Application tracking record
        initial_status = "SHORTLISTED" if match_data["overall_score"] >= settings.min_match_score else "DISCOVERED"
        app = Application(
            job_id=job.id,
            company=job.company,
            job_title=job.title,
            location=job.location,
            job_url=job.job_url,
            match_score=match_data["overall_score"],
            role_category=match_data["recommended_role_category"],
            status=initial_status,
            application_method=job.application_method
        )
        db.add(app)
        db.commit()
        new_jobs_count += 1
        
    # Log search run
    srun = SearchRun(
        query=query_str,
        location=location_str,
        role_category=payload.role_category,
        jobs_found=len(raw_jobs),
        new_jobs_added=new_jobs_count,
        duplicates_skipped=duplicates_count,
        status="COMPLETED"
    )
    db.add(srun)
    db.commit()
    
    return {
        "query": query_str,
        "location": location_str,
        "total_discovered": len(raw_jobs),
        "new_jobs_added": new_jobs_count,
        "duplicates_skipped": duplicates_count
    }
