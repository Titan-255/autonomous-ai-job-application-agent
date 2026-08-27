from typing import Dict, Any, List
from backend.app.config import settings
from backend.app.models.profile import MasterProfile

class LLMProvider:
    def generate_cover_letter(self, job_title: str, company: str, job_description: str, profile: MasterProfile) -> str:
        raise NotImplementedError
        
    def answer_application_question(self, question: str, profile: MasterProfile) -> Dict[str, Any]:
        raise NotImplementedError

class LocalRuleBasedLLMProvider(LLMProvider):
    def generate_cover_letter(self, job_title: str, company: str, job_description: str, profile: MasterProfile) -> str:
        pinfo = profile.personal_info
        lines = [
            f"Dear Hiring Team at {company},",
            "",
            f"I am writing to express my enthusiastic interest in the {job_title} position. As a Computer Science undergraduate "
            f"at Amrita Vishwa Vidyapeetham with strong hands-on experience building AI/ML applications, RAG pipelines, and backend "
            f"APIs using Python, FastAPI, and PostgreSQL, I am eager to contribute effectively to your team.",
            "",
            f"In my recent project, Spectrum AI, I engineered a document intelligence platform utilizing OpenAI Whisper and ChromaDB "
            f"for context-aware retrieval. Additionally, through my product and engineering experience with early-stage tech teams, "
            f"I have developed robust problem-solving skills and agile development discipline.",
            "",
            f"I look forward to discussing how my skills in Python, AI/ML, and software engineering align with your goals.",
            "",
            f"Sincerely,",
            f"{pinfo.get('name', 'Tarun S')}",
            f"{pinfo.get('phone', '')} | {pinfo.get('email', '')}"
        ]
        return "\n".join(lines)
        
    def answer_application_question(self, question: str, profile: MasterProfile) -> Dict[str, Any]:
        q_lower = question.lower()
        
        if "authorized to work" in q_lower or "work authorization" in q_lower or "eligible to work in india" in q_lower:
            return {
                "suggested_answer": "Yes, I am a citizen of India and legally authorized to work in India.",
                "reasoning": "Factual citizen location in Chennai, India from Master CV.",
                "is_approved": True
            }
        elif "graduation" in q_lower or "pass out" in q_lower or "year of completion" in q_lower:
            return {
                "suggested_answer": "2028 (Currently in 3rd Year B.Tech CSE, Amrita Vishwa Vidyapeetham).",
                "reasoning": "Education section in Master CV.",
                "is_approved": True
            }
        elif "notice period" in q_lower or "how soon" in q_lower or "start date" in q_lower:
            return {
                "suggested_answer": "Immediately available for internship.",
                "reasoning": "Internship candidate status.",
                "is_approved": True
            }
        elif "relocate" in q_lower or "location preference" in q_lower:
            return {
                "suggested_answer": "Based in Chennai, open to remote and on-site opportunities.",
                "reasoning": "Location details from Master CV.",
                "is_approved": True
            }
        elif "salary" in q_lower or "stipend" in q_lower or "compensation" in q_lower:
            return {
                "suggested_answer": "Standard company stipend for internship role.",
                "reasoning": "Standard internship compensation baseline.",
                "is_approved": False
            }
        else:
            return {
                "suggested_answer": "Passionate about applying Python, AI/ML, and software engineering skills to build scalable solutions.",
                "reasoning": "General background alignment.",
                "is_approved": False
            }

def get_llm_service() -> LLMProvider:
    return LocalRuleBasedLLMProvider()
