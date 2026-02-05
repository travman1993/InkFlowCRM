import MonthView from '../components/calendar/MonthView';
import { useAppointments } from '../hooks/useAppointments';
import { useTattoos } from '../hooks/useTattoos';
import { useClients } from '../hooks/useClients';
import DashboardLayout from '../components/layout/DashboardLayout';

function Dashboard() {
  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  } = useAppointments();

  const { addTattoo } = useTattoos();
  const { updateClient, getClientById } = useClients();

  const handleCompleteTattoo = (tattooData) => {
    // Add tattoo to database
    const newTattoo = addTattoo(tattooData);
    
    // Update client stats
    const client = getClientById(tattooData.clientId);
    if (client) {
      updateClient(client.id, {
        totalSpent: client.totalSpent + tattooData.price,
        totalTattoos: client.totalTattoos + 1,
        lastVisit: tattooData.date
      });
    }
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