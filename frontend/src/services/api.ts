import axios from 'axios';
import {
  MasterProfile,
  Job,
  ResumeRecord,
  RoleTemplate,
  Application,
  AutomationStatus,
  AnalyticsData
} from '../types';

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  // Profile
  getProfile: async (): Promise<MasterProfile> => {
    const res = await client.get('/profile');
    return res.data;
  },
  updateProfile: async (payload: any): Promise<MasterProfile> => {
    const res = await client.put('/profile', payload);
    return res.data;
  },
  getProfileVersions: async () => {
    const res = await client.get('/profile/versions');
    return res.data;
  },

  // Jobs
  getJobs: async (params?: { category?: string; min_score?: number; status?: string }): Promise<Job[]> => {
    const res = await client.get('/jobs', { params });
    return res.data;
  },
  getJobDetail: async (id: number) => {
    const res = await client.get(`/jobs/${id}`);
    return res.data;
  },
  searchJobs: async (payload: { role_title?: string; location?: string; experience_level?: string; max_results?: number }) => {
    const res = await client.post('/jobs/search', payload);
    return res.data;
  },

  // Resumes
  getResumes: async (): Promise<ResumeRecord[]> => {
    const res = await client.get('/resumes');
    return res.data;
  },
  getRoleTemplates: async (): Promise<RoleTemplate[]> => {
    const res = await client.get('/resumes/templates');
    return res.data;
  },
  generateResume: async (payload: { job_id?: number; role_category?: string; company_name?: string }): Promise<ResumeRecord> => {
    const res = await client.post('/resumes/generate', payload);
    return res.data;
  },

  // Applications
  getApplications: async (status?: string): Promise<Application[]> => {
    const res = await client.get('/applications', { params: { status } });
    return res.data;
  },
  getApplicationDetail: async (id: number): Promise<Application> => {
    const res = await client.get(`/applications/${id}`);
    return res.data;
  },
  prepareApplication: async (payload: { job_id: number; role_category?: string }): Promise<Application> => {
    const res = await client.post('/applications/prepare', payload);
    return res.data;
  },
  submitApplication: async (payload: { application_id: number; confirmed: boolean; notes?: string }) => {
    const res = await client.post('/applications/submit', payload);
    return res.data;
  },
  batchSubmitApplications: async (payload: { application_ids: number[]; confirmed: boolean }) => {
    const res = await client.post('/applications/batch-submit', payload);
    return res.data;
  },
  skipApplication: async (id: number): Promise<Application> => {
    const res = await client.post(`/applications/${id}/skip`);
    return res.data;
  },

  // Automation
  getAutomationStatus: async (): Promise<AutomationStatus> => {
    const res = await client.get('/automation/status');
    return res.data;
  },
  triggerAutomationAction: async (action: string, payload?: any) => {
    const res = await client.post('/automation/action', { action, payload });
    return res.data;
  },

  // Analytics
  getAnalytics: async (): Promise<AnalyticsData> => {
    const res = await client.get('/analytics');
    return res.data;
  }
};
