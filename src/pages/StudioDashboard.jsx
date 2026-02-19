import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useStudio } from '../hooks/useStudio';
import StudioOverviewTab from '../components/studio/StudioOverviewTab';
import StudioArtistsTab from '../components/studio/StudioArtistsTab';
import StudioScheduleTab from '../components/studio/StudioScheduleTab';
import StudioAnalyticsTab from '../components/studio/StudioAnalyticsTab';
import { LayoutDashboard, Users, Calendar, BarChart3 } from 'lucide-react';

const TABS = [
  { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
  { id: 'artists',   label: 'Artists',   icon: Users },
  { id: 'schedule',  label: 'Schedule',  icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

function StudioDashboard() {
  const studio = useStudio();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {/* Page Header + Tab Bar */}
        <div className="bg-bg-secondary border-b border-border-primary p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Studio Dashboard</h1>
            <div className="flex gap-1 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-accent-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading / Error / Content */}
        {studio.loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : studio.error ? (
          <div className="flex items-center justify-center min-h-[60vh] p-6">
            <div className="bg-bg-secondary border border-accent-danger/30 rounded-xl p-8 max-w-md w-full text-center">
              <p className="text-accent-danger font-semibold mb-4">{studio.error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Refresh Page
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'overview'   && <StudioOverviewTab  studio={studio} />}
            {activeTab === 'artists'    && <StudioArtistsTab   studio={studio} onSwitchToArtists={() => setActiveTab('artists')} />}
            {activeTab === 'schedule'   && <StudioScheduleTab  studio={studio} />}
            {activeTab === 'analytics'  && <StudioAnalyticsTab studio={studio} />}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudioDashboard;
