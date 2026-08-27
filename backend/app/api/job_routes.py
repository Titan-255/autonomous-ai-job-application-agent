from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.database import get_db
from backend.app.models.job import Job, JobMatch
from backend.app.models.application import Application
from backend.app.models.resume import ResumeRecord
from backend.app.schemas.job import JobResponse, JobDetailResponse, JobSearchQuery, JobMatchResponse
from backend.app.services.cv_parser import get_or_init_master_profile
from backend.app.services.job_matching import calculate_job_match, TARGET_ROLE_TAXONOMY
from backend.app.services.duplicate_detector import generate_job_fingerprint
from backend.app.services.automation.mock_adapter import MockPlatformAdapter
from backend.app.services.automation.indeed_adapter import PlaywrightIndeedAdapter
from backend.app.config import settings

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.get("", response_model=List[JobResponse])
def list_jobs(
    role_category: Optional[str] = None,
    min_score: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Job)
    if role_category:
        query = query.filter(Job.target_role_category == role_category)
        
    jobs = query.order_by(Job.discovered_at.desc()).all()
    results = []
    
    for j in jobs:
        jm = db.query(JobMatch).filter(JobMatch.job_id == j.id).first()
        res_rec = db.query(ResumeRecord).filter(ResumeRecord.job_id == j.id).first()
        app_rec = db.query(Application).filter(Application.job_id == j.id).first()
        
        score = jm.overall_score if jm else 0
        if min_score and score < min_score:
            continue
            
        results.append(JobResponse(
            id=j.id,
            fingerprint=j.fingerprint,
            title=j.title,
            company=j.company,
            location=j.location,
            work_mode=j.work_mode,
            job_url=j.job_url,
            posted_date=j.posted_date,
            salary=j.salary,
            employment_type=j.employment_type,
            raw_description=j.raw_description,
            target_role_category=j.target_role_category,
            application_method=j.application_method,
            discovered_at=j.discovered_at,
            match_score=score,
            match_classification=jm.classification if jm else None,
            resume_generated=res_rec is not None,
            application_status=app_rec.status if app_rec else "DISCOVERED"
        ))
        
    return sorted(results, key=lambda x: x.match_score or 0, reverse=True)

@router.get("/{job_id}", response_model=JobDetailResponse)
def get_job_detail(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    jm = db.query(JobMatch).filter(JobMatch.job_id == job.id).first()
    res_rec = db.query(ResumeRecord).filter(ResumeRecord.job_id == job.id).first()
    app_rec = db.query(Application).filter(Application.job_id == job.id).first()
    
    job_resp = JobResponse(
        id=job.id,
        fingerprint=job.fingerprint,
        title=job.title,
        company=job.company,
        location=job.location,
        work_mode=job.work_mode,
        job_url=job.job_url,
        posted_date=job.posted_date,
        salary=job.salary,
        employment_type=job.employment_type,
        raw_description=job.raw_description,
        target_role_category=job.target_role_category,
        application_method=job.application_method,
        discovered_at=job.discovered_at,
        match_score=jm.overall_score if jm else None,
        match_classification=jm.classification if jm else None,
        resume_generated=res_rec is not None,
        application_status=app_rec.status if app_rec else "DISCOVERED"
    )
    
    return JobDetailResponse(
        job=job_resp,
        match=jm,
        resume=res_rec,
        application=app_rec
    )

@router.post("/search")
def search_jobs(payload: JobSearchQuery, db: Session = Depends(get_db)):
    profile = get_or_init_master_profile(db)
    query_str = f"{payload.role_title or ''} {payload.experience_level or 'Intern'}".strip()
    location_str = payload.location or settings.default_location
    
    try:
        adapter = PlaywrightIndeedAdapter() if not settings.demo_mode else MockPlatformAdapter()
        raw_jobs = adapter.search_jobs(query_str, location_str, max_results=payload.max_results or 20)
    except Exception as e:
        print(f"Search adapter fallback: {e}")
        adapter = MockPlatformAdapter()
        raw_jobs = adapter.search_jobs(query_str, location_str, max_results=payload.max_results or 20)
        
    discovered_count = 0
    duplicate_count = 0
    added_jobs = []
    
    for rj in raw_jobs:
        fp = generate_job_fingerprint(rj["company"], rj["title"], rj["location"], rj["job_url"])
        existing = db.query(Job).filter(Job.fingerprint == fp).first()
        if existing:
            duplicate_count += 1
            continue
            
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
        
        match_data = calculate_job_match(job.title, job.raw_description, job.location, profile)
        job.target_role_category = match_data["recommended_role_category"]
        
        jm = JobMatch(
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
        db.add(jm)
        
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
        
        discovered_count += 1
        added_jobs.append({
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "score": match_data["overall_score"],
            "role_category": match_data["recommended_role_category"]
        })
        
    return {
        "status": "success",
        "query": query_str,
        "location": location_str,
        "discovered_new": discovered_count,
        "duplicates_skipped": duplicate_count,
        "jobs": added_jobs
    }
