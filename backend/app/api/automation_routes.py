from fastapi import APIRouter
from backend.app.schemas.automation import AutomationStatusResponse, AutomationActionRequest
from backend.app.services.automation.browser_manager import browser_manager
from backend.app.config import settings

router = APIRouter(prefix="/automation", tags=["Automation"])

@router.get("/status", response_model=AutomationStatusResponse)
def get_automation_status():
    return {
        "status": browser_manager.status,
        "current_action": browser_manager.current_action,
        "jobs_processed": browser_manager.jobs_processed,
        "applications_prepared": browser_manager.apps_prepared,
        "applications_submitted": browser_manager.apps_submitted,
        "requires_user_action": browser_manager.requires_user_action,
        "user_message": browser_manager.user_message,
        "demo_mode": settings.demo_mode
    }

@router.post("/action")
def trigger_automation_action(payload: AutomationActionRequest):
    act = payload.action.upper()
    if act == "STOP":
        browser_manager.request_stop()
    elif act == "RESUME":
        browser_manager.reset()
    elif act == "TOGGLE_DEMO":
        settings.demo_mode = not settings.demo_mode
    return {
        "action": act,
        "status": browser_manager.status,
        "demo_mode": settings.demo_mode
    }
