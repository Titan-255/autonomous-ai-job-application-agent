from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Boolean
from datetime import datetime
from backend.app.database import Base

class MasterProfile(Base):
    __tablename__ = 'master_profiles'
    id = Column(Integer, primary_key=True, index=True)
    version = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)
    personal_info = Column(JSON, nullable=False)
    professional_summary = Column(Text, nullable=False)
    education = Column(JSON, nullable=False)
    skills = Column(JSON, nullable=False)
    projects = Column(JSON, nullable=False)
    experience = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ProfileVersionHistory(Base):
    __tablename__ = 'profile_version_history'
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, nullable=False)
    version = Column(Integer, nullable=False)
    snapshot = Column(JSON, nullable=False)
    change_summary = Column(String(255), default='Manual update')
    created_at = Column(DateTime, default=datetime.utcnow)
