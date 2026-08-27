import pytest
from pathlib import Path
from backend.app.services.resume_generator import generate_role_specific_resume_content, TARGET_ROLE_TAXONOMY
from backend.app.services.pdf_service import generate_ats_resume_pdf
from backend.app.services.cv_parser import load_master_cv_from_file

class DummyProfile:
    skills = load_master_cv_from_file()["skills"]
    personal_info = load_master_cv_from_file()["personal_info"]
    summary = load_master_cv_from_file()["professional_summary"]
    education = load_master_cv_from_file()["education"]
    projects = load_master_cv_from_file()["projects"]
    experience = load_master_cv_from_file()["experience"]

def test_generate_all_seven_role_resumes():
    profile = DummyProfile()
    profile_dict = load_master_cv_from_file()
    
    for role_key, role_meta in TARGET_ROLE_TAXONOMY.items():
        resume_data = generate_role_specific_resume_content(profile, role_key, company_name="SampleTech")
        res = generate_ats_resume_pdf(resume_data, profile_dict)
        
        pdf_path = Path(res["pdf_path"])
        assert pdf_path.exists(), f"PDF for {role_key} was not generated"
        assert pdf_path.stat().st_size > 1000
        assert res["ats_validation_passed"] is True
        assert res["is_single_page"] is True
        assert res["facts_verified"] is True
