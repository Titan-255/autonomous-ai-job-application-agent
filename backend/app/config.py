from pydantic_settings import BaseSettings
from pathlib import Path
import os
import shutil

BASE_DIR = Path(__file__).resolve().parent.parent.parent
BUNDLE_DATA_DIR = BASE_DIR / 'data'
BUNDLE_MASTER_CV = BUNDLE_DATA_DIR / 'master_cv.json'

is_serverless = bool(os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"))

if is_serverless:
    RUNTIME_DATA_DIR = Path("/tmp/app_data")
    RUNTIME_RESUMES_DIR = Path("/tmp/app_resumes")
    RUNTIME_DATA_DIR.mkdir(parents=True, exist_ok=True)
    RUNTIME_RESUMES_DIR.mkdir(parents=True, exist_ok=True)
    
    runtime_master_cv = RUNTIME_DATA_DIR / 'master_cv.json'
    if not runtime_master_cv.exists() and BUNDLE_MASTER_CV.exists():
        try:
            shutil.copy(str(BUNDLE_MASTER_CV), str(runtime_master_cv))
        except Exception:
            pass
        
    DB_PATH = str(RUNTIME_DATA_DIR / 'app.db')
    RESUMES_PATH = str(RUNTIME_RESUMES_DIR)
    CV_PATH = str(runtime_master_cv) if runtime_master_cv.exists() else str(BUNDLE_MASTER_CV)
else:
    RUNTIME_DATA_DIR = BUNDLE_DATA_DIR
    RUNTIME_RESUMES_DIR = BASE_DIR / 'resumes'
    RUNTIME_DATA_DIR.mkdir(parents=True, exist_ok=True)
    RUNTIME_RESUMES_DIR.mkdir(parents=True, exist_ok=True)
    DB_PATH = str(RUNTIME_DATA_DIR / 'app.db')
    RESUMES_PATH = str(RUNTIME_RESUMES_DIR)
    CV_PATH = str(BUNDLE_MASTER_CV)

class Settings(BaseSettings):
    app_name: str = 'Autonomous AI Job Application Agent'
    database_url: str = f'sqlite:///{DB_PATH}'
    master_cv_path: str = CV_PATH
    resumes_dir: str = RESUMES_PATH
    browser_user_data_dir: str = str(RUNTIME_DATA_DIR / 'browser_profile')
    
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
        env_file = '.env' if not is_serverless else None
        extra = 'ignore'

settings = Settings()

# Force serverless paths to avoid .env override
if is_serverless:
    settings.database_url = f'sqlite:///{DB_PATH}'
    settings.resumes_dir = RESUMES_PATH
    settings.master_cv_path = CV_PATH
    settings.browser_user_data_dir = str(RUNTIME_DATA_DIR / 'browser_profile')
