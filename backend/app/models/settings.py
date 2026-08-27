from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Boolean
from datetime import datetime
from backend.app.database import Base

class UserSettingsModel(Base):
    __tablename__ = 'user_settings'
    id = Column(Integer, primary_key=True, index=True)
    target_role_groups = Column(JSON, nullable=False)
    preferred_locations = Column(JSON, nullable=False)
    min_match_score = Column(Integer, default=70)
    max_apps_per_session = Column(Integer, default=10)
    max_apps_per_day = Column(Integer, default=25)
    rate_limit_delay_seconds = Column(Integer, default=3)
    demo_mode = Column(Boolean, default=True)
    auto_generate_resume = Column(Boolean, default=True)
    blocked_companies = Column(JSON, default=list)
    preferred_companies = Column(JSON, default=list)
    llm_provider = Column(String(50), default='local_rule_based')
    openai_api_key = Column(String(255), default='')
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
