import pytest
from backend.app.services.resume_generator import TARGET_ROLE_TAXONOMY, generate_role_specific_resume_content
from backend.app.services.cv_parser import load_master_cv_from_file

class DummyProfile:
    skills = load_master_cv_from_file()["skills"]
    personal_info = load_master_cv_from_file()["personal_info"]
    summary = load_master_cv_from_file()["professional_summary"]
    education = load_master_cv_from_file()["education"]
    projects = load_master_cv_from_file()["projects"]
    experience = load_master_cv_from_file()["experience"]

def test_seven_role_taxonomies_exist():
    assert len(TARGET_ROLE_TAXONOMY) == 7
    required_roles = [
        "AI_ML_DOCUMENT_INTELLIGENCE",
        "PYTHON_DEVELOPER",
        "GENERATIVE_AI",
        "SOFTWARE_DEVELOPER",
        "PRODUCT_DEVELOPER",
        "DATA_ANALYST",
        "PRODUCT_SUPPORT"
    ]
    for r in required_roles:
        assert r in TARGET_ROLE_TAXONOMY

def test_generate_resume_content():
    profile = DummyProfile()
    for role_key in TARGET_ROLE_TAXONOMY.keys():
        content = generate_role_specific_resume_content(profile, role_key, company_name="TestCorp")
        assert content["role_category"] == role_key
        assert len(content["projects"]) >= 3
        assert content["personal_info"]["name"] == "Tarun S"
