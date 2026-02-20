import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import { generateEmailContent } from './useFollowUpTasks';

const FOLLOW_UP_SCHEDULE = [
  { type: 'day1',       daysAfter: 1,  label: 'Day 1 Aftercare Email' },
  { type: 'day3',       daysAfter: 3,  label: '3-Day Healing Check-In' },
  { type: 'week1',      daysAfter: 10, label: '1-Week Follow-Up' },
  { type: 'biweekly_1', daysAfter: 24, label: '3-Week Touchpoint' },
  { type: 'biweekly_2', daysAfter: 38, label: '5-Week Touchpoint' },
];

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function useTattoos() {
  const { state, dispatch, artistId } = useAppContext();
  const { tattoos } = state;

  const addTattoo = async (tattoo) => {
    const { data, error } = await supabase
      .from('tattoos')
      .insert({
        artist_id: artistId,
        client_id: tattoo.clientId || null,
        client_name: tattoo.clientName,
        appointment_id: tattoo.appointmentId || null,
        price: tattoo.price,
        supplies_cost: tattoo.suppliesCost,
        artist_earnings: tattoo.artistEarnings,
        body_location: tattoo.location || '',
        notes: tattoo.notes || '',
        images: tattoo.images || [],
        paid: tattoo.paid !== undefined ? tattoo.paid : true,
        date_completed: tattoo.date,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding tattoo:', error);
      return null;
    }

    const mapped = {
      id: data.id,
      clientId: data.client_id,
      clientName: data.client_name,
      appointmentId: data.appointment_id,
      date: data.date_completed,
      price: parseFloat(data.price),
      suppliesCost: parseFloat(data.supplies_cost),
      artistEarnings: parseFloat(data.artist_earnings),
      location: data.body_location,
      notes: data.notes,
      images: data.images,
      paid: data.paid,
      completedAt: data.completed_at,
    };

    dispatch({ type: 'ADD_TATTOO', payload: mapped });
    return mapped;
  };

  const completeTattoo = async (tattooData, appointmentId, clientId) => {
    // 1. Insert the tattoo
    const { data: newTattoo, error: tattooError } = await supabase
      .from('tattoos')
      .insert({
        artist_id: artistId,
        client_id: clientId || null,
        client_name: tattooData.clientName,
        appointment_id: appointmentId || null,
        price: tattooData.price,
        supplies_cost: tattooData.suppliesCost,
        artist_earnings: tattooData.artistEarnings,
        body_location: tattooData.location || '',
        notes: tattooData.notes || '',
        images: tattooData.images || [],
        paid: true,
        date_completed: tattooData.date,
      })
      .select()
      .single();

    if (tattooError) {
      console.error('Error completing tattoo:', tattooError);
      return null;
    }

    // 2. Mark appointment completed (if from an appointment)
    if (appointmentId) {
      await supabase
        .from('appointments')
        .update({ status: 'completed' })
        .eq('id', appointmentId);
    }

    // 3. Update client stats
    if (clientId) {
      // Get current client stats from DB for accuracy
      const { data: client } = await supabase
        .from('clients')
        .select('total_spent, total_tattoos')
        .eq('id', clientId)
        .single();

      if (client) {
        await supabase
          .from('clients')
          .update({
            total_spent: parseFloat(client.total_spent || 0) + tattooData.price,
            total_tattoos: (client.total_tattoos || 0) + 1,
            last_visit: tattooData.date,
          })
          .eq('id', clientId);
      }
    }

    // 4. Update local state
    const mapped = {
      id: newTattoo.id,
      clientId: newTattoo.client_id,
      clientName: newTattoo.client_name,
      appointmentId: newTattoo.appointment_id,
      date: newTattoo.date_completed,
      price: parseFloat(newTattoo.price),
      suppliesCost: parseFloat(newTattoo.supplies_cost),
      artistEarnings: parseFloat(newTattoo.artist_earnings),
      location: newTattoo.body_location,
      notes: newTattoo.notes,
      images: newTattoo.images,
      paid: newTattoo.paid,
      completedAt: newTattoo.completed_at,
    };

    dispatch({
      type: 'COMPLETE_TATTOO',
      payload: {
        tattooData: mapped,
        appointmentId,
        clientId,
      },
    });

    // 5. Generate follow-up tasks — wrapped in try/catch so it never blocks tattoo completion
    try {
      const { settings, clients } = state;
      const clientRecord = clients.find(c => c.id === clientId || c.id === parseInt(clientId));
      const clientEmail = clientRecord?.email || '';
      const artistName = settings.name || '';
      const shopName = settings.studioName || '';
      const completionDate = mapped.date || new Date().toISOString().split('T')[0];

      const taskRows = FOLLOW_UP_SCHEDULE.map(({ type, daysAfter, label }) => {
        const { subject, body } = generateEmailContent(type, mapped.clientName, artistName, shopName);
        return {
          artist_id: artistId,
          client_name: mapped.clientName,
          client_email: clientEmail,
          tattoo_id: mapped.id,
          task_type: type,
          task_label: label,
          due_date: addDays(completionDate, daysAfter),
          status: 'pending',
          email_subject: subject,
          email_body: body,
        };
      });

      const { data: taskData } = await supabase
        .from('follow_up_tasks')
        .insert(taskRows)
        .select();

      if (taskData) {
        const mappedTasks = taskData.map(row => ({
          id: row.id,
          artistId: row.artist_id,
          clientName: row.client_name,
          clientEmail: row.client_email || '',
          tattooId: row.tattoo_id,
          taskType: row.task_type,
          taskLabel: row.task_label,
          dueDate: row.due_date,
          status: row.status,
          emailSubject: row.email_subject || '',
          emailBody: row.email_body || '',
          completedAt: row.completed_at || null,
          createdAt: row.created_at,
        }));
        dispatch({ type: 'ADD_FOLLOW_UP_TASKS', payload: mappedTasks });
      }
    } catch (err) {
      // Task creation failed (table may not exist yet) — tattoo is still completed
      console.warn('Follow-up task creation skipped:', err?.message);
    }

    return mapped;
  };

  const getTattoosByClient = (clientId) => {
    return tattoos.filter((tattoo) => tattoo.clientId === clientId || tattoo.clientId === parseInt(clientId));
  };

  const getTattooById = (id) => {
    return tattoos.find((tattoo) => tattoo.id === id || tattoo.id === parseInt(id));
  };

  const updateTattoo = async (id, updatedData) => {
    const dbUpdate = {};
    if (updatedData.price !== undefined) dbUpdate.price = updatedData.price;
    if (updatedData.suppliesCost !== undefined) dbUpdate.supplies_cost = updatedData.suppliesCost;
    if (updatedData.artistEarnings !== undefined) dbUpdate.artist_earnings = updatedData.artistEarnings;
    if (updatedData.location !== undefined) dbUpdate.body_location = updatedData.location;
    if (updatedData.notes !== undefined) dbUpdate.notes = updatedData.notes;
    if (updatedData.images !== undefined) dbUpdate.images = updatedData.images;
    if (updatedData.paid !== undefined) dbUpdate.paid = updatedData.paid;

    const { error } = await supabase
      .from('tattoos')
      .update(dbUpdate)
      .eq('id', id);

    if (error) {
      console.error('Error updating tattoo:', error);
      return;
    }

    dispatch({ type: 'UPDATE_TATTOO', payload: { id, data: updatedData } });
  };

  const deleteTattoo = async (id) => {
    const { error } = await supabase
      .from('tattoos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting tattoo:', error);
      return;
    }

    dispatch({ type: 'DELETE_TATTOO', payload: id });
  };

  const getAllTattoos = () => tattoos;

  const getTotalRevenue = () => {
    return tattoos.reduce((sum, tattoo) => sum + tattoo.price, 0);
  };

  const getTotalEarnings = () => {
    return tattoos.reduce((sum, tattoo) => sum + tattoo.artistEarnings, 0);
  };

  const getTotalSuppliesCost = () => {
    return tattoos.reduce((sum, tattoo) => sum + tattoo.suppliesCost, 0);
  };

  return {
    tattoos,
    addTattoo,
    completeTattoo,
    getTattoosByClient,
    getTattooById,
    updateTattoo,
    deleteTattoo,
    getAllTattoos,
    getTotalRevenue,
    getTotalEarnings,
    getTotalSuppliesCost,
  };
}