import MonthView from '../components/calendar/MonthView';
import { useAppointments } from '../hooks/useAppointments';
import { useTattoos } from '../hooks/useTattoos';
import DashboardLayout from '../components/layout/DashboardLayout';

function Dashboard() {
  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  } = useAppointments();

  const { completeTattoo } = useTattoos();

  const handleCompleteTattoo = async (tattooData) => {
    // completeTattoo writes to Supabase: tattoo insert, appointment status, client stats
    await completeTattoo(
      tattooData,
      tattooData.appointmentId,
      tattooData.clientId ? parseInt(tattooData.clientId) : null,
    );
  };

  return (
    <DashboardLayout>
      <MonthView
        appointments={appointments}
        onAddAppointment={addAppointment}
        onUpdateAppointment={updateAppointment}
        onDeleteAppointment={deleteAppointment}
        onCompleteTattoo={handleCompleteTattoo}
      />
    </DashboardLayout>
  );
}

export default Dashboard;