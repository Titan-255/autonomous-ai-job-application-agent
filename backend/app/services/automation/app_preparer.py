from typing import Dict, Any, List
from backend.app.models.profile import MasterProfile
from backend.app.services.llm_service import get_llm_service

def prepare_job_application_fields(profile: MasterProfile, resume_path: str, job_description: str) -> Dict[str, Any]:
    pinfo = profile.personal_info
    llm = get_llm_service()
    
    # Auto-fill non-sensitive facts
    prepared_fields = {
        "full_name": pinfo.get("name", "Tarun S"),
        "email": pinfo.get("email", "tarun.s19906@gmail.com"),
        "phone": pinfo.get("phone", "+91 6380644305"),
        "location": pinfo.get("location", "Chennai, India"),
        "resume_path": resume_path,
        "portfolio_url": pinfo.get("portfolio", ""),
        "github_url": pinfo.get("github", ""),
        "linkedin_url": pinfo.get("linkedin", "")
    }
    
    standard_questions = [
        "Are you authorized to work in India?",
        "What is your expected graduation year?",
        "What is your earliest start date / notice period?",
        "Are you comfortable with the job location / relocation?"
    ]
    
    q_and_a = []
    for q in standard_questions:
        ans = llm.answer_application_question(q, profile)
        q_and_a.append({
            "question": q,
            "suggested_answer": ans["suggested_answer"],
            "user_answer": ans["suggested_answer"],
            "reasoning": ans["reasoning"],
            "is_approved": ans["is_approved"]
        })
        
    return {
        "prepared_fields": prepared_fields,
        "questions": q_and_a
    }
