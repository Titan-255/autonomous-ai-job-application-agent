from abc import ABC, abstractmethod
from typing import List, Dict, Any

class JobPlatformAdapter(ABC):
    @abstractmethod
    def search_jobs(self, query: str, location: str, max_results: int = 20) -> List[Dict[str, Any]]:
        pass
        
    @abstractmethod
    def extract_job(self, job_url: str) -> Dict[str, Any]:
        pass
        
    @abstractmethod
    def prepare_application(self, job_url: str, resume_path: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        pass
        
    @abstractmethod
    def submit_application(self, application_id: int) -> Dict[str, Any]:
        pass
