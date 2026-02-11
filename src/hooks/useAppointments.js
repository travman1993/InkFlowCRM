import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export function useAppointments() {
  const { state, dispatch, artistId } = useAppContext();
  const { appointments } = state;

  const addAppointment = async (appointment) => {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        artist_id: artistId,
        client_id: appointment.clientId || null,
        client_name: appointment.client,
        appointment_type: appointment.type,
        scheduled_date: appointment.date,
        scheduled_time: appointment.time,
        duration_minutes: appointment.duration,
        notes: appointment.notes || '',
        phone: appointment.phone || '',
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding appointment:', error);
      return null;
    }

    const mapped = {
      id: data.id,
      date: data.scheduled_date,
      client: data.client_name,
      clientId: data.client_id,
      type: data.appointment_type,
      time: data.scheduled_time,
      duration: data.duration_minutes,
      notes: data.notes,
      phone: data.phone,
      status: data.status,
    };

    dispatch({ type: 'ADD_APPOINTMENT', payload: mapped });
    return mapped;
  };

  const updateAppointment = async (id, updatedData) => {
    // Build the DB update object (camelCase → snake_case)
    const dbUpdate = {};
    if (updatedData.client !== undefined) dbUpdate.client_name = updatedData.client;
    if (updatedData.clientId !== undefined) dbUpdate.client_id = updatedData.clientId;
    if (updatedData.type !== undefined) dbUpdate.appointment_type = updatedData.type;
    if (updatedData.date !== undefined) dbUpdate.scheduled_date = updatedData.date;
    if (updatedData.time !== undefined) dbUpdate.scheduled_time = updatedData.time;
    if (updatedData.duration !== undefined) dbUpdate.duration_minutes = updatedData.duration;
    if (updatedData.notes !== undefined) dbUpdate.notes = updatedData.notes;
    if (updatedData.phone !== undefined) dbUpdate.phone = updatedData.phone;
    if (updatedData.status !== undefined) dbUpdate.status = updatedData.status;

    const { error } = await supabase
      .from('appointments')
      .update(dbUpdate)
      .eq('id', id);

    if (error) {
      console.error('Error updating appointment:', error);
      return;
    }

    dispatch({ type: 'UPDATE_APPOINTMENT', payload: { id, data: updatedData } });
  };

  const deleteAppointment = async (id) => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting appointment:', error);
      return;
    }

    dispatch({ type: 'DELETE_APPOINTMENT', payload: id });
  };

  const getAppointmentsByDate = (dateStr) => {
    return appointments.filter((apt) => apt.date === dateStr);
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
  };
}