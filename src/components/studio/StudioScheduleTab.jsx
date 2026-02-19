import StudioMonthView from './StudioMonthView';

function StudioScheduleTab({ studio }) {
  const handleCompleteAppointment = async (appointmentId, tattooData) => {
    await studio.addTattooRecord(tattooData);
    await studio.updateAppointment(appointmentId, { status: 'completed' });
  };

  return (
    <StudioMonthView
      appointments={studio.appointments}
      artists={studio.artists}
      onAddAppointment={studio.addAppointment}
      onUpdateAppointment={studio.updateAppointment}
      onDeleteAppointment={studio.deleteAppointment}
      onCompleteAppointment={handleCompleteAppointment}
    />
  );
}

export default StudioScheduleTab;
