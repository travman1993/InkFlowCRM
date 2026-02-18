import { useState, useEffect } from 'react';
import { X, Clock, User, FileText, Phone } from 'lucide-react';
import { useClients } from '../../hooks/useClients';

function AppointmentModal({ isOpen, onClose, onSave, selectedDate, appointment = null }) {
  const { clients } = useClients();

  const [formData, setFormData] = useState({
    client: '',
    clientId: null,
    type: 'tattoo',
    date: '',
    time: '10:00 AM',
    duration: 120,
    notes: '',
    phone: '',
  });

  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  useEffect(() => {
    if (appointment) {
      // Editing existing appointment
      setFormData({
        client: appointment.client || '',
        clientId: appointment.clientId || null,
        type: appointment.type || 'tattoo',
        date: appointment.date || selectedDate || '',
        time: appointment.time || '10:00 AM',
        duration: appointment.duration || 120,
        notes: appointment.notes || '',
        phone: appointment.phone || '',
      });
      setClientSearch(appointment.client || '');
    } else {
      // New appointment
      setFormData({
        client: '',
        clientId: null,
        type: 'tattoo',
        date: selectedDate || new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        duration: 120,
        notes: '',
        phone: '',
      });
      setClientSearch('');
    }
  }, [appointment, selectedDate, isOpen]);

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const handleSelectClient = (client) => {
    setFormData({
      ...formData,
      client: client.name,
      clientId: client.id,
      phone: client.phone || formData.phone,
    });
    setClientSearch(client.name);
    setShowClientDropdown(false);
  };

  const handleClientInputChange = (value) => {
    setClientSearch(value);
    setFormData({
      ...formData,
      client: value,
      clientId: null, // Reset clientId when typing freely
    });
    setShowClientDropdown(value.length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      client: clientSearch || formData.client,
    });
    onClose();
  };

  if (!isOpen) return null;

  const timeSlots = [];
  for (let h = 8; h <= 20; h++) {
    const hour12 = h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? 'PM' : 'AM';
    timeSlots.push(`${hour12}:00 ${ampm}`);
    timeSlots.push(`${hour12}:30 ${ampm}`);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-lg w-full">
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
          {/* Client - Searchable dropdown */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Client *
            </label>
            <input
              type="text"
              required
              value={clientSearch}
              onChange={(e) => handleClientInputChange(e.target.value)}
              onFocus={() => setShowClientDropdown(clientSearch.length > 0 || clients.length > 0)}
              onBlur={() => setTimeout(() => setShowClientDropdown(false), 200)}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="Search or type client name..."
            />

            {/* Linked client indicator */}
            {formData.clientId && (
              <div className="absolute right-3 top-10 text-xs text-accent-success font-semibold">
                ✓ Linked
              </div>
            )}

            {/* Dropdown */}
            {showClientDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-bg-secondary border border-border-primary rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredClients.length > 0 ? (
                  filteredClients.slice(0, 8).map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      onMouseDown={() => handleSelectClient(client)}
                      className="w-full text-left px-4 py-3 hover:bg-bg-tertiary transition flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold">{client.name}</div>
                        {client.phone && (
                          <div className="text-xs text-text-tertiary">{client.phone}</div>
                        )}
                      </div>
                      <div className="text-xs text-text-tertiary">
                        {client.totalTattoos} tattoo{client.totalTattoos !== 1 ? 's' : ''}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-text-tertiary text-sm">
                    No matching clients. Name will be saved as-is.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="555-123-4567"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'tattoo' })}
                className={`p-3 rounded-lg border-2 font-semibold transition ${
                  formData.type === 'tattoo'
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                    : 'border-border-primary hover:border-accent-primary/50'
                }`}
              >
                Tattoo Session
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'consult' })}
                className={`p-3 rounded-lg border-2 font-semibold transition ${
                  formData.type === 'consult'
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                    : 'border-border-primary hover:border-accent-primary/50'
                }`}
              >
                Consultation
              </button>
            </div>
          </div>

          {/* Date & Time */}
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
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Duration: {formData.duration >= 60
                ? `${Math.floor(formData.duration / 60)}h ${formData.duration % 60 > 0 ? `${formData.duration % 60}m` : ''}`
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
              placeholder="Design details, reference images, special requests..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border-primary">
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
              {appointment ? 'Update' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;