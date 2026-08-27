from typing import List, Dict, Any
from backend.app.services.automation.base_adapter import JobPlatformAdapter
from backend.app.services.duplicate_detector import generate_job_fingerprint

MOCK_JOBS_DB = [
    {
        "title": "AI/ML Intern ? Document Intelligence",
        "company": "Kognitive AI Labs",
        "location": "Chennai, Tamil Nadu, India",
        "work_mode": "hybrid",
        "job_url": "https://in.indeed.com/viewjob?jk=mock_aiml_01",
        "posted_date": "1 day ago",
        "salary": "?25,000 - ?35,000 / month",
        "employment_type": "Internship",
        "raw_description": (
            "We are seeking an AI/ML Intern with strong Python skills to work on Document Intelligence and NLP pipelines. "
            "Responsibilities include implementing Retrieval-Augmented Generation (RAG) using vector stores (ChromaDB), "
            "integrating speech-to-text (Whisper), and evaluating model embeddings. Requirements: Python, Scikit-learn, "
            "FastAPI, Vector Databases, and Supervised Learning."
        ),
        "application_method": "indeed_easy_apply"
    },
    {
        "title": "Python Developer Intern",
        "company": "FinFlow Technologies",
        "location": "Chennai, Tamil Nadu, India",
        "work_mode": "on-site",
        "job_url": "https://in.indeed.com/viewjob?jk=mock_py_02",
        "posted_date": "Just posted",
        "salary": "?20,000 - ?30,000 / month",
        "employment_type": "Internship",
        "raw_description": (
            "Looking for a Python Developer Intern to build RESTful backend microservices. "
            "Key requirements: Python, FastAPI or Django, PostgreSQL/SQLite database schema design, Docker containerization, "
            "and Git version control. Experience with API performance optimization is a plus."
        ),
        "application_method": "indeed_easy_apply"
    },
    {
        "title": "Generative AI Intern",
        "company": "Nexus GenAI Dynamics",
        "location": "Remote, India",
        "work_mode": "remote",
        "job_url": "https://in.indeed.com/viewjob?jk=mock_genai_03",
        "posted_date": "2 days ago",
        "salary": "?30,000 - ?40,000 / month",
        "employment_type": "Internship",
        "raw_description": (
            "Exciting opportunity for a Generative AI Intern to build autonomous AI agents and RAG applications. "
            "Work with LLM APIs, semantic search, vector embeddings, ChromaDB, and multi-modal voice processing with Whisper. "
            "Strong proficiency in Python, FastAPI, and prompt engineering required."
        ),
        "application_method": "indeed_easy_apply"
    },
    {
        "title": "Software Developer Intern",
        "company": "Amrita Tech Solutions",
        "location": "Chennai, Tamil Nadu, India",
        "work_mode": "hybrid",
        "job_url": "https://in.indeed.com/viewjob?jk=mock_sde_04",
        "posted_date": "3 days ago",
        "salary": "?22,000 / month",
        "employment_type": "Internship",
        "raw_description": (
            "Software Developer Intern to assist in developing modern web platforms. "
            "Requirements: Python, Java, or JavaScript, understanding of Object-Oriented Programming, SQL database queries, "
            "REST APIs, and exposure to React or Angular frontends. Agile sprint participation."
        ),
        "application_method": "indeed_easy_apply"
    },
    {
        "title": "Data Analyst Intern",
        "company": "AlphaQuant Analytics",
        "location": "Bengaluru, Karnataka, India",
        "work_mode": "hybrid",
        "job_url": "https://in.indeed.com/viewjob?jk=mock_data_05",
        "posted_date": "Just posted",
        "salary": "?25,000 / month",
        "employment_type": "Internship",
        "raw_description": (
            "AlphaQuant is looking for a Data Analyst Intern. Focus on financial time-series data cleaning, "
            "exploratory data analysis (EDA), and quantitative modeling. Skills required: Python, Pandas, NumPy, SQL, "
            "Scikit-learn, and data preprocessing."
        ),
        "application_method": "indeed_easy_apply"
    },
    {
        "title": "Product Developer Intern",
        "company": "VocalBridge Solutions",
        "location": "Chennai, Tamil Nadu, India",
        "work_mode": "on-site",
        "job_url": "https://in.indeed.com/viewjob?jk=mock_prod_06",
        "posted_date": "1 day ago",
        "salary": "?20,000 / month",
        "employment_type": "Internship",
        "raw_description": (
            "Join our product team as a Product Developer Intern. Build user-centric features, backend services in Python/FastAPI, "
            "integrate AI voice agents, and coordinate agile sprint iterations based on customer feedback."
        ),
        "application_method": "indeed_easy_apply"
    },
    {
        "title": "Technical Product Support Intern",
        "company": "CloudSphere Platforms",
        "location": "Chennai, Tamil Nadu, India",
        "work_mode": "hybrid",
        "job_url": "https://in.indeed.com/viewjob?jk=mock_supp_07",
        "posted_date": "4 days ago",
        "salary": "?18,000 / month",
        "employment_type": "Internship",
        "raw_description": (
            "Seeking a Technical Support / Product Support Intern. Assist in debugging API payloads, executing SQL queries, "
            "triaging client technical issues, and coordinating with backend engineering teams. Python & SQL proficiency preferred."
        ),
        "application_method": "indeed_easy_apply"
    },
    {
        "title": "Machine Learning Intern",
        "company": "DeepNeural AI",
        "location": "Hyderabad, Telangana, India",
        "work_mode": "remote",
        "job_url": "https://in.indeed.com/viewjob?jk=mock_ml_08",
        "posted_date": "2 days ago",
        "salary": "?28,000 / month",
        "employment_type": "Internship",
        "raw_description": (
            "Work on cutting-edge ML models, text classification, and embedding evaluation. "
            "Requires Python, Scikit-learn, PyTorch/TensorFlow, TF-IDF, ChromaDB, and data preprocessing pipelines."
        ),
        "application_method": "indeed_easy_apply"
    }
]

