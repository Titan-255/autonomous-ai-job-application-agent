import hashlib
import re

def normalize_string(text: str) -> str:
    if not text:
        return ""
    clean = re.sub(r"[^a-zA-Z0-9\s]", "", text.lower())
    return " ".join(clean.split())

def generate_job_fingerprint(company: str, title: str, location: str, job_url_or_id: str) -> str:
    norm_company = normalize_string(company)
    norm_title = normalize_string(title)
    norm_location = normalize_string(location)
    raw_key = f"{norm_company}::{norm_title}::{norm_location}::{job_url_or_id}"
    return hashlib.sha256(raw_key.encode("utf-8")).hexdigest()
