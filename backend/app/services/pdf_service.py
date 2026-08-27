import os
import json
import base64
from pathlib import Path
from typing import Dict, Any, List
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from backend.app.config import settings
from backend.app.services.ats_validator import (
    test_pdf_ats_extractability,
    score_ats_compatibility,
    validate_anti_fabrication
)

def generate_ats_resume_pdf(
    resume_data: Dict[str, Any],
    master_profile_data: Dict[str, Any],
    job_description: str = "",
    match_analysis: Dict[str, Any] = None
) -> Dict[str, Any]:
    role_category = resume_data.get("role_category", "Python_Developer")
    folder_name = resume_data.get("folder", "Python_Developer")
    company = resume_data.get("company_name", "General").replace(" ", "_")
    
    output_dir = Path(settings.resumes_dir) / folder_name
    output_dir.mkdir(parents=True, exist_ok=True)
    
    clean_company = "".join([c for c in company if c.isalnum() or c in ["_", "-"]]).strip("_")
    if not clean_company:
        clean_company = "General"
        
    role_short_map = {
        "AI_ML_DOCUMENT_INTELLIGENCE": "AI_ML_Intern",
        "PYTHON_DEVELOPER": "Python_Developer_Intern",
        "GENERATIVE_AI": "Generative_AI_Intern",
        "SOFTWARE_DEVELOPER": "Software_Developer_Intern",
        "PRODUCT_DEVELOPER": "Product_Developer_Intern",
        "DATA_ANALYST": "Data_Analyst_Intern",
        "PRODUCT_SUPPORT": "Product_Support_Intern"
    }
    role_file_tag = role_short_map.get(role_category, "Resume")
    pdf_filename = f"Tarun_S_{role_file_tag}_{clean_company}.pdf"
    pdf_path = output_dir / pdf_filename
    
    is_fact_safe, unverified = validate_anti_fabrication(resume_data, master_profile_data)
    
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=letter,
        leftMargin=24,
        rightMargin=24,
        topMargin=18,
        bottomMargin=18
    )
    
    story = []
    styles = getSampleStyleSheet()
    
    name_style = ParagraphStyle(
        "NameStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=15,
        leading=17,
        alignment=1,
        textColor=colors.HexColor("#111827")
    )
    
    title_style = ParagraphStyle(
        "TitleStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.8,
        leading=11.0,
        alignment=1,
        textColor=colors.HexColor("#1F2937")
    )
    
    contact_style = ParagraphStyle(
        "ContactStyle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.0,
        leading=10.0,
        alignment=1,
        textColor=colors.HexColor("#374151")
    )
    
    section_heading = ParagraphStyle(
        "SectionHeading",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.8,
        leading=10.8,
        textColor=colors.HexColor("#111827"),
        spaceBefore=2,
        spaceAfter=1
    )
    
    body_style = ParagraphStyle(
        "BodyStyle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.6,
        leading=9.5,
        textColor=colors.HexColor("#1F2937")
    )
    
    bullet_style = ParagraphStyle(
        "BulletStyle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.4,
        leading=9.0,
        leftIndent=10,
        firstLineIndent=-6,
        textColor=colors.HexColor("#1F2937")
    )
    
    # --- HEADER ---
    pinfo = resume_data.get("personal_info", {})
    story.append(Paragraph(pinfo.get("name", "TARUN S").upper(), name_style))
    story.append(Paragraph(resume_data.get("resume_title", ""), title_style))
    
    contact_bits = [pinfo.get("phone", ""), pinfo.get("email", ""), pinfo.get("location", "")]
    if pinfo.get("linkedin"):
        contact_bits.append(pinfo.get("linkedin"))
    if pinfo.get("github"):
        contact_bits.append(pinfo.get("github"))
    contact_line = " | ".join([c for c in contact_bits if c])
    story.append(Paragraph(contact_line, contact_style))
    story.append(Spacer(1, 1))
    
    def add_section_divider(title_text):
        story.append(Paragraph(title_text.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#111827"), spaceBefore=1, spaceAfter=2))
        
    # --- PROFESSIONAL SUMMARY ---
    add_section_divider("Professional Summary")
    story.append(Paragraph(resume_data.get("summary", ""), body_style))
    story.append(Spacer(1, 1))
    
    # --- TECHNICAL SKILLS ---
    add_section_divider("Technical Skills")
    skills_dict = resume_data.get("skills", {})
    skill_rows = [
        ("? Programming:", ", ".join(skills_dict.get("programming", []))),
        ("? AI & Machine Learning:", ", ".join(skills_dict.get("ai_ml", []))),
        ("? Data Science & Libraries:", ", ".join(skills_dict.get("data_science", []))),
        ("? ML Frameworks & AI Tools:", ", ".join(skills_dict.get("ml_frameworks_tools", []))),
        ("? Web & Backend:", ", ".join(skills_dict.get("web_backend", []))),
        ("? Tools & Concepts:", ", ".join(skills_dict.get("tools_concepts", [])))
    ]
    for label, val in skill_rows:
        if val:
            story.append(Paragraph(f"<b>{label}</b> {val}", body_style))
    story.append(Spacer(1, 1))
    
    # --- PROJECTS ---
    add_section_divider("AI/ML & Technical Projects")
    projects = resume_data.get("projects", [])[:3]
    for proj in projects:
        proj_name = proj.get("name", "")
        story.append(Paragraph(f"<b>{proj_name}</b>", body_style))
        for b in proj.get("bullets", []):
            story.append(Paragraph(f"? {b}", bullet_style))
        story.append(Spacer(1, 1))
        
    # --- EDUCATION ---
    add_section_divider("Education")
    for edu in resume_data.get("education", []):
        deg = edu.get("degree", "")
        yr = edu.get("year_info", "")
        inst = edu.get("institution", "")
        loc = edu.get("location", "")
        coursework = ", ".join(edu.get("coursework", []))
        story.append(Paragraph(f"<b>{deg}</b> ({yr})", body_style))
        story.append(Paragraph(f"{inst} | Location: {loc}", body_style))
        if coursework:
            story.append(Paragraph(f"<i>Relevant Coursework:</i> {coursework}", body_style))
    story.append(Spacer(1, 1))
    
    # --- EXPERIENCE & LEADERSHIP ---
    add_section_divider("Experience & Leadership")
    for exp in resume_data.get("experience", []):
        role_str = exp.get("role", "")
        comp_str = exp.get("company", "")
        loc_str = exp.get("location", "")
        story.append(Paragraph(f"<b>{role_str} ? {comp_str}</b> | {loc_str}", body_style))
        for b in exp.get("bullets", []):
            story.append(Paragraph(f"? {b}", bullet_style))
            
    doc.build(story)
    
    # Read binary bytes and base64 encode
    with open(pdf_path, "rb") as pf:
        pdf_bytes = pf.read()
    pdf_base64 = base64.b64encode(pdf_bytes).decode("utf-8")
    
    ats_extract = test_pdf_ats_extractability(str(pdf_path))
    ats_score, detected_kw, missing_kw = score_ats_compatibility(
        str(pdf_path),
        resume_data.get("priority_skills", [])
    )
    
    clean_name = pdf_filename.replace(".pdf", "")
    source_json_path = output_dir / f"{clean_name}_resume_source.json"
    with open(source_json_path, "w", encoding="utf-8") as f:
        json.dump(resume_data, f, indent=2)
        
    if job_description:
        jd_path = output_dir / f"{clean_name}_job_description.txt"
        with open(jd_path, "w", encoding="utf-8") as f:
            f.write(job_description)
            
    if match_analysis:
        match_path = output_dir / f"{clean_name}_match_analysis.json"
        with open(match_path, "w", encoding="utf-8") as f:
            json.dump(match_analysis, f, indent=2)
            
    app_meta_path = output_dir / f"{clean_name}_application_metadata.json"
    meta_content = {
        "file_name": pdf_filename,
        "file_path": str(pdf_path),
        "role_category": role_category,
        "company": company,
        "ats_score": ats_score,
        "page_count": ats_extract.get("page_count", 1),
        "is_single_page": ats_extract.get("is_single_page", True),
        "facts_verified": is_fact_safe,
        "unverified_claims": unverified
    }
    with open(app_meta_path, "w", encoding="utf-8") as f:
        json.dump(meta_content, f, indent=2)
        
    return {
        "pdf_path": str(pdf_path),
        "pdf_filename": pdf_filename,
        "pdf_base64": pdf_base64,
        "ats_score": ats_score,
        "is_single_page": ats_extract.get("is_single_page", True),
        "ats_validation_passed": ats_extract.get("is_valid", False),
        "facts_verified": is_fact_safe,
        "unverified_claims": unverified,
        "metadata_path": str(app_meta_path)
    }
