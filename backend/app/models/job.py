from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Float, Boolean, ForeignKey
from datetime import datetime
from backend.app.database import Base

class Job(Base):
    __tablename__ = 'jobs'
    id = Column(Integer, primary_key=True, index=True)
    fingerprint = Column(String(255), unique=True, index=True, nullable=False)
    platform = Column(String(50), default='indeed')
    job_id = Column(String(100), nullable=True)
    title = Column(String(255), nullable=False)
    normalized_title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    work_mode = Column(String(50), default='on-site') # remote, hybrid, on-site
    job_url = Column(Text, nullable=False)
    posted_date = Column(String(100), nullable=True)
    salary = Column(String(100), nullable=True)
    employment_type = Column(String(50), default='Internship')
    
    raw_description = Column(Text, nullable=False)
    normalized_description = Column(Text, nullable=False)
    
    requirements = Column(JSON, default=dict)
    responsibilities = Column(JSON, default=list)
    required_skills = Column(JSON, default=list)
    preferred_skills = Column(JSON, default=list)
    education_requirements = Column(String(255), nullable=True)
    experience_requirements = Column(String(255), nullable=True)
    application_method = Column(String(50), default='indeed_easy_apply') # indeed_easy_apply, external_url
    external_url = Column(Text, nullable=True)
    
    target_role_category = Column(String(100), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class JobMatch(Base):
    __tablename__ = 'job_matches'
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey('jobs.id'), unique=True, nullable=False)
    
    overall_score = Column(Integer, nullable=False) # 0 - 100
    classification = Column(String(50), nullable=False) # EXCELLENT MATCH, STRONG MATCH, etc.
    
    role_match_score = Column(Float, default=0.0)
    tech_skill_match_score = Column(Float, default=0.0)
    project_match_score = Column(Float, default=0.0)
    education_match_score = Column(Float, default=0.0)
    experience_match_score = Column(Float, default=0.0)
    location_match_score = Column(Float, default=0.0)
    ai_ml_relevance_score = Column(Float, default=0.0)
    internship_score = Column(Float, default=0.0)
    
    matched_skills = Column(JSON, default=list)
    missing_skills = Column(JSON, default=list)
    matched_projects = Column(JSON, default=list)
    match_reasoning = Column(Text, nullable=True)
    
    recommended_role_category = Column(String(100), nullable=False)
    recommended_resume_title = Column(String(255), nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
