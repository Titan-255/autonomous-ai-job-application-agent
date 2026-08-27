import json
from pathlib import Path
from typing import Dict, Any, List
from backend.app.config import settings
from backend.app.models.profile import MasterProfile, ProfileVersionHistory
from sqlalchemy.orm import Session

def load_master_cv_from_file() -> Dict[str, Any]:
    file_path = Path(settings.master_cv_path)
    if not file_path.exists():
        raise FileNotFoundError(f'Master CV file not found at {file_path}')
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_or_init_master_profile(db: Session) -> MasterProfile:
    profile = db.query(MasterProfile).filter(MasterProfile.is_active == True).first()
    if not profile:
        raw_data = load_master_cv_from_file()
        profile = MasterProfile(
            version=1,
            is_active=True,
            personal_info=raw_data['personal_info'],
            professional_summary=raw_data['professional_summary'],
            education=raw_data['education'],
            skills=raw_data['skills'],
            projects=raw_data['projects'],
            experience=raw_data['experience']
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
        
        history = ProfileVersionHistory(
            profile_id=profile.id,
            version=1,
            snapshot=raw_data,
            change_summary='Initial Master CV import'
        )
        db.add(history)
        db.commit()
    return profile

def get_master_skills_flattened(profile: MasterProfile) -> List[str]:
    all_skills = []
    for category, skill_list in profile.skills.items():
        for s in skill_list:
            clean_s = s.split('(')[0].strip()
            all_skills.append(clean_s)
    return list(set(all_skills))
