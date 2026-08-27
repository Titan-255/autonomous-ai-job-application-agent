import re
from typing import Dict, Any, List
from backend.app.models.profile import MasterProfile
from backend.app.services.resume_generator import TARGET_ROLE_TAXONOMY

SKILL_SYNONYMS = {
    "vector database": ["chromadb", "vector database", "vector db", "vector store", "pinecone", "weaviate", "qdrant", "faiss"],
    "python backend": ["fastapi", "django", "flask", "python backend", "backend", "rest api", "restful apis"],
    "rag": ["rag", "retrieval-augmented generation", "retrieval augmented generation", "context-aware q&a"],
    "speech-to-text": ["whisper", "speech-to-text", "speech to text", "audio transcription", "stt"],
    "nlp": ["tf-idf", "nlp", "text classification", "regex parsing", "natural language processing", "text analytics"],
    "data analysis": ["pandas", "numpy", "eda", "exploratory data analysis", "data preprocessing", "data analytics", "quantitative"],
    "machine learning": ["scikit-learn", "machine learning", "supervised learning", "model evaluation", "ml algorithms", "pytorch", "tensorflow"],
    "sql & databases": ["postgresql", "sqlite", "sql", "relational database", "rdbms"],
    "frontend": ["react", "angular", "javascript", "frontend", "html", "css"],
    "tools & agile": ["docker", "git", "github", "agile", "vs code", "oop"]
}

def determine_target_role_category(job_title: str, job_description: str) -> str:
    title_lower = job_title.lower()
    desc_lower = job_description.lower()
    
    if any(k in title_lower for k in ["genai", "generative ai", "llm", "agent"]) or "generative ai" in desc_lower:
        return "GENERATIVE_AI"
    if any(k in title_lower for k in ["document intelligence", "nlp intern", "ai/ml", "machine learning", "ai intern", "ml intern"]):
        return "AI_ML_DOCUMENT_INTELLIGENCE"
    if "python" in title_lower:
        return "PYTHON_DEVELOPER"
    if any(k in title_lower for k in ["data analyst", "data analytics", "analytics intern", "data science intern"]):
        return "DATA_ANALYST"
    if any(k in title_lower for k in ["product developer", "product engineer", "product development"]):
        return "PRODUCT_DEVELOPER"
    if any(k in title_lower for k in ["product support", "technical support", "application support"]):
        return "PRODUCT_SUPPORT"
    if any(k in title_lower for k in ["software", "sde", "full stack", "backend"]):
        return "SOFTWARE_DEVELOPER"
        
    return "PYTHON_DEVELOPER"

