from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from datetime import datetime

class PersonalInfo(BaseModel):
    name: str
    title: str
    phone: str
    email: str
    location: str
    linkedin: Optional[str] = ''
    github: Optional[str] = ''
    portfolio: Optional[str] = ''

class EducationItem(BaseModel):
    degree: str
    year_info: str
    institution: str
    location: str
    coursework: List[str] = []

class SkillsSchema(BaseModel):
    programming: List[str] = []
    ai_ml: List[str] = []
    data_science: List[str] = []
    ml_frameworks_tools: List[str] = []
    web_backend: List[str] = []
    tools_concepts: List[str] = []

class ProjectItem(BaseModel):
    id: str
    name: str
    tech_stack: List[str] = []
    bullets: List[str] = []

class ExperienceItem(BaseModel):
    id: str
    role: str
    company: str
    location: str
    bullets: List[str] = []

class MasterProfileSchema(BaseModel):
    personal_info: PersonalInfo
    professional_summary: str
    education: List[EducationItem]
    skills: SkillsSchema
    projects: List[ProjectItem]
    experience: List[ExperienceItem]

class MasterProfileResponse(MasterProfileSchema):
    id: int
    version: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class ProfileUpdatePayload(BaseModel):
    personal_info: PersonalInfo
    professional_summary: str
    education: List[EducationItem]
    skills: SkillsSchema
    projects: List[ProjectItem]
    experience: List[ExperienceItem]
    change_summary: Optional[str] = 'Updated profile'
