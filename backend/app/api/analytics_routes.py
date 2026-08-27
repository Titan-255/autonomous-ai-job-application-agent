from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.app.database import get_db
from backend.app.models.job import Job, JobMatch
from backend.app.models.application import Application
from backend.app.models.resume import ResumeRecord

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("")
def get_analytics(db: Session = Depends(get_db)):
    total_jobs = db.query(Job).count()
    shortlisted = db.query(Application).filter(Application.status == "SHORTLISTED").count()
    ready = db.query(Application).filter(Application.status == "APPLICATION_READY").count()
    submitted = db.query(Application).filter(Application.status == "SUBMITTED").count()
    skipped = db.query(Application).filter(Application.status == "SKIPPED").count()
    resumes_gen = db.query(ResumeRecord).count()
    
    avg_score = db.query(func.avg(JobMatch.overall_score)).scalar() or 0
    
    # Categories distribution
    cat_counts = (
        db.query(Job.target_role_category, func.count(Job.id))
        .group_by(Job.target_role_category)
        .all()
    )
    categories_data = {c[0] or "Unassigned": c[1] for c in cat_counts}
    
    return {
        "total_jobs_discovered": total_jobs,
        "average_match_score": round(avg_score, 1),
        "resumes_generated": resumes_gen,
        "applications_shortlisted": shortlisted,
        "applications_ready": ready,
        "applications_submitted": submitted,
        "applications_skipped": skipped,
        "category_breakdown": categories_data,
        "conversion_rate": f"{round((submitted / max(1, total_jobs)) * 100, 1)}%"
    }
