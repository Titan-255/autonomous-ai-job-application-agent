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

class JobResponse(JobBase):
    id: int
    fingerprint: str
    normalized_title: str
    normalized_description: str
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    responsibilities: List[str] = []
    education_requirements: Optional[str] = None
    experience_requirements: Optional[str] = None
    target_role_category: Optional[str] = None
    match: Optional[JobMatchBreakdown] = None
    application_status: Optional[str] = 'DISCOVERED'
    created_at: datetime

    class Config:
        from_attributes = True

class JobSearchQuery(BaseModel):
    role_category: Optional[str] = None
    role_title: Optional[str] = 'Python Developer Intern'
    location: Optional[str] = 'Chennai, Tamil Nadu, India'
    experience_level: Optional[str] = 'Internship'
    max_results: Optional[int] = 20
