import pytest
from backend.app.services.job_matching import determine_target_role_category, calculate_job_match
from backend.app.services.cv_parser import load_master_cv_from_file

class DummyProfile:
    skills = load_master_cv_from_file()["skills"]
    personal_info = load_master_cv_from_file()["personal_info"]

def test_determine_role_category():
    assert determine_target_role_category("AI/ML Intern - Document Intelligence", "NLP RAG") == "AI_ML_DOCUMENT_INTELLIGENCE"
    assert determine_target_role_category("Python Developer Intern", "FastAPI Django") == "PYTHON_DEVELOPER"
    assert determine_target_role_category("Generative AI Engineer Intern", "LLMs and Agents") == "GENERATIVE_AI"
    assert determine_target_role_category("Data Analyst Intern", "Pandas and SQL") == "DATA_ANALYST"
    assert determine_target_role_category("Software Development Intern", "Java and React") == "SOFTWARE_DEVELOPER"
    assert determine_target_role_category("Technical Product Support Intern", "Customer support") == "PRODUCT_SUPPORT"

def test_calculate_job_match():
    profile = DummyProfile()
    match = calculate_job_match(
        "Python Developer Intern",
        "Looking for an intern skilled in Python, FastAPI, REST APIs, SQL, and Docker.",
        "Chennai, Tamil Nadu, India",
        profile
    )
    assert match["overall_score"] >= 75
    assert match["classification"] in ["STRONG MATCH", "EXCELLENT MATCH"]
    assert "python" in match["matched_skills"]
    assert "fastapi" in match["matched_skills"]
