import { useState } from 'react';

export function useExpenses() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: '2026-02-01',
      category: 'Booth Rent',
      amount: 800,
      notes: 'February booth rent',
      recurring: true, // This will auto-add each month
      createdAt: '2026-02-01T10:00:00'
    },
    {
      id: 2,
      date: '2026-02-03',
      category: 'Supplies',
      amount: 150,
      notes: 'Ink cartridges and needles',
      recurring: false,
      createdAt: '2026-02-03T14:30:00'
    },
    {
      id: 3,
      date: '2026-02-15',
      category: 'Utilities',
      amount: 120,
      notes: 'Power bill - recurring monthly',
      recurring: true,
      createdAt: '2026-02-15T10:00:00'
    },
  ]);

  const [recurringTemplates, setRecurringTemplates] = useState([
    {
      id: 1,
      category: 'Booth Rent',
      amount: 800,
      notes: 'Monthly booth rent',
      enabled: true
    },
    {
      id: 2,
      category: 'Utilities',
      amount: 120,
      notes: 'Power/Water bill',
      enabled: true
    },
  ]);

  // Add expense
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setExpenses([...expenses, newExpense]);
  };

  // Add recurring template
  const addRecurringTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: Date.now(),
      enabled: true
    };
    setRecurringTemplates([...recurringTemplates, newTemplate]);
  };

  // Update recurring template
  const updateRecurringTemplate = (id, updatedData) => {
    setRecurringTemplates(recurringTemplates.map(template =>
      template.id === id ? { ...template, ...updatedData } : template
    ));
  };

  // Delete recurring template
  const deleteRecurringTemplate = (id) => {
    setRecurringTemplates(recurringTemplates.filter(template => template.id !== id));
  };

  // Apply recurring expenses for a new month
  const applyRecurringExpenses = (year, month) => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const dateStr = firstDayOfMonth.toISOString().split('T')[0];

    // Check if recurring expenses already applied this month
    const alreadyApplied = expenses.some(e => 
      e.date.startsWith(`${year}-${String(month).padStart(2, '0')}`) && e.recurring
    );

    if (!alreadyApplied) {
      const newExpenses = recurringTemplates
        .filter(t => t.enabled)
        .map(template => ({
          id: Date.now() + Math.random(),
          date: dateStr,
          category: template.category,
          amount: template.amount,
          notes: template.notes,
          recurring: true,
          createdAt: new Date().toISOString()
        }));

      setExpenses([...expenses, ...newExpenses]);
    }
  };

  // Update expense
  const updateExpense = (id, updatedData) => {
    setExpenses(expenses.map(expense =>
      expense.id === id ? { ...expense, ...updatedData } : expense
    ));
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Get expenses by date range
  const getExpensesByDateRange = (startDate, endDate) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
    });
  };

  // Get total expenses
  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Get expenses by category
  const getExpensesByCategory = () => {
    const byCategory = {};
    expenses.forEach(expense => {
      if (!byCategory[expense.category]) {
        byCategory[expense.category] = 0;
      }
      byCategory[expense.category] += expense.amount;
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
    getExpensesByCategory
  };
}