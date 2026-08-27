export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface EducationItem {
  degree: string;
  year_info: string;
  institution: string;
  location: string;
  coursework: string[];
}

export interface Skills {
  programming: string[];
  ai_ml: string[];
  data_science: string[];
  ml_frameworks_tools: string[];
  web_backend: string[];
  tools_concepts: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  tech_stack: string[];
  bullets: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
}

export interface MasterProfile {
  id: number;
  version: number;
  is_active: boolean;
  personal_info: PersonalInfo;
  professional_summary: string;
  education: EducationItem[];
  skills: Skills;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  created_at: string;
  updated_at: string;
}

export interface JobMatch {
  overall_score: number;
  classification: string;
  role_match_score: number;
  tech_skill_match_score: number;
  project_match_score: number;
  education_match_score: number;
  experience_match_score: number;
  location_match_score: number;
  ai_ml_relevance_score: number;
  internship_score: number;
  matched_skills: string[];
  missing_skills: string[];
  matched_projects: string[];
  match_reasoning?: string;
  recommended_role_category: string;
  recommended_resume_title: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  work_mode: string;
  job_url: string;
  posted_date?: string;
  salary?: string;
  employment_type: string;
  raw_description: string;
  normalized_description: string;
  application_method: string;
  target_role_category?: string;
  match?: JobMatch;
  application_status: string;
  created_at: string;
}

export interface ResumeRecord {
  id: number;
  job_id?: number;
  role_category: string;
  company_name: string;
  file_path: string;
  file_name: string;
  resume_title: string;
  summary: string;
  ats_score: number;
  ats_validation_passed: boolean;
  facts_verified: boolean;
  fabricated_claims_count: number;
  page_count: number;
  created_at: string;
}

export interface RoleTemplate {
  id: string;
  name: string;
  folder: string;
  title: string;
  summary: string;
  priority_skills: string[];
}

export interface ApplicationQuestion {
  question: string;
  suggested_answer: string;
  user_answer?: string;
  reasoning?: string;
  is_approved: boolean;
}

export interface Application {
  id: number;
  job_id: number;
  resume_id?: number;
  company: string;
  job_title: string;
  location: string;
  job_url: string;
  match_score: number;
  role_category?: string;
  resume_path?: string;
  status: string;
  application_method: string;
  prepared_fields: Record<string, any>;
  application_questions: ApplicationQuestion[];
  cover_letter?: string;
  date_discovered: string;
  date_prepared?: string;
  date_applied?: string;
  submission_notes?: string;
  error_message?: string;
}

export interface AutomationStatus {
  status: string; // IDLE, RUNNING, PAUSED_LOGIN_REQUIRED, PAUSED_CAPTCHA, STOPPED, ERROR
  current_action: string;
  jobs_processed: number;
  applications_prepared: number;
  applications_submitted: number;
  requires_user_action: boolean;
  user_message?: string;
  demo_mode: boolean;
}

export interface AnalyticsData {
  total_jobs_discovered: number;
  average_match_score: number;
  resumes_generated: number;
  applications_shortlisted: number;
  applications_ready: number;
  applications_submitted: number;
  applications_skipped: number;
  category_breakdown: Record<string, number>;
  conversion_rate: string;
}
