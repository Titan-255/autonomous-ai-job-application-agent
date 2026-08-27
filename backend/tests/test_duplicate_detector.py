import pytest
from backend.app.services.duplicate_detector import generate_job_fingerprint

def test_duplicate_fingerprint():
    fp1 = generate_job_fingerprint("Kognitive AI Labs", "AI/ML Intern", "Chennai, India", "https://indeed.com/job1")
    fp2 = generate_job_fingerprint("kognitive ai labs", "ai/ml intern", "chennai, india", "https://indeed.com/job1")
    fp3 = generate_job_fingerprint("Different Corp", "AI/ML Intern", "Chennai, India", "https://indeed.com/job2")
    
    assert fp1 == fp2
    assert fp1 != fp3
