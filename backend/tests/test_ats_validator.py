import pytest
from backend.app.services.ats_validator import validate_anti_fabrication
from backend.app.services.cv_parser import load_master_cv_from_file

def test_anti_fabrication_validator():
    master_data = load_master_cv_from_file()
    
    # Valid resume data
    valid_resume = {
        "summary": "Computer Science student with strong Python programming fundamentals.",
        "projects": [
            {"name": "Spectrum AI - AI-Powered RAG & Document Intelligence Platform", "bullets": ["Engineered a Python AI learning platform"]}
        ],
        "experience": [
            {"role": "Product & Support Lead", "bullets": ["Managed technical feature iterations"]}
        ]
    }
    is_safe, unverified = validate_anti_fabrication(valid_resume, master_data)
    assert is_safe is True
    assert len(unverified) == 0
    
    # Invalid resume data with fabricated metric and fabricated project
    invalid_resume = {
        "summary": "Improved system speed by 95% at FakeStartup.",
        "projects": [
            {"name": "CryptoTradingBot3000", "bullets": ["Made $500k revenue with 88% profit margin."]}
        ],
        "experience": []
    }
    is_safe_inv, unverified_inv = validate_anti_fabrication(invalid_resume, master_data)
    assert is_safe_inv is False
    assert len(unverified_inv) >= 1
