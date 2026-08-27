from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Boolean
from datetime import datetime
from backend.app.database import Base

class ResumeRecord(Base):
    __tablename__ = 'resumes'
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey('jobs.id'), nullable=True)
    role_category = Column(String(100), nullable=False)
    company_name = Column(String(255), nullable=False)
    
    file_path = Column(String(500), nullable=False)
    file_name = Column(String(255), nullable=False)
    pdf_base64 = Column(Text, nullable=True) # Persistent binary across serverless instances
    
    resume_title = Column(String(255), nullable=False)
    summary = Column(Text, nullable=False)
    selected_skills = Column(JSON, nullable=False)
    selected_projects = Column(JSON, nullable=False)
    selected_experience = Column(JSON, nullable=False)
    
    ats_score = Column(Integer, default=0)
    ats_validation_passed = Column(Boolean, default=True)
    facts_verified = Column(Boolean, default=True)
    fabricated_claims_count = Column(Integer, default=0)
    page_count = Column(Integer, default=1)
    
    metadata_json_path = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
