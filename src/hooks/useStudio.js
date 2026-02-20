import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { generateEmailContent } from './useFollowUpTasks';

const STUDIO_FOLLOW_UP_SCHEDULE = [
  { type: 'day1',       daysAfter: 1,  label: 'Day 1 Aftercare Email' },
  { type: 'day3',       daysAfter: 3,  label: '3-Day Healing Check-In' },
  { type: 'week1',      daysAfter: 10, label: '1-Week Follow-Up' },
  { type: 'biweekly_1', daysAfter: 24, label: '3-Week Touchpoint' },
  { type: 'biweekly_2', daysAfter: 38, label: '5-Week Touchpoint' },
];

function addDaysStudio(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// ── Row mappers (snake_case DB → camelCase frontend) ──────────────────────────

function mapArtist(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone || '',
    email: row.email || '',
    payModel: row.pay_model,
    boothRentAmount: parseFloat(row.booth_rent_amount) || 0,
    commissionRate: parseFloat(row.commission_rate) || 0.60,
    specialty: row.specialty || '',
    notes: row.notes || '',
    active: row.active,
    createdAt: row.created_at,
  };
}

function mapAppointment(row) {
  return {
    id: row.id,
    studioArtistId: row.studio_artist_id || null,
    clientName: row.client_name,
    clientPhone: row.client_phone || '',
    type: row.appointment_type,
    date: row.scheduled_date,
    time: row.scheduled_time || '',
    duration: row.duration_minutes || 120,
    notes: row.notes || '',
    status: row.status,
  };
}

