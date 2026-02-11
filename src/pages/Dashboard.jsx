import MonthView from '../components/calendar/MonthView';
import { useAppointments } from '../hooks/useAppointments';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../components/layout/DashboardLayout';

function Dashboard() {
  const { dispatch } = useAppContext();
  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  } = useAppointments();

  const handleCompleteTattoo = (tattooData) => {
    // Single dispatch updates tattoos + client stats + appointment status
    dispatch({
      type: 'COMPLETE_TATTOO',
      payload: {
        tattooData,
        appointmentId: tattooData.appointmentId,
        clientId: tattooData.clientId ? parseInt(tattooData.clientId) : null,
      },
    });
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