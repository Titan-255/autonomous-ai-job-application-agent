from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.profile import MasterProfile, ProfileVersionHistory
from backend.app.schemas.profile import MasterProfileResponse, ProfileUpdatePayload
from backend.app.services.cv_parser import get_or_init_master_profile
from datetime import datetime

router = APIRouter(prefix="/profile", tags=["Master Profile"])

@router.get("", response_model=MasterProfileResponse)
def get_master_profile(db: Session = Depends(get_db)):
    profile = get_or_init_master_profile(db)
    return profile

@router.put("", response_model=MasterProfileResponse)
def update_master_profile(payload: ProfileUpdatePayload, db: Session = Depends(get_db)):
    profile = get_or_init_master_profile(db)
    new_version = profile.version + 1
    
    profile.personal_info = payload.personal_info.model_dump()
    profile.professional_summary = payload.professional_summary
    profile.education = [e.model_dump() for e in payload.education]
    profile.skills = payload.skills.model_dump()
    profile.projects = [p.model_dump() for p in payload.projects]
    profile.experience = [e.model_dump() for e in payload.experience]
    profile.version = new_version
    profile.updated_at = datetime.utcnow()
    
    # Store history
    history = ProfileVersionHistory(
        profile_id=profile.id,
        version=new_version,
        snapshot={
            "personal_info": profile.personal_info,
            "professional_summary": profile.professional_summary,
            "education": profile.education,
            "skills": profile.skills,
            "projects": profile.projects,
            "experience": profile.experience
        },
        change_summary=payload.change_summary or "Manual Profile Update"
    )
    db.add(history)
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/versions")
def get_profile_versions(db: Session = Depends(get_db)):
    history = db.query(ProfileVersionHistory).order_by(ProfileVersionHistory.version.desc()).all()
    return history
