import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AutomationBanner } from './components/AutomationBanner';
import { PDFViewerModal } from './components/PDFViewerModal';
import { ApplicationModal } from './components/ApplicationModal';
import { Dashboard } from './pages/Dashboard';
import { JobDiscovery } from './pages/JobDiscovery';
import { Shortlisted } from './pages/Shortlisted';
import { ResumeManager } from './pages/ResumeManager';
import { Applications } from './pages/Applications';
import { ProfileEditor } from './pages/ProfileEditor';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Job, ResumeRecord, Application, AutomationStatus } from './types';
import { api } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [automationStatus, setAutomationStatus] = useState<AutomationStatus | null>(null);

  // Modals state
  const [selectedResume, setSelectedResume] = useState<ResumeRecord | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const fetchStatus = async () => {
    try {
      const s = await api.getAutomationStatus();
      setAutomationStatus(s);
    } catch (err) {
      console.error('Failed to fetch status:', err);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStopAutomation = async () => {
    try {
      await api.triggerAutomationAction('STOP');
      fetchStatus();
    } catch (err) {
      console.error('Stop action failed:', err);
    }
  };

  const handleResumeAutomation = async () => {
    try {
      await api.triggerAutomationAction('RESUME');
      fetchStatus();
    } catch (err) {
      console.error('Resume action failed:', err);
    }
  };

  const handleToggleDemo = async () => {
    try {
      await api.triggerAutomationAction('TOGGLE_DEMO');
      fetchStatus();
    } catch (err) {
      console.error('Toggle demo failed:', err);
    }
  };

  // Job Actions
  const handleViewJob = async (job: Job) => {
    try {
      const detail = await api.getJobDetail(job.id);
      if (detail.resume) {
        setSelectedResume(detail.resume);
      } else {
        // Switch to detail or prepare
        handlePrepareJob(job);
      }
    } catch (err) {
      console.error('View job failed:', err);
    }
  };

  const handlePrepareJob = async (job: Job) => {
    try {
      const app = await api.prepareApplication({ job_id: job.id, role_category: job.target_role_category });
      setSelectedJob(job);
      setSelectedApplication(app);
    } catch (err) {
      console.error('Prepare job failed:', err);
    }
  };

  const handleGenerateResume = async (job: Job) => {
    try {
      const res = await api.generateResume({
        job_id: job.id,
        role_category: job.target_role_category,
        company_name: job.company
      });
      setSelectedResume(res);
    } catch (err) {
      console.error('Generate resume failed:', err);
    }
  };

  const handleApplyNow = (job: Job) => {
    handlePrepareJob(job);
  };

  const handleOpenApplication = async (app: Application) => {
    try {
      const jobDetail = await api.getJobDetail(app.job_id);
      setSelectedJob(jobDetail.job);
      setSelectedApplication(app);
    } catch (err) {
      console.error('Open application failed:', err);
    }
  };

  const handleSubmitApplication = async (appId: number, notes?: string) => {
    try {
      await api.submitApplication({ application_id: appId, confirmed: true, notes });
      setSelectedApplication(null);
      setSelectedJob(null);
      fetchStatus();
    } catch (err) {
      console.error('Submit application failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        automationStatus={automationStatus}
        onStopAutomation={handleStopAutomation}
        onToggleDemo={handleToggleDemo}
      />

      <AutomationBanner
        status={automationStatus}
        onResume={handleResumeAutomation}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            onNavigate={setActiveTab}
            onViewJob={handleViewJob}
            onPrepareJob={handlePrepareJob}
            onGenerateResume={handleGenerateResume}
            onApplyNow={handleApplyNow}
          />
        )}
        {activeTab === 'discovery' && (
          <JobDiscovery
            onViewJob={handleViewJob}
            onPrepareJob={handlePrepareJob}
            onGenerateResume={handleGenerateResume}
            onApplyNow={handleApplyNow}
          />
        )}
        {activeTab === 'shortlisted' && (
          <Shortlisted
            onViewJob={handleViewJob}
            onPrepareJob={handlePrepareJob}
            onGenerateResume={handleGenerateResume}
            onApplyNow={handleApplyNow}
          />
        )}
        {activeTab === 'resumes' && <ResumeManager />}
        {activeTab === 'applications' && (
          <Applications
            onOpenApplication={handleOpenApplication}
            onViewJobDetail={(jobId) => console.log('Job detail:', jobId)}
          />
        )}
        {activeTab === 'profile' && <ProfileEditor />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'settings' && (
          <Settings
            automationStatus={automationStatus}
            onRefreshStatus={fetchStatus}
          />
        )}
      </main>

      {/* PDF Modal */}
      {selectedResume && (
        <PDFViewerModal
          resume={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}

      {/* Application Preparation & Approval Modal */}
      {selectedApplication && selectedJob && (
        <ApplicationModal
          application={selectedApplication}
          job={selectedJob}
          onClose={() => {
            setSelectedApplication(null);
            setSelectedJob(null);
          }}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
};
export default App;
