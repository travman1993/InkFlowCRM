import { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Zap } from 'lucide-react';

function ArtistModal({ isOpen, onClose, onSave, onDeactivate, artist = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: '',
    payModel: 'booth_rent',
    boothRentAmount: '',
    commissionRate: '60',
    notes: '',
  });

  useEffect(() => {
    if (artist) {
      setFormData({
        name: artist.name || '',
        phone: artist.phone || '',
        email: artist.email || '',
        specialty: artist.specialty || '',
        payModel: artist.payModel || 'booth_rent',
        boothRentAmount: artist.boothRentAmount ? String(artist.boothRentAmount) : '',
        commissionRate: artist.commissionRate ? String(Math.round(artist.commissionRate * 100)) : '60',
        notes: artist.notes || '',
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        specialty: '',
        payModel: 'booth_rent',
        boothRentAmount: '',
        commissionRate: '60',
        notes: '',
      });
    }
  }, [artist, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      boothRentAmount: parseFloat(formData.boothRentAmount) || 0,
      commissionRate: (parseFloat(formData.commissionRate) || 60) / 100,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-lg w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-2xl font-bold">{artist ? 'Edit Artist' : 'Add Artist'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-bg-tertiary rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="Artist name"
            />
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                placeholder="artist@email.com"
              />
            </div>
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Specialty
            </label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="e.g. Traditional, Realism, Blackwork..."
            />
          </div>

          {/* Pay Model */}
          <div>
            <label className="block text-sm font-semibold mb-2">Pay Model</label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, payModel: 'booth_rent' })}
                className={`p-3 rounded-lg border-2 font-semibold transition ${
                  formData.payModel === 'booth_rent'
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                    : 'border-border-primary hover:border-accent-primary/50'
                }`}
              >
                Booth Rent
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, payModel: 'commission' })}
                className={`p-3 rounded-lg border-2 font-semibold transition ${
                  formData.payModel === 'commission'
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                    : 'border-border-primary hover:border-accent-primary/50'
                }`}
              >
                Commission
              </button>
            </div>

            {formData.payModel === 'booth_rent' && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.boothRentAmount}
                  onChange={(e) => setFormData({ ...formData, boothRentAmount: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="Monthly booth rent amount"
                />
              </div>
            )}

            {formData.payModel === 'commission' && (
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                  className="w-full pr-8 pl-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="Artist commission %"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">%</span>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition resize-none"
              rows={3}
              placeholder="Any additional notes..."
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
              {artist ? 'Save Changes' : 'Add Artist'}
            </button>
          </div>

          {/* Deactivate (edit mode only) */}
          {artist && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Deactivate ${artist.name}? They will be hidden from active rosters but their data is preserved.`)) {
                  onDeactivate(artist.id);
                  onClose();
                }
              }}
              className="w-full px-6 py-3 bg-accent-danger/10 text-accent-danger hover:bg-accent-danger/20 rounded-lg font-semibold transition"
            >
              Deactivate Artist
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ArtistModal;
