import subprocess
import sys
import time
import os

def main():
    print("===============================================================")
    print(" Starting Autonomous AI Job Application Agent")
    print(" Candidate: Tarun S | Location: Chennai, India")
    print("===============================================================")
    
    print("[1/2] Starting FastAPI Backend on http://localhost:8000 ...")
    backend_proc = subprocess.Popen([
        sys.executable, "-m", "uvicorn", "backend.app.main:app",
        "--host", "0.0.0.0", "--port", "8000", "--reload"
    ])
    
    time.sleep(2)
    
    print("[2/2] Starting Vite React Frontend on http://localhost:5173 ...")
    frontend_proc = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd=os.path.join(os.getcwd(), "frontend"),
        shell=True
    )
    
    print("\n?? Application is running!")
    print(" ?? Dashboard UI: http://localhost:5173")
    print(" ?? Backend API Docs: http://localhost:8000/docs")
    print(" ?? Role Resumes Directory: ./resumes/")
    print("\nPress Ctrl+C to stop both servers.")
    
    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        backend_proc.terminate()
        frontend_proc.terminate()

if __name__ == "__main__":
    main()
