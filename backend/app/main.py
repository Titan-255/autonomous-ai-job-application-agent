from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from backend.app.config import settings
from backend.app.database import engine, Base, SessionLocal
from backend.app.services.cv_parser import get_or_init_master_profile
from backend.app.api.profile_routes import router as profile_router
from backend.app.api.job_routes import router as job_router
from backend.app.api.resume_routes import router as resume_router
from backend.app.api.application_routes import router as app_router
from backend.app.api.automation_routes import router as auto_router
from backend.app.api.analytics_routes import router as analytics_router

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    description="Autonomous AI Job Application Agent with 7 Role-Specific ATS Resumes & Indeed Automation",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resumes static serving
resumes_path = Path(settings.resumes_dir)
resumes_path.mkdir(parents=True, exist_ok=True)
app.mount("/static/resumes", StaticFiles(directory=str(resumes_path)), name="resumes")

# Include Routers
app.include_router(profile_router, prefix="/api")
app.include_router(job_router, prefix="/api")
app.include_router(resume_router, prefix="/api")
app.include_router(app_router, prefix="/api")
app.include_router(auto_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        get_or_init_master_profile(db)
        print("Master profile verified and ready.")
    finally:
        db.close()

@app.get("/")
def root():
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": "1.0.0",
        "demo_mode": settings.demo_mode
    }
