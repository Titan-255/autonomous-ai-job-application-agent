from sqlalchemy.orm import Session
from datetime import datetime
from typing import Dict, Any, List
from backend.app.models.application import Application, AuditLog
from backend.app.models.job import Job, JobMatch
from backend.app.models.resume import ResumeRecord

def log_audit_action(db: Session, action_type: str, description: str, payload: Dict[str, Any] = None):
    log = AuditLog(
        action_type=action_type,
        description=description,
        payload=payload or {},
        created_at=datetime.utcnow()
    )
    db.add(log)
    db.commit()

def transition_application_status(db: Session, application_id: int, new_status: str, notes: str = None) -> Application:
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise ValueError(f"Application {application_id} not found")
    app.status = new_status
    if notes:
        app.submission_notes = notes
    if new_status == "APPLICATION_READY":
        app.date_prepared = datetime.utcnow()
    elif new_status == "SUBMITTED":
        app.date_applied = datetime.utcnow()
    db.commit()
    db.refresh(app)
    
    log_audit_action(
        db,
        action_type=f"APP_STATUS_{new_status}",
        description=f"Application for {app.company} ({app.job_title}) transitioned to {new_status}",
        payload={"app_id": app.id, "status": new_status}
    )
    return app
