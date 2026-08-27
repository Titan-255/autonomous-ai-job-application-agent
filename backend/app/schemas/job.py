from pydantic import BaseModel
from typing import List, Dict, Optional, Any
from datetime import datetime

class JobBase(BaseModel):
    title: str
    company: str
    location: str
    work_mode: Optional[str] = 'on-site'
    job_url: str
    posted_date: Optional[str] = None
    salary: Optional[str] = None
    employment_type: Optional[str] = 'Internship'
    raw_description: str
    application_method: Optional[str] = 'indeed_easy_apply'
    external_url: Optional[str] = None

class JobMatchBreakdown(BaseModel):
    overall_score: int
    classification: str
    role_match_score: float
    tech_skill_match_score: float
    project_match_score: float
    education_match_score: float
    experience_match_score: float
    location_match_score: float
    ai_ml_relevance_score: float
    internship_score: float
    matched_skills: List[str]
    missing_skills: List[str]
    matched_projects: List[str]
    match_reasoning: Optional[str] = None
    recommended_role_category: str
    recommended_resume_title: str

JobMatchResponse = JobMatchBreakdown

class JobResponse(BaseModel):
    id: int
    fingerprint: str
    title: str
    company: str
    location: str
    work_mode: Optional[str] = 'on-site'
    job_url: str
    posted_date: Optional[str] = None
    salary: Optional[str] = None
    employment_type: Optional[str] = 'Internship'
    raw_description: str
    target_role_category: Optional[str] = None
    application_method: Optional[str] = 'indeed_easy_apply'
    discovered_at: Optional[datetime] = None
    match_score: Optional[int] = None
    match_classification: Optional[str] = None
    resume_generated: Optional[bool] = False
    application_status: Optional[str] = 'DISCOVERED'

    class Config:
        from_attributes = True

class JobDetailResponse(BaseModel):
    job: JobResponse
    match: Optional[Any] = None
    resume: Optional[Any] = None
    application: Optional[Any] = None

class JobSearchQuery(BaseModel):
    role_category: Optional[str] = None
    role_title: Optional[str] = 'Python Developer Intern'
    location: Optional[str] = 'Chennai, Tamil Nadu, India'
    experience_level: Optional[str] = 'Internship'
    max_results: Optional[int] = 20
