import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export function useExpenses() {
  const { state, dispatch, artistId } = useAppContext();
  const { expenses, recurringTemplates } = state;

  const addExpense = async (expense) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert({
        artist_id: artistId,
        date: expense.date,
        category: expense.category,
        amount: expense.amount,
        notes: expense.notes || '',
        recurring: expense.recurring || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding expense:', error);
      return null;
    }

    const mapped = {
      id: data.id,
      date: data.date,
      category: data.category,
      amount: parseFloat(data.amount),
      notes: data.notes,
      recurring: data.recurring,
      createdAt: data.created_at,
    };

    dispatch({ type: 'ADD_EXPENSE', payload: mapped });
    return mapped;
  };

  const updateExpense = async (id, updatedData) => {
    const dbUpdate = {};
    if (updatedData.date !== undefined) dbUpdate.date = updatedData.date;
    if (updatedData.category !== undefined) dbUpdate.category = updatedData.category;
    if (updatedData.amount !== undefined) dbUpdate.amount = updatedData.amount;
    if (updatedData.notes !== undefined) dbUpdate.notes = updatedData.notes;
    if (updatedData.recurring !== undefined) dbUpdate.recurring = updatedData.recurring;

    const { error } = await supabase
      .from('expenses')
      .update(dbUpdate)
      .eq('id', id);

    if (error) {
      console.error('Error updating expense:', error);
      return;
    }

    dispatch({ type: 'UPDATE_EXPENSE', payload: { id, data: updatedData } });
  };

  const deleteExpense = async (id) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting expense:', error);
      return;
    }

    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  // ---------- Recurring Templates ----------

  const addRecurringTemplate = async (template) => {
    const { data, error } = await supabase
      .from('recurring_templates')
      .insert({
        artist_id: artistId,
        category: template.category,
        amount: template.amount,
        notes: template.notes || '',
        enabled: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding template:', error);
      return null;
    }

    const mapped = {
      id: data.id,
      category: data.category,
      amount: parseFloat(data.amount),
      notes: data.notes,
      enabled: data.enabled,
    };

    dispatch({ type: 'ADD_RECURRING_TEMPLATE', payload: mapped });
    return mapped;
  };

  const updateRecurringTemplate = async (id, updatedData) => {
    const dbUpdate = {};
    if (updatedData.category !== undefined) dbUpdate.category = updatedData.category;
    if (updatedData.amount !== undefined) dbUpdate.amount = updatedData.amount;
    if (updatedData.notes !== undefined) dbUpdate.notes = updatedData.notes;
    if (updatedData.enabled !== undefined) dbUpdate.enabled = updatedData.enabled;

    const { error } = await supabase
      .from('recurring_templates')
      .update(dbUpdate)
      .eq('id', id);

    if (error) {
      console.error('Error updating template:', error);
      return;
    }

    dispatch({ type: 'UPDATE_RECURRING_TEMPLATE', payload: { id, data: updatedData } });
  };

  const deleteRecurringTemplate = async (id) => {
    const { error } = await supabase
      .from('recurring_templates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting template:', error);
      return;
    }

    dispatch({ type: 'DELETE_RECURRING_TEMPLATE', payload: id });
  };

  const applyRecurringExpenses = async (year, month) => {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    const alreadyApplied = expenses.some(
      (e) => e.date.startsWith(monthStr) && e.recurring
    );
    if (alreadyApplied) return;

    const dateStr = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const enabledTemplates = recurringTemplates.filter((t) => t.enabled);

    if (enabledTemplates.length === 0) return;

    const rows = enabledTemplates.map((template) => ({
      artist_id: artistId,
      date: dateStr,
      category: template.category,
      amount: template.amount,
      notes: template.notes,
      recurring: true,
    }));

    const { data, error } = await supabase
      .from('expenses')
      .insert(rows)
      .select();

    if (error) {
      console.error('Error applying recurring expenses:', error);
      return;
    }

    const mapped = (data || []).map((row) => ({
      id: row.id,
      date: row.date,
      category: row.category,
      amount: parseFloat(row.amount),
      notes: row.notes,
      recurring: row.recurring,
      createdAt: row.created_at,
    }));

    dispatch({ type: 'APPLY_RECURRING_EXPENSES', payload: mapped });
  };

  // ---------- Computed ----------

  const getExpensesByDateRange = (startDate, endDate) => {
    return expenses.filter((expense) => {
      const d = new Date(expense.date);
      return d >= new Date(startDate) && d <= new Date(endDate);
    });
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  };

  const getExpensesByCategory = () => {
    const byCategory = {};
    expenses.forEach((e) => {
      if (!byCategory[e.category]) byCategory[e.category] = 0;
      byCategory[e.category] += e.amount;
    });
    return byCategory;
  };

  return {
    expenses,
    recurringTemplates,
    addExpense,
    updateExpense,
    deleteExpense,
    addRecurringTemplate,
    updateRecurringTemplate,
    deleteRecurringTemplate,
    applyRecurringExpenses,
    getExpensesByDateRange,
    getTotalExpenses,
    getExpensesByCategory,
  };
}