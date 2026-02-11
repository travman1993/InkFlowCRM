import { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

// ============================================================
// INITIAL STATE (empty — filled from Supabase on login)
// ============================================================

const initialState = {
  settings: {
    paymentModel: 'booth_rent',
    boothRentAmount: 0,
    commissionRate: 0.60,
    name: '',
    studioName: '',
    phone: '',
    email: '',
  },
  appointments: [],
  clients: [],
  tattoos: [],
  expenses: [],
  recurringTemplates: [],
  loaded: false,
};

// ============================================================
// REDUCER (same logic as before — manages local state)
// ============================================================

function appReducer(state, action) {
  switch (action.type) {
    // ---------- HYDRATE FROM DB ----------
    case 'LOAD_ALL_DATA':
      return { ...state, ...action.payload, loaded: true };

    // ---------- SETTINGS ----------
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    // ---------- APPOINTMENTS ----------
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };

    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map((apt) =>
          apt.id === action.payload.id
            ? { ...apt, ...action.payload.data }
            : apt
        ),
      };

    case 'DELETE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter(
          (apt) => apt.id !== action.payload
        ),
      };

    // ---------- CLIENTS ----------
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case 'BULK_IMPORT_CLIENTS':
      return {
        ...state,
        clients: [...state.clients, ...action.payload],
      };

    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id === action.payload.id
            ? { ...client, ...action.payload.data }
            : client
        ),
      };

    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client.id !== action.payload
        ),
      };

    // ---------- TATTOOS ----------
    case 'ADD_TATTOO':
      return {
        ...state,
        tattoos: [...state.tattoos, action.payload],
      };

    case 'UPDATE_TATTOO':
      return {
        ...state,
        tattoos: state.tattoos.map((tattoo) =>
          tattoo.id === action.payload.id
            ? { ...tattoo, ...action.payload.data }
            : tattoo
        ),
      };

    case 'DELETE_TATTOO':
      return {
        ...state,
        tattoos: state.tattoos.filter(
          (tattoo) => tattoo.id !== action.payload
        ),
      };

    // ---------- EXPENSES ----------
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id
            ? { ...expense, ...action.payload.data }
            : expense
        ),
      };

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };

    case 'APPLY_RECURRING_EXPENSES':
      return {
        ...state,
        expenses: [...state.expenses, ...action.payload],
      };

    // ---------- RECURRING TEMPLATES ----------
    case 'ADD_RECURRING_TEMPLATE':
      return {
        ...state,
        recurringTemplates: [...state.recurringTemplates, action.payload],
      };

    case 'UPDATE_RECURRING_TEMPLATE':
      return {
        ...state,
        recurringTemplates: state.recurringTemplates.map((t) =>
          t.id === action.payload.id
            ? { ...t, ...action.payload.data }
            : t
        ),
      };

    case 'DELETE_RECURRING_TEMPLATE':
      return {
        ...state,
        recurringTemplates: state.recurringTemplates.filter(
          (t) => t.id !== action.payload
        ),
      };

    // ---------- COMPOUND: COMPLETE TATTOO ----------
    case 'COMPLETE_TATTOO': {
      const { tattooData, appointmentId, clientId } = action.payload;

      const updatedClients = state.clients.map((c) =>
        c.id === clientId
          ? {
              ...c,
              totalSpent: (c.totalSpent || 0) + tattooData.price,
              totalTattoos: (c.totalTattoos || 0) + 1,
              lastVisit: tattooData.date_completed || tattooData.date,
            }
          : c
      );

      const updatedAppointments = appointmentId
        ? state.appointments.map((apt) =>
            apt.id === appointmentId
              ? { ...apt, status: 'completed' }
              : apt
          )
        : state.appointments;

      return {
        ...state,
        tattoos: [...state.tattoos, tattooData],
        clients: updatedClients,
        appointments: updatedAppointments,
      };
    }

    default:
      return state;
  }
}

// ============================================================
// CONTEXT
// ============================================================

const AppContext = createContext(null);

// ============================================================
// HELPER: Map Supabase row → frontend shape
// ============================================================
// The DB uses snake_case, our frontend uses camelCase.
// These mappers keep things clean.

function mapAppointment(row) {
  return {
    id: row.id,
    date: row.scheduled_date,
    client: row.client_name,
    clientId: row.client_id,
    type: row.appointment_type,
    time: row.scheduled_time,
    duration: row.duration_minutes,
    notes: row.notes || '',
    phone: row.phone || '',
    status: row.status,
  };
}

function mapClient(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone || '',
    email: row.email || '',
    birthday: row.birthday || '',
    notes: row.notes || '',
    skinConditions: row.skin_conditions || '',
    createdAt: row.created_at ? row.created_at.split('T')[0] : '',
    totalSpent: parseFloat(row.total_spent) || 0,
    totalTattoos: row.total_tattoos || 0,
    lastVisit: row.last_visit || null,
  };
}

function mapTattoo(row) {
  return {
    id: row.id,
    clientId: row.client_id,
    clientName: row.client_name,
    appointmentId: row.appointment_id,
    date: row.date_completed,
    price: parseFloat(row.price) || 0,
    suppliesCost: parseFloat(row.supplies_cost) || 0,
    artistEarnings: parseFloat(row.artist_earnings) || 0,
    location: row.body_location || '',
    notes: row.notes || '',
    images: row.images || [],
    paid: row.paid,
    completedAt: row.completed_at,
  };
}

function mapExpense(row) {
  return {
    id: row.id,
    date: row.date,
    category: row.category,
    amount: parseFloat(row.amount) || 0,
    notes: row.notes || '',
    recurring: row.recurring,
    createdAt: row.created_at,
  };
}

function mapTemplate(row) {
  return {
    id: row.id,
    category: row.category,
    amount: parseFloat(row.amount) || 0,
    notes: row.notes || '',
    enabled: row.enabled,
  };
}

// ============================================================
// PROVIDER
// ============================================================

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { artist } = useAuth();

  // Load all data when artist profile is available
  useEffect(() => {
    if (!artist) return;

    const loadData = async () => {
      const [
        { data: appointments },
        { data: clients },
        { data: tattoos },
        { data: expenses },
        { data: templates },
      ] = await Promise.all([
        supabase.from('appointments').select('*').eq('artist_id', artist.id).order('scheduled_date', { ascending: true }),
        supabase.from('clients').select('*').eq('artist_id', artist.id).order('name'),
        supabase.from('tattoos').select('*').eq('artist_id', artist.id).order('date_completed', { ascending: false }),
        supabase.from('expenses').select('*').eq('artist_id', artist.id).order('date', { ascending: false }),
        supabase.from('recurring_templates').select('*').eq('artist_id', artist.id),
      ]);

      dispatch({
        type: 'LOAD_ALL_DATA',
        payload: {
          settings: {
            paymentModel: artist.pay_model || 'booth_rent',
            boothRentAmount: parseFloat(artist.booth_rent_amount) || 0,
            commissionRate: parseFloat(artist.commission_rate) || 0.60,
            name: artist.name || '',
            studioName: artist.studio_name || '',
            phone: artist.phone || '',
            email: artist.email || '',
          },
          appointments: (appointments || []).map(mapAppointment),
          clients: (clients || []).map(mapClient),
          tattoos: (tattoos || []).map(mapTattoo),
          expenses: (expenses || []).map(mapExpense),
          recurringTemplates: (templates || []).map(mapTemplate),
        },
      });
    };

    loadData();
  }, [artist]);

  return (
    <AppContext.Provider value={{ state, dispatch, artistId: artist?.id }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default AppContext;