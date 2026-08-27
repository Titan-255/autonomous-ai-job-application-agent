import re
from typing import List, Dict, Any, Tuple
from pypdf import PdfReader
import pdfplumber
from pathlib import Path

def clean_alphanumeric(text: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]", "", text.lower())

def validate_anti_fabrication(resume_data: Dict[str, Any], master_profile_data: Dict[str, Any]) -> Tuple[bool, List[str]]:
    unverified_claims = []
    
    text_content = (
        resume_data.get("summary", "") + " " +
        " ".join([" ".join(p.get("bullets", [])) for p in resume_data.get("projects", [])]) + " " +
        " ".join([" ".join(e.get("bullets", [])) for e in resume_data.get("experience", [])])
    )
    
    percentages = re.findall(r"(\d+%)", text_content)
    cv_raw_text = str(master_profile_data)
    for p in percentages:
        if p not in ["5/20-day"]:
            if p not in cv_raw_text:
                unverified_claims.append(f"Unverified metric found: {p}")
                
    valid_project_clean = [clean_alphanumeric(p["name"]) for p in master_profile_data.get("projects", [])]
    valid_short_names = ["spectrumai", "hypertradeai", "email", "meeting", "autonomous"]
    
    for proj in resume_data.get("projects", []):
        p_clean = clean_alphanumeric(proj.get("name", ""))
        is_known = any(v in p_clean or p_clean in v for v in valid_project_clean) or any(s in p_clean for s in valid_short_names)
        if not is_known:
            proj_title = proj.get("name", "Unknown")
            unverified_claims.append(f"Unverified project title: {proj_title}")
            
    is_passed = len(unverified_claims) == 0
    return is_passed, unverified_claims

def test_pdf_ats_extractability(pdf_path: str) -> Dict[str, Any]:
    path = Path(pdf_path)
    if not path.exists():
        return {"is_valid": False, "error": "PDF file does not exist"}
    
    try:
        reader = PdfReader(str(path))
        page_count = len(reader.pages)
        full_text = ""
        for p in reader.pages:
            full_text += p.extract_text() or ""
            
        with pdfplumber.open(str(path)) as pdf:
            plumber_text = ""
            for p in pdf.pages:
                plumber_text += p.extract_text() or ""
                
        is_extractable = len(full_text.strip()) > 100
        has_essential_sections = all(
            sec in full_text.upper() for sec in ["EDUCATION", "SKILLS", "PROJECTS"]
        )
        
        return {
            "is_valid": is_extractable and has_essential_sections,
            "page_count": page_count,
            "extracted_text_sample": full_text[:400] + "...",
            "text_length": len(full_text),
            "has_essential_sections": has_essential_sections,
            "is_single_page": (page_count == 1)
        }
    except Exception as e:
        return {"is_valid": False, "error": str(e), "page_count": 0}

def score_ats_compatibility(pdf_path: str, target_keywords: List[str]) -> Tuple[int, List[str], List[str]]:
    extraction = test_pdf_ats_extractability(pdf_path)
    if not extraction.get("is_valid", False):
        return 0, [], target_keywords
        
    reader = PdfReader(pdf_path)
    full_text = " ".join([p.extract_text() or "" for p in reader.pages]).upper()
    
    detected = []
    missing = []
    
    for kw in target_keywords:
        if kw.upper() in full_text:
            detected.append(kw)
        else:
            missing.append(kw)
            
    base_score = 75 if extraction.get("is_single_page") else 50
    if target_keywords:
        kw_ratio = len(detected) / len(target_keywords)
        kw_score = int(kw_ratio * 25)
    else:
        kw_score = 25
        
    final_score = min(100, base_score + kw_score)
    return final_score, detected, missing
