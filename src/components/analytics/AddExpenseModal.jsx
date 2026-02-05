import { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, Tag, FileText, RefreshCw } from 'lucide-react';

function AddExpenseModal({ isOpen, onClose, onSave, expense = null, saveAsRecurring = false }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Supplies',
    amount: '',
    notes: '',
    recurring: false
  });

  useEffect(() => {
    if (expense) {
      setFormData(expense);
    } else if (saveAsRecurring) {
      setFormData(prev => ({ ...prev, recurring: true }));
    }
  }, [expense, saveAsRecurring]);

  const categories = [
    'Booth Rent',
    'Utilities',
    'Supplies',
    'Equipment',
    'Marketing',
    'Software',
    'Insurance',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    onClose();
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'Supplies',
      amount: '',
      notes: '',
      recurring: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-2xl font-bold">
            {expense ? 'Edit Expense' : 'Add Expense'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-tertiary rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date & Amount */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary">
                  $
                </span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="150.00"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition resize-none"
              rows={3}
              placeholder="What was this expense for?"
            />
          </div>

          {/* Recurring Checkbox */}
          <div className="bg-bg-primary p-4 rounded-lg border border-border-primary">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.recurring}
                onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                className="w-5 h-5 mt-0.5 rounded border-border-primary bg-bg-primary focus:ring-accent-primary focus:ring-2"
              />
              <div>
                <div className="font-semibold flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Recurring Monthly Expense
                </div>
                <div className="text-sm text-text-secondary mt-1">
                  This expense will automatically be added at the start of each month
                </div>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-bg-primary border border-border-primary rounded-lg font-semibold hover:bg-bg-tertiary transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
            >
              {expense ? 'Save Changes' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;