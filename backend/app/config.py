from pydantic_settings import BaseSettings
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent

def is_env_serverless():
    return bool(
        os.environ.get("VERCEL")
        or os.environ.get("VERCEL_ENV")
        or os.environ.get("AWS_LAMBDA_FUNCTION_NAME")
        or os.environ.get("LAMBDA_TASK_ROOT")
        or os.environ.get("AWS_EXECUTION_ENV")
    )

def get_writable_paths():
    if is_env_serverless():
        tmp_resumes = Path("/tmp/resumes")
        tmp_resumes.mkdir(parents=True, exist_ok=True)
        return "sqlite:////tmp/app.db", str(tmp_resumes), "/tmp/browser_profile"
        
    try:
        data_dir = BASE_DIR / 'data'
        data_dir.mkdir(parents=True, exist_ok=True)
        test_file = data_dir / '.write_test'
        test_file.touch()
        test_file.unlink()
        
        resumes_dir = BASE_DIR / 'resumes'
        resumes_dir.mkdir(parents=True, exist_ok=True)
        return f"sqlite:///{data_dir}/app.db", str(resumes_dir), str(data_dir / 'browser_profile')
    except Exception:
        tmp_resumes = Path("/tmp/resumes")
        tmp_resumes.mkdir(parents=True, exist_ok=True)
        return "sqlite:////tmp/app.db", str(tmp_resumes), "/tmp/browser_profile"

DB_URL, RESUMES_PATH, BROWSER_PATH = get_writable_paths()

class Settings(BaseSettings):
    app_name: str = 'Autonomous AI Job Application Agent'
    database_url: str = DB_URL
    master_cv_path: str = str(BASE_DIR / 'data' / 'master_cv.json')
    resumes_dir: str = RESUMES_PATH
    browser_user_data_dir: str = BROWSER_PATH
    
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
        env_file = None if is_env_serverless() else '.env'
        extra = 'ignore'

settings = Settings()
settings.database_url = DB_URL
settings.resumes_dir = RESUMES_PATH
settings.browser_user_data_dir = BROWSER_PATH