def calculate_job_match(job_title: str, job_description: str, location: str, profile: MasterProfile) -> Dict[str, Any]:
    desc_lower = job_description.lower()
    title_lower = job_title.lower()
    loc_lower = location.lower()
    
    role_category = determine_target_role_category(job_title, job_description)
    role_config = TARGET_ROLE_TAXONOMY[role_category]
    
    # 1. Role match score (max 25)
    role_score = 15.0
    if any(kw in title_lower for kw in ["intern", "internship", "trainee", "junior", "fresher"]):
        role_score += 5.0
    if any(w in title_lower for w in ["ai", "ml", "python", "developer", "analyst", "engineer", "support"]):
        role_score += 5.0
        
    # 2. Technical skill match (max 25)
    candidate_skills = []
    for cat, slist in profile.skills.items():
        for s in slist:
            candidate_skills.append(s.split("(")[0].strip().lower())
            
    matched_skills = []
    missing_skills = []
    
    tech_keywords = [
        "python", "fastapi", "django", "sql", "postgresql", "sqlite", "rest api", "restful",
        "machine learning", "rag", "nlp", "whisper", "chromadb", "embeddings", "scikit-learn",
        "numpy", "pandas", "docker", "git", "react", "angular", "javascript", "java", "c++"
    ]
    
    for kw in tech_keywords:
        if kw in desc_lower:
            is_matched = False
            if any(kw in cs or cs in kw for cs in candidate_skills):
                is_matched = True
            else:
                for syn_group, syns in SKILL_SYNONYMS.items():
                    if kw in syns and any(any(cs in s for s in syns) for cs in candidate_skills):
                        is_matched = True
                        break
            if is_matched:
                matched_skills.append(kw)
            else:
                missing_skills.append(kw)
                
    if matched_skills:
        ratio = len(matched_skills) / max(1, len(matched_skills) + len(missing_skills))
        skill_score = round(ratio * 25.0, 1)
    else:
        skill_score = 18.0
        
    # 3. Project match (max 15)
    project_score = 10.0
    matched_projects = []
    if any(w in desc_lower for w in ["rag", "whisper", "document", "audio", "llm", "vector"]):
        project_score += 3.0
        matched_projects.append("Spectrum AI (RAG & Document Intelligence)")
    if any(w in desc_lower for w in ["time-series", "analytics", "predictive", "market", "financial"]):
        project_score += 2.0
        matched_projects.append("HyperTrade AI (Predictive Analytics)")
    if any(w in desc_lower for w in ["automation", "email", "nlp", "regex", "api"]):
        matched_projects.append("Autonomous Email Management Agent")
    if any(w in desc_lower for w in ["fastapi", "django", "backend", "collaboration", "session"]):
        matched_projects.append("AI Collaboration & Meeting Platform")
    project_score = min(15.0, project_score)
    
    # 4. Education match (max 10)
    education_score = 10.0
    
    # 5. Experience match (max 10)
    experience_score = 8.5
    if any(w in desc_lower for w in ["support", "voice", "automation", "agile", "customer", "startup"]):
        experience_score = 10.0
        
    # 6. Location match (max 5)
    location_score = 3.5
    if any(city in loc_lower for city in ["chennai", "remote", "work from home", "hybrid"]):
        location_score = 5.0
    elif any(city in loc_lower for city in ["bengaluru", "bangalore", "hyderabad", "coimbatore", "kochi", "pune", "mumbai", "delhi", "india"]):
        location_score = 4.0
        
    # 7. AI/ML relevance (max 5)
    ai_relevance = 3.0
    if any(w in desc_lower for w in ["ai", "ml", "llm", "rag", "model", "intelligence", "learning"]):
        ai_relevance = 5.0
        
    # 8. Internship/Fresher compatibility (max 5)
    internship_score = 5.0
    if any(w in desc_lower for w in ["5+ years", "7+ years", "senior staff", "director"]):
        internship_score = 1.0
        
    total_score = int(round(
        role_score + skill_score + project_score + education_score +
        experience_score + location_score + ai_relevance + internship_score
    ))
    total_score = max(0, min(100, total_score))
    
    if total_score >= 90:
        classification = "EXCELLENT MATCH"
    elif total_score >= 75:
        classification = "STRONG MATCH"
    elif total_score >= 60:
        classification = "POSSIBLE MATCH"
    elif total_score >= 40:
        classification = "WEAK MATCH"
    else:
        classification = "NOT RECOMMENDED"
        
    lead_proj = matched_projects[0] if matched_projects else "Spectrum AI"
    reasoning = (
        f"Matched {len(matched_skills)} core technical skills. High alignment with {role_config['name']} "
        f"profile and academic background in B.Tech CSE. Key project {lead_proj} "
        f"strongly supports job requirements."
    )
    
    return {
        "overall_score": total_score,
        "classification": classification,
        "role_match_score": role_score,
        "tech_skill_match_score": skill_score,
        "project_match_score": project_score,
        "education_match_score": education_score,
        "experience_match_score": experience_score,
        "location_match_score": location_score,
        "ai_ml_relevance_score": ai_relevance,
        "internship_score": internship_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "matched_projects": matched_projects,
        "match_reasoning": reasoning,
        "recommended_role_category": role_category,
        "recommended_resume_title": role_config["resume_title"]
    }
