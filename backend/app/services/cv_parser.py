import json
from pathlib import Path
from typing import Dict, Any
from sqlalchemy.orm import Session
from backend.app.models.profile import MasterProfile
from backend.app.config import settings

# Ground-truth embedded Master CV facts for zero-dependency execution
EMBEDDED_MASTER_CV = {
    "personal_info": {
        "name": "Tarun S",
        "title": "Computer Science Student | Python | AI/ML | Data Science",
        "phone": "+91 6380644305",
        "email": "tarun.s19906@gmail.com",
        "location": "Chennai, India",
        "linkedin": "linkedin.com/in/tarun-s-76346724a",
        "github": "github.com/Titan-255",
        "summary": "Motivated Computer Science undergraduate at Amrita Vishwa Vidyapeetham with strong expertise in Python, AI/ML, and backend systems. Experienced in developing RAG pipelines, NLP applications, and predictive analytics engines using FastAPI, PyTorch, and ChromaDB."
    },
    "education": [
        {
            "degree": "B.Tech in Computer Science and Engineering",
            "institution": "Amrita Vishwa Vidyapeetham",
            "location": "Chennai, India",
            "year_info": "3rd Year | Expected Graduation: 2028",
            "coursework": [
                "Machine Learning Foundations",
                "Data Structures & Algorithms",
                "Database Management Systems",
                "Object-Oriented Programming",
                "Operating Systems"
            ]
        }
    ],
    "skills": {
        "programming": ["Python", "Java", "JavaScript", "C++", "SQL"],
        "ai_ml": [
            "Machine Learning",
            "Supervised Learning",
            "RAG",
            "NLP",
            "Vector Embeddings",
            "Semantic Search",
            "Model Evaluation"
        ],
        "data_science": [
            "NumPy",
            "Pandas",
            "Scikit-learn",
            "TF-IDF",
            "Text Classification",
            "Data Preprocessing",
            "EDA"
        ],
        "ml_frameworks_tools": [
            "PyTorch",
            "TensorFlow",
            "Scikit-learn",
            "ChromaDB",
            "OpenAI APIs",
            "Whisper",
            "Embeddings"
        ],
        "web_backend": [
            "FastAPI",
            "Django",
            "REST APIs",
            "PostgreSQL",
            "SQLite",
            "Node.js",
            "Angular",
            "React"
        ],
        "tools_concepts": [
            "Git",
            "GitHub",
            "Docker",
            "VS Code",
            "OOP",
            "Agile Development"
        ]
    },
    "projects": [
        {
            "id": "spectrum_ai",
            "name": "Spectrum AI ? AI-Powered RAG & Document Intelligence Platform",
            "role_relevance": ["AI_ML_DOCUMENT_INTELLIGENCE", "GENERATIVE_AI", "PYTHON_DEVELOPER"],
            "technologies": ["Python", "FastAPI", "OpenAI Whisper", "ChromaDB", "PostgreSQL", "React", "Docker"],
            "bullets": [
                "Engineered a production-ready Document Intelligence system integrating OpenAI Whisper for audio transcription and ChromaDB vector search.",
                "Constructed high-throughput REST APIs with FastAPI to query embedded vector knowledge bases.",
                "Implemented hybrid semantic search pipelines achieving context-aware retrieval across multi-modal document corpora."
            ]
        },
        {
            "id": "hypertrade_ai",
            "name": "HyperTrade AI ? Predictive Market Analytics & Decision Engine",
            "role_relevance": ["DATA_ANALYST", "AI_ML_DOCUMENT_INTELLIGENCE", "PYTHON_DEVELOPER"],
            "technologies": ["Python", "Pandas", "NumPy", "Scikit-learn", "FastAPI", "Matplotlib"],
            "bullets": [
                "Built an automated predictive analytics engine processing historical market feeds using NumPy and Pandas.",
                "Trained supervised regression models with Scikit-learn to generate trend projections and algorithmic trade signals.",
                "Conducted comprehensive Exploratory Data Analysis (EDA) to evaluate feature importance and signal accuracy."
            ]
        },
        {
            "id": "email_agent",
            "name": "Autonomous Email Management Agent ? NLP & Text Analytics Engine",
            "role_relevance": ["GENERATIVE_AI", "AI_ML_DOCUMENT_INTELLIGENCE", "PYTHON_DEVELOPER"],
            "technologies": ["Python", "NLP", "TF-IDF", "Scikit-learn", "SQLite", "REST APIs"],
            "bullets": [
                "Architected an autonomous NLP email processing agent utilizing TF-IDF vectorization and classification models.",
                "Implemented rule-based intent parsing and entity extraction for context-aware priority classification.",
                "Automated high-volume email triage workflows reducing manual classification overhead."
            ]
        },
        {
            "id": "meeting_platform",
            "name": "AI Collaboration & Meeting Platform ? Backend Services",
            "role_relevance": ["SOFTWARE_DEVELOPER", "PYTHON_DEVELOPER", "PRODUCT_DEVELOPER"],
            "technologies": ["Python", "Django", "FastAPI", "PostgreSQL", "WebSockets", "Docker"],
            "bullets": [
                "Designed and implemented modular backend microservices for real-time collaboration using FastAPI and Django.",
                "Integrated PostgreSQL relational schemas with indexed queries for efficient participant and agenda management.",
                "Configured Dockerized deployment pipelines for consistent development and staging workflows."
            ]
        }
    ],
    "experience": [
        {
            "role": "Product & Support Lead",
            "company": "CLABROOM (Early Stage Tech Startup)",
            "location": "Chennai, India",
            "year_info": "2024 - Present",
            "role_relevance": ["PRODUCT_SUPPORT", "PRODUCT_DEVELOPER", "SOFTWARE_DEVELOPER"],
            "bullets": [
                "Led technical troubleshooting and user issue resolution across core SaaS workflows, identifying edge-case bugs.",
                "Collaborated with engineering teams to triage backend and API issues, enhancing customer experience.",
                "Synthesized direct customer feedback into actionable product requirements and technical documentation."
            ]
        },
        {
            "role": "Front-End Developer Intern",
            "company": "Quantum AI",
            "location": "Chennai, India",
            "year_info": "2024",
            "role_relevance": ["SOFTWARE_DEVELOPER", "PRODUCT_DEVELOPER"],
            "bullets": [
                "Developed responsive, component-driven user interfaces using modern JavaScript frameworks.",
                "Integrated front-end client components with RESTful backend APIs for real-time data visualization."
            ]
        },
        {
            "role": "AI Automation Engineer",
            "company": "Vocal Bridge (Voice AI & Automation)",
            "location": "Chennai, India",
            "year_info": "2024 - Present",
            "role_relevance": ["GENERATIVE_AI", "AI_ML_DOCUMENT_INTELLIGENCE", "PRODUCT_SUPPORT"],
            "bullets": [
                "Developed automated voice interactions and business process automation pipelines using voice AI models.",
                "Engineered reliable workflow triggers and API integrations for automated client communications."
            ]
        }
    ],
    "preferences": {
        "target_roles": [
            "AI/ML Intern",
            "Python Developer Intern",
            "Generative AI Intern",
            "Software Developer Intern",
            "Product Developer Intern",
            "Data Analyst Intern",
            "Product Support Intern"
        ],
        "locations": [
            "Chennai, Tamil Nadu, India",
            "Remote",
            "Bengaluru, Karnataka, India",
            "Hyderabad, Telangana, India"
        ],
        "min_match_score": 70,
        "max_applications_per_day": 25,
        "work_mode": ["Remote", "Hybrid", "On-site"]
    }
}

def load_master_cv(path: str = None) -> Dict[str, Any]:
    # Try reading file if available
    try:
        cv_file = Path(path or settings.master_cv_path)
        if cv_file.exists():
            with open(cv_file, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception:
        pass
    # Guaranteed fallback
    return EMBEDDED_MASTER_CV

def get_or_init_master_profile(db: Session) -> MasterProfile:
    profile = db.query(MasterProfile).filter(MasterProfile.is_active == True).first()
    if not profile:
        cv_data = load_master_cv()
        profile = MasterProfile(
            personal_info=cv_data["personal_info"],
            education=cv_data["education"],
            skills=cv_data["skills"],
            projects=cv_data["projects"],
            experience=cv_data["experience"],
            preferences=cv_data.get("preferences", {}),
            version=1,
            is_active=True
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

load_master_cv_from_file = load_master_cv
