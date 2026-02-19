import { useState, useEffect } from 'react';
import { X, DollarSign, User, MapPin, FileText } from 'lucide-react';

function AddStudioTattooModal({ isOpen, onClose, onSave, artists, preselectedArtistId = null }) {
  const [formData, setFormData] = useState({
    studioArtistId: '',
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    price: '',
    suppliesCost: '',
    artistEarnings: '',
    bodyLocation: '',
    notes: '',
    paid: true,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        studioArtistId: preselectedArtistId || (artists.length === 1 ? artists[0].id : ''),
        clientName: '',
        date: new Date().toISOString().split('T')[0],
        price: '',
        suppliesCost: '',
        artistEarnings: '',
        bodyLocation: '',
        notes: '',
        paid: true,
      });
    }
  }, [isOpen, preselectedArtistId, artists]);

  // Auto-calculate artist earnings when price or artist changes
  const selectedArtist = artists.find(a => a.id === formData.studioArtistId);

  const calcEarnings = () => {
    if (!selectedArtist) return '';
    const price = parseFloat(formData.price) || 0;
    const supplies = parseFloat(formData.suppliesCost) || 0;
    if (selectedArtist.payModel === 'commission') {
      return (price * selectedArtist.commissionRate - supplies).toFixed(2);
    }
    return (price - supplies).toFixed(2);
  };

  const handlePriceChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    const price = parseFloat(field === 'price' ? value : formData.price) || 0;
    const supplies = parseFloat(field === 'suppliesCost' ? value : formData.suppliesCost) || 0;

    if (selectedArtist && price > 0) {
      const earnings = selectedArtist.payModel === 'commission'
        ? price * selectedArtist.commissionRate - supplies
        : price - supplies;
      updated.artistEarnings = Math.max(0, earnings).toFixed(2);
    }
    setFormData(updated);
  };

  const handleArtistChange = (artistId) => {
    const artist = artists.find(a => a.id === artistId);
    const price = parseFloat(formData.price) || 0;
    const supplies = parseFloat(formData.suppliesCost) || 0;
    let earnings = formData.artistEarnings;

    if (artist && price > 0) {
      const calc = artist.payModel === 'commission'
        ? price * artist.commissionRate - supplies
        : price - supplies;
      earnings = Math.max(0, calc).toFixed(2);
    }

    setFormData({ ...formData, studioArtistId: artistId, artistEarnings: earnings });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      suppliesCost: parseFloat(formData.suppliesCost) || 0,
      artistEarnings: parseFloat(formData.artistEarnings) || 0,
    });
    onClose();
  };

  if (!isOpen) return null;

  const earningsHint = selectedArtist
    ? selectedArtist.payModel === 'commission'
      ? `${Math.round(selectedArtist.commissionRate * 100)}% commission − supplies`
      : 'Price − supplies (booth rent)'
    : '';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-lg w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-2xl font-bold">Record Tattoo</h2>
          <button onClick={onClose} className="p-2 hover:bg-bg-tertiary rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Artist */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Artist *
            </label>
            <select
              required
              value={formData.studioArtistId}
              onChange={(e) => handleArtistChange(e.target.value)}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
            >
              <option value="">Select artist...</option>
              {artists.filter(a => a.active).map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          {/* Client + Date */}
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Price + Supplies */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handlePriceChange('price', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Supplies Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.suppliesCost}
                  onChange={(e) => handlePriceChange('suppliesCost', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Artist Earnings */}
          <div>
            <label className="block text-sm font-semibold mb-2">Artist Earnings *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">$</span>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.artistEarnings}
                onChange={(e) => setFormData({ ...formData, artistEarnings: e.target.value })}
                className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                placeholder="0.00"
              />
            </div>
            {earningsHint && (
              <p className="text-xs text-text-tertiary mt-1">Auto-calculated: {earningsHint}</p>
            )}
          </div>

          {/* Location + Notes */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Body Location
            </label>
            <input
              type="text"
              value={formData.bodyLocation}
              onChange={(e) => setFormData({ ...formData, bodyLocation: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="e.g. Left forearm, Upper back..."
            />
          </div>

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
              placeholder="Design details, session notes..."
            />
          </div>

          {/* Paid toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.paid}
              onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
              className="w-5 h-5 rounded border-border-primary bg-bg-primary focus:ring-accent-primary"
            />
            <span className="font-semibold">Payment received</span>
          </label>

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
              className="flex-1 px-6 py-3 bg-accent-success hover:bg-green-600 rounded-lg font-semibold transition"
            >
              Record Tattoo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudioTattooModal;
