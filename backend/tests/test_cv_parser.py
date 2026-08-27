import pytest
from backend.app.services.cv_parser import load_master_cv_from_file

def test_load_master_cv():
    cv = load_master_cv_from_file()
    assert cv["personal_info"]["name"] == "Tarun S"
    assert "Chennai" in cv["personal_info"]["location"]
    assert len(cv["education"]) >= 1
    assert "Amrita Vishwa Vidyapeetham" in cv["education"][0]["institution"]
    assert len(cv["projects"]) == 4
    assert len(cv["skills"]["programming"]) >= 5
