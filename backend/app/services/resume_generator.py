from typing import Dict, Any, List
from backend.app.models.profile import MasterProfile

TARGET_ROLE_TAXONOMY = {
    'AI_ML_DOCUMENT_INTELLIGENCE': {
        'name': 'AI/ML Intern — Document Intelligence',
        'folder': 'AI_ML_Document_Intelligence',
        'resume_title': 'AI/ML Intern | Python | NLP | RAG | Document Intelligence',
        'summary': (
            'Computer Science undergraduate at Amrita Vishwa Vidyapeetham with strong Python fundamentals '
            'and hands-on experience building AI/ML applications, RAG pipelines, and document intelligence engines. '
            'Skilled in Supervised Learning, NLP, vector embeddings (ChromaDB), and Scikit-learn with practical '
            'speech-to-text and text analytics implementations.'
        ),
        'priority_skills': [
            'Python (Strong)', 'Machine Learning', 'Supervised Learning', 'Retrieval-Augmented Generation (RAG)',
            'NLP', 'Vector Embeddings', 'Semantic Search', 'Model Evaluation', 'Scikit-learn', 'ChromaDB',
            'OpenAI APIs (Whisper, Embeddings)', 'FastAPI', 'PyTorch & TensorFlow (Foundational)', 'Git', 'Docker'
        ],
        'priority_project_ids': ['spectrum_ai', 'email_agent', 'hypertrade_ai', 'meeting_platform']
    },
    'PYTHON_DEVELOPER': {
        'name': 'Python Developer Intern',
        'folder': 'Python_Developer',
        'resume_title': 'Python Developer Intern | Python | FastAPI | REST APIs | Backend',
        'summary': (
            'Computer Science undergraduate with rigorous Python software engineering fundamentals and hands-on '
            'experience designing high-throughput REST APIs, backend architectures, and database services using FastAPI, '
            'Django, and PostgreSQL. Adept in data processing pipelines, Docker containerization, and clean OOP principles.'
        ),
        'priority_skills': [
            'Python (Strong)', 'FastAPI', 'Django', 'REST APIs', 'PostgreSQL', 'SQLite', 'Docker',
            'Git', 'GitHub', 'Object-Oriented Programming (OOP)', 'SQL', 'Agile Development', 'Node.js'
        ],
        'priority_project_ids': ['spectrum_ai', 'meeting_platform', 'hypertrade_ai', 'email_agent']
    },
    'GENERATIVE_AI': {
        'name': 'Generative AI Intern',
        'folder': 'Generative_AI',
        'resume_title': 'Generative AI Intern | RAG | LLM Applications | AI Agents | Python',
        'summary': (
            'Computer Science student specializing in Generative AI systems, context-aware RAG pipelines, autonomous '
            'AI agents, and semantic search architectures. Hands-on experience integrating LLM APIs, ChromaDB vector stores, '
            'OpenAI Whisper audio processing, and prompt-driven document intelligence workflows.'
        ),
        'priority_skills': [
            'Retrieval-Augmented Generation (RAG)', 'Vector Embeddings', 'Semantic Search', 'ChromaDB',
            'OpenAI APIs (Whisper, Embeddings)', 'NLP', 'Python (Strong)', 'FastAPI', 'REST APIs', 'Docker', 'Git'
        ],
        'priority_project_ids': ['spectrum_ai', 'email_agent', 'meeting_platform', 'hypertrade_ai']
    },
    'SOFTWARE_DEVELOPER': {
        'name': 'Software Developer Intern',
        'folder': 'Software_Developer',
        'resume_title': 'Software Developer Intern | Python | Java | REST APIs | SQL',
        'summary': (
            'Computer Science student with strong foundations in Data Structures, Algorithms, Object-Oriented Programming, '
            'and Full-Stack Web Development. Proven experience engineering robust RESTful APIs, relational schemas (PostgreSQL/SQL), '
            'and interactive applications across Python, Java, JavaScript, React, and Angular.'
        ),
        'priority_skills': [
            'Python (Strong)', 'Java', 'JavaScript', 'SQL', 'REST APIs', 'PostgreSQL', 'SQLite',
            'FastAPI', 'Django', 'React', 'Angular', 'Git', 'Docker', 'OOP', 'Data Structures & Algorithms'
        ],
        'priority_project_ids': ['spectrum_ai', 'meeting_platform', 'hypertrade_ai', 'email_agent']
    },
    'PRODUCT_DEVELOPER': {
        'name': 'Product Developer Intern',
        'folder': 'Product_Developer',
        'resume_title': 'Product Developer Intern | Python | Backend | APIs | Product Development',
        'summary': (
            'Proactive engineering student with cross-functional experience spanning product engineering, backend API development, '
            'and agile feature delivery. Hands-on background translating user feedback into scalable technical specifications, '
            'optimizing application workflows, and building full-stack AI-driven web platforms.'
        ),
        'priority_skills': [
            'Python', 'REST APIs', 'FastAPI', 'PostgreSQL', 'JavaScript', 'React', 'Agile Development',
            'Git', 'Feature Iteration', 'Database Design', 'Problem Solving'
        ],
        'priority_project_ids': ['spectrum_ai', 'meeting_platform', 'email_agent', 'hypertrade_ai']
    },
    'DATA_ANALYST': {
        'name': 'Data Analyst Intern',
        'folder': 'Data_Analyst',
        'resume_title': 'Data Analyst Intern | Python | SQL | Pandas | NumPy | Data Analytics',
        'summary': (
            'Analytical Computer Science undergraduate with expertise in quantitative data analysis, time-series data cleaning, '
            'and predictive modeling. Proficient in Python, SQL, NumPy, Pandas, Scikit-learn, and exploratory data analysis (EDA) '
            'with practical experience developing algorithmic market evaluation engines.'
        ),
        'priority_skills': [
            'Python (Strong)', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn (TF-IDF, Text Classification)',
            'Exploratory Data Analysis (EDA)', 'Data Preprocessing', 'Model Evaluation', 'PostgreSQL', 'SQLite'
        ],
        'priority_project_ids': ['hypertrade_ai', 'spectrum_ai', 'email_agent', 'meeting_platform']
    },
    'PRODUCT_SUPPORT': {
        'name': 'Product Support Intern',
        'folder': 'Product_Support',
        'resume_title': 'Product Support Intern | Technical Support | Python | SQL | APIs',
        'summary': (
            'Technically adept Computer Science student with leadership experience in startup product support, technical issue triage, '
            'and cross-functional engineering collaboration. Proficient in diagnosing API/database issues, writing automated scripts in Python, '
            'and communicating technical solutions clearly to cross-functional stakeholders.'
        ),
        'priority_skills': [
            'Technical Support & Troubleshooting', 'Python', 'SQL', 'REST APIs', 'Customer Issue Resolution',
            'PostgreSQL', 'Agile Sprint Planning', 'Git', 'System Debugging', 'Technical Communication'
        ],
        'priority_project_ids': ['meeting_platform', 'spectrum_ai', 'email_agent', 'hypertrade_ai']
    }
}

