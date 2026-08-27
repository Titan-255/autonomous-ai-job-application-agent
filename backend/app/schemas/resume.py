from pydantic import BaseModel
from typing import List, Dict, Optional, Any
from datetime import datetime

class ResumeGenerateRequest(BaseModel):
    job_id: Optional[int] = None
    role_category: Optional[str] = None
    company_name: Optional[str] = 'Standard'

class ResumeResponse(BaseModel):
    id: int
    job_id: Optional[int] = None
    role_category: str
    company_name: str
    file_path: str
    file_name: str
    resume_title: str
    summary: str
    ats_score: int
    ats_validation_passed: bool
    facts_verified: bool
    fabricated_claims_count: int
    page_count: int
    created_at: datetime

    class Config:
        from_attributes = True

class ATSValidationReport(BaseModel):
    ats_score: int
    status: str
    is_valid: bool
    extracted_text_sample: str
    page_count: int
    detected_keywords: List[str]
    missing_keywords: List[str]
    anti_fabrication_passed: bool
    unverified_claims: List[str] = []
