from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class AutomationStatusResponse(BaseModel):
    status: str # IDLE, RUNNING, PAUSED_LOGIN_REQUIRED, PAUSED_CAPTCHA, STOPPED, ERROR
    current_action: str
    jobs_processed: int
    applications_prepared: int
    applications_submitted: int
    requires_user_action: bool
    user_message: Optional[str] = None
    demo_mode: bool = True

class AutomationActionRequest(BaseModel):
    action: str # START, PAUSE, RESUME, STOP, BATCH_APPLY
    payload: Optional[Dict[str, Any]] = None