def generate_role_specific_resume_content(
    profile: MasterProfile,
    role_category: str,
    company_name: str = 'Standard',
    job_keywords: List[str] = None
) -> Dict[str, Any]:
    role_config = TARGET_ROLE_TAXONOMY.get(role_category, TARGET_ROLE_TAXONOMY['PYTHON_DEVELOPER'])
    
    personal_info = dict(profile.personal_info)
    summary = role_config['summary']
    if company_name and company_name != 'Standard':
        summary = summary.replace('as a Python AI Engineer Intern.', f'at {company_name}.')
        summary = summary.replace('at Baigen Techno Labs.', f'at {company_name}.')
        
    raw_projects = {p['id']: p for p in profile.projects}
    ordered_projects = []
    for pid in role_config['priority_project_ids']:
        if pid in raw_projects:
            ordered_projects.append(raw_projects[pid])
    for pid, p in raw_projects.items():
        if p not in ordered_projects:
            ordered_projects.append(p)
            
    ordered_skills = {
        'programming': profile.skills.get('programming', []),
        'ai_ml': profile.skills.get('ai_ml', []),
        'data_science': profile.skills.get('data_science', []),
        'ml_frameworks_tools': profile.skills.get('ml_frameworks_tools', []),
        'web_backend': profile.skills.get('web_backend', []),
        'tools_concepts': profile.skills.get('tools_concepts', [])
    }
    
    experience = profile.experience
    
    return {
        'role_category': role_category,
        'company_name': company_name,
        'resume_title': role_config['resume_title'],
        'personal_info': personal_info,
        'summary': summary,
        'education': profile.education,
        'skills': ordered_skills,
        'priority_skills': role_config['priority_skills'],
        'projects': ordered_projects,
        'experience': experience,
        'folder': role_config['folder']
    }