function mapTattoo(row) {
  return {
    id: row.id,
    studioArtistId: row.studio_artist_id,
    clientName: row.client_name,
    price: parseFloat(row.price) || 0,
    suppliesCost: parseFloat(row.supplies_cost) || 0,
    artistEarnings: parseFloat(row.artist_earnings) || 0,
    bodyLocation: row.body_location || '',
    notes: row.notes || '',
    date: row.date_completed,
    paid: row.paid,
    appointmentId: row.appointment_id || null,
  };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useStudio() {
  const { artist } = useAuth();
  const { dispatch: appDispatch } = useAppContext();
  const [state, setState] = useState({
    loading: true,
    error: null,
    artists: [],
    appointments: [],
    tattoos: [],
  });

  useEffect(() => {
    if (!artist?.id) return;
    loadAll(artist.id);
  }, [artist?.id]);

  const loadAll = async (ownerId) => {
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const [
        { data: artistRows, error: artistErr },
        { data: apptRows, error: apptErr },
        { data: tattooRows, error: tattooErr },
      ] = await Promise.all([
        supabase.from('studio_artists').select('*').eq('owner_id', ownerId).order('name'),
        supabase.from('studio_appointments').select('*').eq('owner_id', ownerId).order('scheduled_date', { ascending: true }),
        supabase.from('studio_tattoos').select('*').eq('owner_id', ownerId).order('date_completed', { ascending: false }),
      ]);

      if (artistErr || apptErr || tattooErr) {
        setState(s => ({ ...s, loading: false, error: 'Failed to load studio data. Please refresh.' }));
        return;
      }

      setState({
        loading: false,
        error: null,
        artists: (artistRows || []).map(mapArtist),
        appointments: (apptRows || []).map(mapAppointment),
        tattoos: (tattooRows || []).map(mapTattoo),
      });
    } catch {
      setState(s => ({ ...s, loading: false, error: 'Failed to load studio data. Please refresh.' }));
    }
  };

  // ── Artist mutations ─────────────────────────────────────────────────────────

  const addArtist = async (formData) => {
    const { data, error } = await supabase
      .from('studio_artists')
      .insert({
        owner_id: artist.id,
        name: formData.name,
        phone: formData.phone || '',
        email: formData.email || '',
        pay_model: formData.payModel || 'booth_rent',
        booth_rent_amount: parseFloat(formData.boothRentAmount) || 0,
        commission_rate: parseFloat(formData.commissionRate) || 0.60,
        specialty: formData.specialty || '',
        notes: formData.notes || '',
      })
      .select()
      .single();

    if (error) return null;

    const mapped = mapArtist(data);
    setState(s => ({ ...s, artists: [...s.artists, mapped].sort((a, b) => a.name.localeCompare(b.name)) }));
    return mapped;
  };

  const updateArtist = async (id, formData) => {
    const { error } = await supabase
      .from('studio_artists')
      .update({
        name: formData.name,
        phone: formData.phone || '',
        email: formData.email || '',
        pay_model: formData.payModel || 'booth_rent',
        booth_rent_amount: parseFloat(formData.boothRentAmount) || 0,
        commission_rate: parseFloat(formData.commissionRate) || 0.60,
        specialty: formData.specialty || '',
        notes: formData.notes || '',
      })
      .eq('id', id);

    if (error) return;

    setState(s => ({
      ...s,
      artists: s.artists.map(a => a.id === id ? { ...a, ...formData } : a),
    }));
  };

  const deactivateArtist = async (id) => {
    const { error } = await supabase
      .from('studio_artists')
      .update({ active: false })
      .eq('id', id);

    if (error) return;

    setState(s => ({
      ...s,
      artists: s.artists.map(a => a.id === id ? { ...a, active: false } : a),
    }));
  };

  const reactivateArtist = async (id) => {
    const { error } = await supabase
      .from('studio_artists')
      .update({ active: true })
      .eq('id', id);

    if (error) return;

    setState(s => ({
      ...s,
      artists: s.artists.map(a => a.id === id ? { ...a, active: true } : a),
    }));
  };

  // ── Appointment mutations ─────────────────────────────────────────────────────

  const addAppointment = async (formData) => {
    const { data, error } = await supabase
      .from('studio_appointments')
      .insert({
        owner_id: artist.id,
        studio_artist_id: formData.studioArtistId || null,
        client_name: formData.clientName,
        client_phone: formData.clientPhone || '',
        appointment_type: formData.type || 'tattoo',
        scheduled_date: formData.date,
        scheduled_time: formData.time || '',
        duration_minutes: formData.duration || 120,
        notes: formData.notes || '',
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) return null;

    const mapped = mapAppointment(data);
    setState(s => ({ ...s, appointments: [...s.appointments, mapped] }));
    return mapped;
  };

  const updateAppointment = async (id, formData) => {
    const dbUpdate = {};
    if (formData.studioArtistId !== undefined) dbUpdate.studio_artist_id = formData.studioArtistId || null;
    if (formData.clientName !== undefined) dbUpdate.client_name = formData.clientName;
    if (formData.clientPhone !== undefined) dbUpdate.client_phone = formData.clientPhone;
    if (formData.type !== undefined) dbUpdate.appointment_type = formData.type;
    if (formData.date !== undefined) dbUpdate.scheduled_date = formData.date;
    if (formData.time !== undefined) dbUpdate.scheduled_time = formData.time;
    if (formData.duration !== undefined) dbUpdate.duration_minutes = formData.duration;
    if (formData.notes !== undefined) dbUpdate.notes = formData.notes;
    if (formData.status !== undefined) dbUpdate.status = formData.status;

    const { error } = await supabase.from('studio_appointments').update(dbUpdate).eq('id', id);
    if (error) return;

    setState(s => ({
      ...s,
      appointments: s.appointments.map(a => a.id === id ? { ...a, ...formData } : a),
    }));
  };

  const deleteAppointment = async (id) => {
    const { error } = await supabase.from('studio_appointments').delete().eq('id', id);
    if (error) return;

    setState(s => ({ ...s, appointments: s.appointments.filter(a => a.id !== id) }));
  };

  // ── Tattoo / revenue mutations ────────────────────────────────────────────────

  const addTattooRecord = async (formData) => {
    const { data, error } = await supabase
      .from('studio_tattoos')
      .insert({
        owner_id: artist.id,
        studio_artist_id: formData.studioArtistId,
        client_name: formData.clientName,
        price: parseFloat(formData.price) || 0,
        supplies_cost: parseFloat(formData.suppliesCost) || 0,
        artist_earnings: parseFloat(formData.artistEarnings) || 0,
        body_location: formData.bodyLocation || '',
        notes: formData.notes || '',
        date_completed: formData.date,
        paid: formData.paid !== false,
        appointment_id: formData.appointmentId || null,
      })
      .select()
      .single();

    if (error) return null;

    const mapped = mapTattoo(data);
    setState(s => ({ ...s, tattoos: [mapped, ...s.tattoos] }));

    // Auto-generate follow-up tasks — wrapped in try/catch so it never blocks tattoo recording
    try {
      const studioArtist = state.artists.find(a => a.id === formData.studioArtistId);
      const artistName = studioArtist?.name || artist.studio_name || '';
      const shopName = artist.studio_name || '';
      const completionDate = mapped.date || new Date().toISOString().split('T')[0];

      const taskRows = STUDIO_FOLLOW_UP_SCHEDULE.map(({ type, daysAfter, label }) => {
        const { subject, body } = generateEmailContent(type, mapped.clientName, artistName, shopName);
        return {
          artist_id: artist.id,
          client_name: mapped.clientName,
          client_email: formData.clientEmail || '',
          tattoo_id: mapped.id,
          task_type: type,
          task_label: label,
          due_date: addDaysStudio(completionDate, daysAfter),
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
        appDispatch({ type: 'ADD_FOLLOW_UP_TASKS', payload: mappedTasks });
      }
    } catch (err) {
      console.warn('Follow-up task creation skipped:', err?.message);
    }

    return mapped;
  };

  const deleteTattooRecord = async (id) => {
    const { error } = await supabase.from('studio_tattoos').delete().eq('id', id);
    if (error) return;

    setState(s => ({ ...s, tattoos: s.tattoos.filter(t => t.id !== id) }));
  };

  // ── Computed helpers ──────────────────────────────────────────────────────────

  const getArtistById = (id) => state.artists.find(a => a.id === id);

  const getStatsForArtist = (artistId, { startStr, endStr } = {}) => {
    const filtered = state.tattoos.filter(t => {
      if (t.studioArtistId !== artistId) return false;
      if (startStr && t.date < startStr) return false;
      if (endStr && t.date > endStr) return false;
      return true;
    });
    return {
      revenue: filtered.reduce((s, t) => s + t.price, 0),
      earnings: filtered.reduce((s, t) => s + t.artistEarnings, 0),
      tattooCount: filtered.length,
      avgPerTattoo: filtered.length > 0
        ? filtered.reduce((s, t) => s + t.price, 0) / filtered.length
        : 0,
    };
  };

  const getWeeklyAppointmentCount = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startStr = startOfWeek.toISOString().split('T')[0];
    const endStr = endOfWeek.toISOString().split('T')[0];

    return state.appointments.filter(a => a.date >= startStr && a.date <= endStr).length;
  };

  const getStudioTotalRevenue = ({ startStr, endStr } = {}) => {
    return state.tattoos
      .filter(t => {
        if (startStr && t.date < startStr) return false;
        if (endStr && t.date > endStr) return false;
        return true;
      })
      .reduce((s, t) => s + t.price, 0);
  };

  return {
    ...state,
    addArtist,
    updateArtist,
    deactivateArtist,
    reactivateArtist,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addTattooRecord,
    deleteTattooRecord,
    getArtistById,
    getStatsForArtist,
    getWeeklyAppointmentCount,
    getStudioTotalRevenue,
  };
}
