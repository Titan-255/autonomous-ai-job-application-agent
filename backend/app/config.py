from pydantic_settings import BaseSettings
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / 'data'
RESUMES_DIR = BASE_DIR / 'resumes'

class Settings(BaseSettings):
    app_name: str = 'Autonomous AI Job Application Agent'
    database_url: str = f'sqlite:///{DATA_DIR}/app.db'
    master_cv_path: str = str(DATA_DIR / 'master_cv.json')
    resumes_dir: str = str(RESUMES_DIR)
    browser_user_data_dir: str = str(DATA_DIR / 'browser_profile')
    
    # LLM Settings
    llm_provider: str = 'local_rule_based'  # 'openai', 'gemini', 'ollama', 'local_rule_based'
    openai_api_key: str = ''
    openai_base_url: str = 'https://api.openai.com/v1'
    openai_model: str = 'gpt-4o-mini'
    
    # Automation Defaults
    demo_mode: bool = True
    default_location: str = 'Chennai, Tamil Nadu, India'
    min_match_score: int = 70
    max_apps_per_session: int = 10
    max_apps_per_day: int = 25
    rate_limit_delay_seconds: int = 3
    
    class Config:
        env_file = '.env'
        extra = 'ignore'

settings = Settings()
