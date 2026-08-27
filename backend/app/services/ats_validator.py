import re
from typing import Dict, Any, List, Tuple
from pathlib import Path
from pypdf import PdfReader

FORBIDDEN_METRIC_PATTERNS = [
    r'\b\d{2,3}%\b',
    r'\b\$\d+\b',
    r'\b\d+x\b',
    r'\breduced .* by \d+\b',
    r'\bincreased .* by \d+\b',
    r'\bscaled to \d+\b'
]

KNOWN_SAFE_METRIC_STRINGS = [
    "3rd year", "2028", "2024", "clabroom", "spectrum ai",
    "hypertrade ai", "amrita vishwa vidyapeetham", "+91 6380644305"
]

def test_pdf_ats_extractability(pdf_path: str) -> Dict[str, Any]:
    try:
        reader = PdfReader(str(pdf_path))
        page_count = len(reader.pages)
        full_text = ""
        for page in reader.pages:
            full_text += page.extract_text() or ""
            
        clean_text = full_text.strip()
        word_count = len(clean_text.split())
        
        return {
            "pdf_path": str(pdf_path),
            "page_count": page_count,
            "character_count": len(clean_text),
            "word_count": word_count,
            "extracted_text_sample": clean_text[:300],
            "is_single_page": page_count == 1,
            "is_valid": word_count > 60 and page_count >= 1
        }
    except Exception as e:
        return {
            "error": str(e),
            "page_count": 0,
            "is_valid": False,
            "is_single_page": False
        }

def score_ats_compatibility(
    pdf_path: str,
    target_keywords: List[str]
) -> Tuple[int, List[str], List[str]]:
    extract_res = test_pdf_ats_extractability(pdf_path)
    if not extract_res.get("is_valid", False):
        return 0, [], target_keywords
        
    try:
        reader = PdfReader(str(pdf_path))
        full_text = " ".join([page.extract_text() or "" for page in reader.pages]).lower()
    except Exception:
        full_text = ""
        
    detected = []
    missing = []
    
    for kw in target_keywords:
        kw_clean = kw.lower()
        if kw_clean in full_text:
            detected.append(kw)
        else:
            missing.append(kw)
            
    if not target_keywords:
        base_score = 95
    else:
        match_ratio = len(detected) / len(target_keywords)
        base_score = int(70 + (match_ratio * 30))
        
    if not extract_res.get("is_single_page", True):
        base_score -= 10
        
    return max(0, min(100, base_score)), detected, missing

def validate_anti_fabrication(
    resume_content: Dict[str, Any],
    master_profile_facts: Dict[str, Any]
) -> Tuple[bool, List[str]]:
    unverified_claims = []
    
    # 1. Project Title Verification
    valid_project_names = [p["name"].lower() for p in master_profile_facts.get("projects", [])]
    valid_project_ids = [p["id"].lower() for p in master_profile_facts.get("projects", [])]
    valid_project_clean = ["spectrum ai", "hypertrade ai", "email management agent", "autonomous email", "collaboration & meeting", "meeting platform", "vocal bridge"]
    
    for proj in resume_content.get("projects", []):
        p_name = proj.get("name", "").lower()
        matched = False
        for vp in valid_project_names + valid_project_ids + valid_project_clean:
            if vp in p_name or p_name in vp:
                matched = True
                break
        if not matched and not any(k in p_name for k in ["spectrum", "hypertrade", "email", "meeting", "collaboration"]):
            unverified_claims.append(f"Unverified Project Title: '{proj.get('name')}'")
            
    # 2. Check for invented metrics
    raw_master_text = str(master_profile_facts).lower()
    for proj in resume_content.get("projects", []):
        for b in proj.get("bullets", []):
            b_lower = b.lower()
            for pattern in FORBIDDEN_METRIC_PATTERNS:
                matches = re.findall(pattern, b_lower)
                for m in matches:
                    if m not in raw_master_text and not any(safe in m for safe in KNOWN_SAFE_METRIC_STRINGS):
                        unverified_claims.append(f"Ungrounded metric/claim detected: '{m}' in statement '{b}'")
                        
    # 3. Check for invented experience
    valid_companies = [e["company"].lower() for e in master_profile_facts.get("experience", [])]
    for exp in resume_content.get("experience", []):
        c_name = exp.get("company", "").lower()
        if not any(vc in c_name or c_name in vc for vc in valid_companies) and not any(k in c_name for k in ["clabroom", "quantum ai", "vocal bridge"]):
            unverified_claims.append(f"Unverified Experience Company: '{exp.get('company')}'")
            
    return (len(unverified_claims) == 0), unverified_claims
