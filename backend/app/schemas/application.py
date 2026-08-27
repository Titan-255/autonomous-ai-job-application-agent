from pydantic import BaseModel
from typing import List, Dict, Optional, Any
from datetime import datetime

class ApplicationQuestion(BaseModel):
    question: str
    suggested_answer: str
    user_answer: Optional[str] = None
    reasoning: Optional[str] = None
    is_approved: bool = False

class ApplicationPrepareRequest(BaseModel):
    job_id: int
    role_category: Optional[str] = None

class ApplicationSubmitRequest(BaseModel):
    application_id: int
    confirmed: bool = True
    notes: Optional[str] = None

class BatchApproveRequest(BaseModel):
    application_ids: List[int]
    confirmed: bool = True

class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    resume_id: Optional[int] = None
    company: str
    job_title: str
    location: str
    job_url: str
    match_score: int
    role_category: Optional[str] = None
    resume_path: Optional[str] = None
    status: str
    application_method: str
    prepared_fields: Dict[str, Any] = {}
    application_questions: List[Dict[str, Any]] = []
    cover_letter: Optional[str] = None
    date_discovered: datetime
    date_prepared: Optional[datetime] = None
    date_applied: Optional[datetime] = None
    submission_notes: Optional[str] = None
    error_message: Optional[str] = None

    class Config:
        from_attributes = True
