# Autonomous AI Job Application Agent

A production-grade, local-first **Autonomous AI Job Application Agent** built for **Tarun S**, a Computer Science student at Amrita Vishwa Vidyapeetham targeting AI/ML, Python Backend, Generative AI, and Software Engineering internships.

---

## Key Features

1. **Master CV Factual Grounding & Anti-Fabrication**:
   - Zero hallucination guarantee. All resume content and application answers strictly adhere to Tarun S's authentic master CV facts.
   - Built-in anti-fabrication validator (`ats_validator.py`) detecting and rejecting ungrounded metrics or claims.

2. **7 Role-Specific ATS-Optimized Resumes (ReportLab PDF)**:
   - Dedicated 1-page ATS resumes for:
     1. `AI/ML Intern ? Document Intelligence` (`/resumes/AI_ML_Document_Intelligence/`)
     2. `Python Developer Intern` (`/resumes/Python_Developer/`)
     3. `Generative AI Intern` (`/resumes/Generative_AI/`)
     4. `Software Developer Intern` (`/resumes/Software_Developer/`)
     5. `Product Developer Intern` (`/resumes/Product_Developer/`)
     6. `Data Analyst Intern` (`/resumes/Data_Analyst/`)
     7. `Product Support Intern` (`/resumes/Product_Support/`)
   - Standard single-column typography, exact 1-page geometry bounds, and 100% extractable OCR text.
   - Companion artifacts saved alongside each PDF: `resume_source.json`, `job_description.txt`, `match_analysis.json`, `application_metadata.json`.

3. **Semantic Job Relevance & Scoring Engine (0-100)**:
   - Weighted scoring: Role Match (25) + Technical Skills (25) + Projects (15) + Education (10) + Experience (10) + Location (5) + AI/ML Relevance (5) + Internship Compatibility (5).
   - Semantic skill synonyms map (e.g. ChromaDB $\leftrightarrow$ Vector DB, FastAPI $\leftrightarrow$ Python Backend, Whisper $\leftrightarrow$ Speech-to-Text).

4. **Human-In-The-Loop Safety & Browser Automation**:
   - **Playwright** browser engine with persistent Chromium profile (`data/browser_profile/`) preserving authentic login sessions.
   - Automatic pause & user notification on CAPTCHA / bot challenges.
   - Zero blind submissions: "APPLY NOW", "APPROVE BATCH", and global "STOP AUTOMATION" emergency controls.
   - Built-in **Demo Mode** for instant simulated testing with high-fidelity opportunities.

5. **Modern Dark-Mode Dashboard (React + TypeScript + Tailwind CSS)**:
   - Real-time KPI metrics, job discovery query builder, shortlisted high-fit jobs, embedded PDF viewer with ATS scores, master CV editor with version snapshots, and pipeline conversion analytics.

---

## Quickstart

### 1. Requirements
- Python 3.11+
- Node.js 18+

### 2. Setup Dependencies
```bash
# Backend dependencies
pip install -r backend/requirements.txt

# Frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Launch Development Servers
```bash
python run_dev.py
```
- Dashboard UI: `http://localhost:5173`
- Backend API Docs: `http://localhost:8000/docs`

### 4. Run Test Suite
```bash
python -m pytest backend/tests -v
```
