import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, FileText } from 'lucide-react';

function AppointmentModal({ isOpen, onClose, onSave, appointment = null, selectedDate = null }) {
  const [formData, setFormData] = useState({
    client: '',
    type: 'tattoo',
    date: '',
    time: '',
    duration: 120,
    phone: '',
    notes: ''
  });

  useEffect(() => {
    if (appointment) {
      // Editing existing appointment
      setFormData(appointment);
    } else if (selectedDate) {
      // New appointment with pre-selected date
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  }, [appointment, selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    
    // Reset form
    setFormData({
      client: '',
      type: 'tattoo',
      date: '',
      time: '',
      duration: 120,
      phone: '',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-2xl font-bold">
            {appointment ? 'Edit Appointment' : 'New Appointment'}
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
          {/* Client Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Client Name *
            </label>
            <input
              type="text"
              required
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="John Smith"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="555-123-4567"
            />
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Appointment Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'tattoo' })}
                className={`px-4 py-3 rounded-lg font-semibold transition ${
                  formData.type === 'tattoo'
                    ? 'bg-accent-primary text-white'
                    : 'bg-bg-primary border border-border-primary text-text-secondary hover:text-text-primary'
                }`}
              >
                Tattoo Session
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'consult' })}
                className={`px-4 py-3 rounded-lg font-semibold transition ${
                  formData.type === 'consult'
                    ? 'bg-accent-warning text-white'
                    : 'bg-bg-primary border border-border-primary text-text-secondary hover:text-text-primary'
                }`}
              >
                Consultation
              </button>
            </div>
          </div>

          {/* Date & Time */}
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
                <Clock className="w-4 h-4" />
                Time *
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Duration (minutes)
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
              <option value={150}>2.5 hours</option>
              <option value={180}>3 hours</option>
              <option value={240}>4 hours</option>
              <option value={300}>5 hours</option>
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
              rows={4}
              placeholder="Design details, placement, special instructions..."
            />
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
              {appointment ? 'Save Changes' : 'Create Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;