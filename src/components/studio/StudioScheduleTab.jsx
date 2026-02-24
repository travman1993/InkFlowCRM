import StudioMonthView from './StudioMonthView';

function StudioScheduleTab({ studio }) {
  const handleCompleteAppointment = async (appointmentId, tattooData) => {
    const result = await studio.addTattooRecord(tattooData);
    if (result) {
      await studio.updateAppointment(appointmentId, { status: 'completed' });
    }
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
