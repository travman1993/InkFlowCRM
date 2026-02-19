import StudioMonthView from './StudioMonthView';

function StudioScheduleTab({ studio }) {
  return (
    <StudioMonthView
      appointments={studio.appointments}
      artists={studio.artists}
      onAddAppointment={studio.addAppointment}
      onUpdateAppointment={studio.updateAppointment}
      onDeleteAppointment={studio.deleteAppointment}
    />
  );
}

export default StudioScheduleTab;
