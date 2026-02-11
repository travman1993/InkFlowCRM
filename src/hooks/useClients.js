import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export function useClients() {
  const { state, dispatch, artistId } = useAppContext();
  const { clients } = state;

  const addClient = async (client) => {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        artist_id: artistId,
        name: client.name,
        phone: client.phone || '',
        email: client.email || '',
        birthday: client.birthday || null,
        notes: client.notes || '',
        skin_conditions: client.skinConditions || '',
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding client:', error);
      return null;
    }

    const mapped = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      birthday: data.birthday || '',
      notes: data.notes,
      skinConditions: data.skin_conditions,
      createdAt: data.created_at.split('T')[0],
      totalSpent: 0,
      totalTattoos: 0,
      lastVisit: null,
    };

    dispatch({ type: 'ADD_CLIENT', payload: mapped });
    return mapped;
  };

  const bulkImportClients = async (clientsArray) => {
    const rows = clientsArray.map((c) => ({
      artist_id: artistId,
      name: c.name,
      phone: c.phone || '',
      email: c.email || '',
      birthday: c.birthday || null,
      notes: c.notes || '',
      skin_conditions: c.skinConditions || '',
    }));

    const { data, error } = await supabase
      .from('clients')
      .insert(rows)
      .select();

    if (error) {
      console.error('Error bulk importing clients:', error);
      return;
    }

    const mapped = (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      birthday: row.birthday || '',
      notes: row.notes,
      skinConditions: row.skin_conditions,
      createdAt: row.created_at.split('T')[0],
      totalSpent: 0,
      totalTattoos: 0,
      lastVisit: null,
    }));

    dispatch({ type: 'BULK_IMPORT_CLIENTS', payload: mapped });
  };

  const updateClient = async (id, updatedData) => {
    const dbUpdate = {};
    if (updatedData.name !== undefined) dbUpdate.name = updatedData.name;
    if (updatedData.phone !== undefined) dbUpdate.phone = updatedData.phone;
    if (updatedData.email !== undefined) dbUpdate.email = updatedData.email;
    if (updatedData.birthday !== undefined) dbUpdate.birthday = updatedData.birthday || null;
    if (updatedData.notes !== undefined) dbUpdate.notes = updatedData.notes;
    if (updatedData.skinConditions !== undefined) dbUpdate.skin_conditions = updatedData.skinConditions;
    if (updatedData.totalSpent !== undefined) dbUpdate.total_spent = updatedData.totalSpent;
    if (updatedData.totalTattoos !== undefined) dbUpdate.total_tattoos = updatedData.totalTattoos;
    if (updatedData.lastVisit !== undefined) dbUpdate.last_visit = updatedData.lastVisit;

    const { error } = await supabase
      .from('clients')
      .update(dbUpdate)
      .eq('id', id);

    if (error) {
      console.error('Error updating client:', error);
      return;
    }

    dispatch({ type: 'UPDATE_CLIENT', payload: { id, data: updatedData } });
  };

  const deleteClient = async (id) => {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting client:', error);
      return;
    }

    dispatch({ type: 'DELETE_CLIENT', payload: id });
  };

  const getClientById = (id) => {
    return clients.find((client) => client.id === id || client.id === parseInt(id));
  };

  const searchClients = (query) => {
    if (!query) return clients;
    const lowerQuery = query.toLowerCase();
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(lowerQuery) ||
        client.phone.includes(query) ||
        (client.email && client.email.toLowerCase().includes(lowerQuery))
    );
  };

  return {
    clients,
    addClient,
    bulkImportClients,
    updateClient,
    deleteClient,
    getClientById,
    searchClients,
  };
}