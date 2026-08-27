import sys
import traceback
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import JSONResponse

root_dir = Path(__file__).resolve().parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

app = FastAPI()

try:
    from backend.app.main import app as main_app
    app = main_app
except Exception as init_err:
    err_tb = traceback.format_exc()
    @app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE"])
    async def error_fallback(full_path: str):
        return JSONResponse(
            status_code=500,
            content={"error": "FastAPI Initialization Failed", "detail": err_tb}
        )
