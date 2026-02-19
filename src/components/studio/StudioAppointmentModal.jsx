import { useState, useEffect } from 'react';
import { X, Clock, User, FileText, Phone } from 'lucide-react';

const TIME_SLOTS = [];
for (let h = 8; h <= 20; h++) {
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const ampm = h >= 12 ? 'PM' : 'AM';
  TIME_SLOTS.push(`${hour12}:00 ${ampm}`);
  TIME_SLOTS.push(`${hour12}:30 ${ampm}`);
}

function StudioAppointmentModal({ isOpen, onClose, onSave, artists, appointment = null, selectedDate = null }) {
  const [formData, setFormData] = useState({
    studioArtistId: '',
    clientName: '',
    clientPhone: '',
    type: 'tattoo',
    date: '',
    time: '10:00 AM',
    duration: 120,
    notes: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        studioArtistId: appointment.studioArtistId || '',
        clientName: appointment.clientName || '',
        clientPhone: appointment.clientPhone || '',
        type: appointment.type || 'tattoo',
        date: appointment.date || selectedDate || '',
        time: appointment.time || '10:00 AM',
        duration: appointment.duration || 120,
        notes: appointment.notes || '',
      });
    } else {
      setFormData({
        studioArtistId: artists.length === 1 ? artists[0].id : '',
        clientName: '',
        clientPhone: '',
        type: 'tattoo',
        date: selectedDate || new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        duration: 120,
        notes: '',
      });
    }
  }, [appointment, selectedDate, isOpen, artists]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, studioArtistId: formData.studioArtistId || null });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-lg w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-2xl font-bold">{appointment ? 'Edit Appointment' : 'New Appointment'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-bg-tertiary rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Artist */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Artist
            </label>
            <select
              value={formData.studioArtistId}
              onChange={(e) => setFormData({ ...formData, studioArtistId: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
            >
              <option value="">Owner (You)</option>
              {artists.filter(a => a.active).map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-semibold mb-2">Client Name *</label>
            <input
              type="text"
              required
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="Client name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone
            </label>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="555-123-4567"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <div className="grid grid-cols-2 gap-3">
              {['tattoo', 'consult'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t })}
                  className={`p-3 rounded-lg border-2 font-semibold transition ${
                    formData.type === t
                      ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                      : 'border-border-primary hover:border-accent-primary/50'
                  }`}
                >
                  {t === 'tattoo' ? 'Tattoo Session' : 'Consultation'}
                </button>
              ))}
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Date *</label>
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
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              >
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Duration: {formData.duration >= 60
                ? `${Math.floor(formData.duration / 60)}h${formData.duration % 60 > 0 ? ` ${formData.duration % 60}m` : ''}`
                : `${formData.duration}m`}
            </label>
            <input
              type="range"
              min="15"
              max="480"
              step="15"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full accent-accent-primary"
            />
            <div className="flex justify-between text-xs text-text-tertiary mt-1">
              <span>15m</span>
              <span>8h</span>
            </div>
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
              placeholder="Design details, reference images..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border-primary">
            <button type="button" onClick={onClose}
              className="flex-1 px-6 py-3 bg-bg-primary border border-border-primary rounded-lg font-semibold hover:bg-bg-tertiary transition">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition">
              {appointment ? 'Update' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudioAppointmentModal;
