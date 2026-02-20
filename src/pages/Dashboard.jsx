import { useState } from 'react';
import { Calendar, CheckSquare } from 'lucide-react';
import MonthView from '../components/calendar/MonthView';
import TasksTab from '../components/tasks/TasksTab';
import { useAppointments } from '../hooks/useAppointments';
import { useTattoos } from '../hooks/useTattoos';
import { useFollowUpTasks } from '../hooks/useFollowUpTasks';
import { useArtistSettings } from '../hooks/useArtistSettings';
import DashboardLayout from '../components/layout/DashboardLayout';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('calendar');

  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  } = useAppointments();

  const { completeTattoo } = useTattoos();
  const { getUrgentCount } = useFollowUpTasks();
  const { settings } = useArtistSettings();

  const urgentCount = getUrgentCount();

  const handleCompleteTattoo = async (tattooData) => {
    await completeTattoo(
      tattooData,
      tattooData.appointmentId,
      tattooData.clientId ? parseInt(tattooData.clientId) : null,
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {/* Tab bar */}
        <div className="bg-bg-secondary border-b border-border-primary px-4 md:px-6 pt-4 pb-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg font-semibold text-sm transition border-b-2 ${
                  activeTab === 'calendar'
                    ? 'bg-bg-tertiary border-accent-primary text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Calendar
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg font-semibold text-sm transition border-b-2 ${
                  activeTab === 'tasks'
                    ? 'bg-bg-tertiary border-accent-primary text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                Tasks
                {urgentCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 text-xs font-bold bg-accent-danger rounded-full text-white">
                    {urgentCount > 9 ? '9+' : urgentCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'calendar' && (
          <MonthView
            appointments={appointments}
            onAddAppointment={addAppointment}
            onUpdateAppointment={updateAppointment}
            onDeleteAppointment={deleteAppointment}
            onCompleteTattoo={handleCompleteTattoo}
          />
        )}
        {activeTab === 'tasks' && (
          <TasksTab
            artistName={settings.name}
            shopName={settings.studioName}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
