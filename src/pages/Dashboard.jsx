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
    // Use the hook's completeTattoo which writes to Supabase
    await completeTattoo(
      tattooData,
      tattooData.appointmentId || null,
      tattooData.clientId || null
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