from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from backend.app.config import settings
from backend.app.database import engine, Base, SessionLocal
from backend.app.models.job import Job, JobMatch
from backend.app.models.application import Application
from backend.app.services.job_matching import calculate_job_match
from backend.app.services.duplicate_detector import generate_job_fingerprint
from backend.app.services.automation.mock_adapter import MOCK_JOBS_DB
from backend.app.api.profile_routes import router as profile_router
from backend.app.api.job_routes import router as job_router
from backend.app.api.resume_routes import router as resume_router
from backend.app.api.application_routes import router as app_router
from backend.app.api.automation_routes import router as auto_router
from backend.app.api.analytics_routes import router as analytics_router

app = FastAPI(
    title=settings.app_name,
    description="Autonomous AI Job Application Agent with 7 Role-Specific ATS Resumes & Indeed Automation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resumes static serving if folder exists
try:
    resumes_path = Path(settings.resumes_dir)
    resumes_path.mkdir(parents=True, exist_ok=True)
    app.mount("/static/resumes", StaticFiles(directory=str(resumes_path)), name="resumes")
except Exception:
    pass

# Mount routers for both /api and root paths for seamless Vercel / local compatibility
app.include_router(profile_router, prefix="/api")
app.include_router(profile_router, prefix="")

app.include_router(job_router, prefix="/api")
app.include_router(job_router, prefix="")

app.include_router(resume_router, prefix="/api")
app.include_router(resume_router, prefix="")

app.include_router(app_router, prefix="/api")
app.include_router(app_router, prefix="")

app.include_router(auto_router, prefix="/api")
app.include_router(auto_router, prefix="")

app.include_router(analytics_router, prefix="/api")
app.include_router(analytics_router, prefix="")

_db_initialized = False

def ensure_db_initialized():
    global _db_initialized
    if _db_initialized:
        return
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            from backend.app.services.cv_parser import get_or_init_master_profile
            profile = get_or_init_master_profile(db)
            job_count = db.query(Job).count()
            if job_count == 0:
                for rj in MOCK_JOBS_DB:
                    fp = generate_job_fingerprint(rj["company"], rj["title"], rj["location"], rj["job_url"])
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
                    app_rec = Application(
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
                    db.add(app_rec)
                    db.commit()
        finally:
            db.close()
        _db_initialized = True
    except Exception as e:
        print(f"Lazy DB init note: {e}")

@app.middleware("http")
async def db_init_middleware(request, call_next):
    ensure_db_initialized()
    response = await call_next(request)
    return response

@app.on_event("startup")
def startup_event():
    ensure_db_initialized()

@app.get("/")
@app.get("/api")
@app.get("/health")
@app.get("/api/health")
def root():
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": "1.0.0",
        "demo_mode": settings.demo_mode
    }