class MockPlatformAdapter(JobPlatformAdapter):
    def search_jobs(self, query: str, location: str, max_results: int = 20) -> List[Dict[str, Any]]:
        results = []
        q_lower = query.lower() if query else ""
        for job in MOCK_JOBS_DB:
            if not query or any(w in job["title"].lower() or w in job["raw_description"].lower() for w in q_lower.split()):
                results.append(job)
            elif len(results) < 4:
                results.append(job)
        return results[:max_results]
        
    def extract_job(self, job_url: str) -> Dict[str, Any]:
        for job in MOCK_JOBS_DB:
            if job["job_url"] == job_url:
                return job
        return MOCK_JOBS_DB[0]
        
    def prepare_application(self, job_url: str, resume_path: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "status": "READY",
            "fields_filled": {
                "full_name": profile_data.get("personal_info", {}).get("name", "Tarun S"),
                "email": profile_data.get("personal_info", {}).get("email", "tarun.s19906@gmail.com"),
                "phone": profile_data.get("personal_info", {}).get("phone", "+91 6380644305"),
                "location": profile_data.get("personal_info", {}).get("location", "Chennai, India"),
                "resume_file": resume_path
            },
            "questions": [
                {
                    "question": "Are you authorized to work in India?",
                    "suggested_answer": "Yes, I am a citizen of India and legally authorized to work in India.",
                    "is_approved": True
                },
                {
                    "question": "What is your expected graduation year?",
                    "suggested_answer": "2028 (3rd Year B.Tech CSE, Amrita Vishwa Vidyapeetham)",
                    "is_approved": True
                }
            ]
        }
        
    def submit_application(self, application_id: int) -> Dict[str, Any]:
        return {
            "success": True,
            "status": "SUBMITTED",
            "confirmation_code": f"IND-APP-{application_id}-VERIFIED",
            "notes": "Application verified and submitted successfully in demo mode."
        }
