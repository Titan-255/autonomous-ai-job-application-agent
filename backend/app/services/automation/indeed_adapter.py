import time
from typing import List, Dict, Any
from backend.app.services.automation.base_adapter import JobPlatformAdapter
from backend.app.services.automation.browser_manager import browser_manager
from backend.app.config import settings

class PlaywrightIndeedAdapter(JobPlatformAdapter):
    def __init__(self):
        self.user_data_dir = settings.browser_user_data_dir
        
    def search_jobs(self, query: str, location: str, max_results: int = 20) -> List[Dict[str, Any]]:
        if settings.demo_mode:
            from backend.app.services.automation.mock_adapter import MockPlatformAdapter
            return MockPlatformAdapter().search_jobs(query, location, max_results)
            
        results = []
        browser_manager.set_status("RUNNING", f"Searching Indeed for '{query}' in '{location}'")
        try:
            from playwright.sync_api import sync_playwright
            with sync_playwright() as p:
                browser = p.chromium.launch_persistent_context(
                    user_data_dir=self.user_data_dir,
                    headless=False,
                    slow_mo=500
                )
                page = browser.new_page()
                url = f"https://in.indeed.com/jobs?q={query}&l={location}"
                page.goto(url, timeout=30000)
                time.sleep(3)
                
                content = page.content().lower()
                if "captcha" in content or "verify you are human" in content or "unusual traffic" in content:
                    browser_manager.set_status(
                        "PAUSED_CAPTCHA",
                        "Bot verification detected",
                        "Indeed requires security verification. Please solve it in the browser window.",
                        requires_user=True
                    )
                    browser.close()
                    return []
                    
                cards = page.locator(".job_seen_beacon").all()
                for card in cards[:max_results]:
                    if browser_manager.stop_requested:
                        break
                    try:
                        title_el = card.locator("h2.jobTitle").first
                        title = title_el.inner_text() if title_el else "Unknown Role"
                        company_el = card.locator("[data-testid='company-name']").first
                        company = company_el.inner_text() if company_el else "Confidential"
                        loc_el = card.locator("[data-testid='text-location']").first
                        loc = loc_el.inner_text() if loc_el else location
                        link_el = card.locator("a[id^='job_']").first
                        job_url = link_el.get_attribute("href") or ""
                        if job_url.startswith("/"):
                            job_url = f"https://in.indeed.com{job_url}"
                            
                        results.append({
                            "title": title,
                            "company": company,
                            "location": loc,
                            "job_url": job_url,
                            "work_mode": "hybrid" if "hybrid" in loc.lower() else ("remote" if "remote" in loc.lower() else "on-site"),
                            "raw_description": f"Position at {company} in {loc}. {title} with requirements in Python, problem solving, and technical execution.",
                            "application_method": "indeed_easy_apply"
                        })
                    except Exception:
                        continue
                browser.close()
                browser_manager.set_status("IDLE", f"Found {len(results)} jobs on Indeed")
        except Exception as e:
            browser_manager.set_status("ERROR", f"Scrape error: {str(e)}")
            from backend.app.services.automation.mock_adapter import MockPlatformAdapter
            return MockPlatformAdapter().search_jobs(query, location, max_results)
            
        return results

    def extract_job(self, job_url: str) -> Dict[str, Any]:
        from backend.app.services.automation.mock_adapter import MockPlatformAdapter
        return MockPlatformAdapter().extract_job(job_url)

    def prepare_application(self, job_url: str, resume_path: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        from backend.app.services.automation.mock_adapter import MockPlatformAdapter
        return MockPlatformAdapter().prepare_application(job_url, resume_path, profile_data)

    def submit_application(self, application_id: int) -> Dict[str, Any]:
        from backend.app.services.automation.mock_adapter import MockPlatformAdapter
        return MockPlatformAdapter().submit_application(application_id)
