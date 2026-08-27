from pydantic_settings import BaseSettings
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent
is_serverless = bool(os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"))

if is_serverless:
    DB_URL = "sqlite:////tmp/app.db"
    RESUMES_PATH = "/tmp/resumes"
    Path(RESUMES_PATH).mkdir(parents=True, exist_ok=True)
    CV_PATH = str(BASE_DIR / 'data' / 'master_cv.json')
else:
    DATA_DIR = BASE_DIR / 'data'
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    RESUMES_DIR = BASE_DIR / 'resumes'
    RESUMES_DIR.mkdir(parents=True, exist_ok=True)
    DB_URL = f"sqlite:///{DATA_DIR}/app.db"
    RESUMES_PATH = str(RESUMES_DIR)
    CV_PATH = str(DATA_DIR / 'master_cv.json')

class Settings(BaseSettings):
    app_name: str = 'Autonomous AI Job Application Agent'
    database_url: str = DB_URL
    master_cv_path: str = CV_PATH
    resumes_dir: str = RESUMES_PATH
    browser_user_data_dir: str = "/tmp/browser_profile" if is_serverless else str(BASE_DIR / 'data' / 'browser_profile')
    
    llm_provider: str = 'local_rule_based'
    openai_api_key: str = ''
    openai_base_url: str = 'https://api.openai.com/v1'
    openai_model: str = 'gpt-4o-mini'
    
    demo_mode: bool = True
    default_location: str = 'Chennai, Tamil Nadu, India'
    min_match_score: int = 70
    max_apps_per_session: int = 10
    max_apps_per_day: int = 25
    rate_limit_delay_seconds: int = 3
    
    class Config:
        env_file = None if is_serverless else '.env'
        extra = 'ignore'

settings = Settings()

if is_serverless:
    settings.database_url = "sqlite:////tmp/app.db"
    settings.resumes_dir = "/tmp/resumes"
    settings.browser_user_data_dir = "/tmp/browser_profile"
