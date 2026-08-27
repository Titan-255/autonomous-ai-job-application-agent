from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Boolean
from datetime import datetime
from backend.app.database import Base

class Application(Base):
    __tablename__ = 'applications'
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey('jobs.id'), unique=True, nullable=False)
    resume_id = Column(Integer, ForeignKey('resumes.id'), nullable=True)
    
    company = Column(String(255), nullable=False)
    job_title = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    job_url = Column(Text, nullable=False)
    match_score = Column(Integer, default=0)
    role_category = Column(String(100), nullable=True)
    resume_path = Column(String(500), nullable=True)
    
    # DISCOVERED, ANALYZING, SHORTLISTED, RESUME_GENERATED, APPLICATION_READY, USER_APPROVED, SUBMITTED, SKIPPED, REJECTED, FAILED, DUPLICATE
    status = Column(String(50), default='DISCOVERED', index=True)
    
    application_method = Column(String(50), default='indeed_easy_apply')
    prepared_fields = Column(JSON, default=dict)
    application_questions = Column(JSON, default=list) # [{question, suggested_answer, user_answer, is_approved}]
    cover_letter = Column(Text, nullable=True)
    
    date_discovered = Column(DateTime, default=datetime.utcnow)
    date_prepared = Column(DateTime, nullable=True)
    date_applied = Column(DateTime, nullable=True)
    
    submission_notes = Column(Text, nullable=True)
    error_message = Column(Text, nullable=True)
    screenshot_path = Column(String(500), nullable=True)
    
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class SearchRun(Base):
    __tablename__ = 'search_runs'
    id = Column(Integer, primary_key=True, index=True)
    query = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    role_category = Column(String(100), nullable=True)
    jobs_found = Column(Integer, default=0)
    new_jobs_added = Column(Integer, default=0)
    duplicates_skipped = Column(Integer, default=0)
    status = Column(String(50), default='COMPLETED')
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = 'audit_logs'
    id = Column(Integer, primary_key=True, index=True)
    action_type = Column(String(50), nullable=False, index=True)
    description = Column(Text, nullable=False)
    payload = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
