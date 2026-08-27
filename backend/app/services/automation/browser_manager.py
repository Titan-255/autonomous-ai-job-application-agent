from typing import Optional, Dict, Any
from pathlib import Path
from backend.app.config import settings

class BrowserAutomationManager:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BrowserAutomationManager, cls).__new__(cls)
            cls._instance.status = "IDLE" # IDLE, RUNNING, PAUSED_LOGIN_REQUIRED, PAUSED_CAPTCHA, STOPPED
            cls._instance.current_action = "Ready"
            cls._instance.requires_user_action = False
            cls._instance.user_message = None
            cls._instance.stop_requested = False
            cls._instance.jobs_processed = 0
            cls._instance.apps_prepared = 0
            cls._instance.apps_submitted = 0
        return cls._instance
        
    def set_status(self, status: str, action: str = "", msg: str = None, requires_user: bool = False):
        self.status = status
        self.current_action = action
        self.user_message = msg
        self.requires_user_action = requires_user
        
    def request_stop(self):
        self.stop_requested = True
        self.status = "STOPPED"
        self.current_action = "Automation stopped by user"
        self.requires_user_action = False
        
    def reset(self):
        self.stop_requested = False
        self.status = "IDLE"
        self.current_action = "Ready"
        self.requires_user_action = False
        self.user_message = None

browser_manager = BrowserAutomationManager()
