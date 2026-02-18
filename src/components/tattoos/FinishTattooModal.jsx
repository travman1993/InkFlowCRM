import { useState, useEffect } from 'react';
import { X, Upload, DollarSign, Package, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
import { useArtistSettings } from '../../hooks/useArtistSettings';

function FinishTattooModal({ isOpen, onClose, onSave, appointment = null, client = null }) {
  const { settings, calculateArtistEarnings, calculateStudioCut } = useArtistSettings();

  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    appointmentId: null,
    date: '',
    price: '',
    suppliesCost: '',
    location: '',
    notes: '',
    images: [],
    paid: true
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (appointment) {
      // Coming from calendar appointment
      setFormData({
        clientId: appointment.clientId || '',
        clientName: appointment.client,
        appointmentId: appointment.id,
        date: appointment.date,
        price: '',
        suppliesCost: '',
        location: '',
        notes: appointment.notes || '',
        images: [],
        paid: true
      });
    } else if (client) {
      // Manual add from client profile
      setFormData({
        clientId: client.id,
        clientName: client.name,
        appointmentId: null,
        date: new Date().toISOString().split('T')[0],
        price: '',
        suppliesCost: '',
        location: '',
        notes: '',
        images: [],
        paid: true
      });
    }
  }, [appointment, client]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
    
    // Store actual files (in production, you'd upload these to Supabase Storage)
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setFormData({ ...formData, images: newImages });
  };

  const getEarnings = () => {
    const price = parseFloat(formData.price) || 0;
    const supplies = parseFloat(formData.suppliesCost) || 0;
    return calculateArtistEarnings(price, supplies);
  };

  const getStudioCut = () => {
    const price = parseFloat(formData.price) || 0;
    return calculateStudioCut(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const price = parseFloat(formData.price) || 0;
    const suppliesCost = parseFloat(formData.suppliesCost) || 0;

    const tattooData = {
      ...formData,
      price,
      suppliesCost,
      artistEarnings: calculateArtistEarnings(price, suppliesCost),
      completedAt: new Date().toISOString()
    };
    
    onSave(tattooData);
    onClose();
    
    // Reset form
    setFormData({
      clientId: '',
      clientName: '',
      appointmentId: null,
      date: '',
      price: '',
      suppliesCost: '',
      location: '',
      notes: '',
      images: [],
      paid: true
    });
    setImagePreviews([]);
  };

  if (!isOpen) return null;

  const earnings = getEarnings();
  const studioCut = getStudioCut();
  const isCommission = settings.paymentModel === 'commission';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-3xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <div>
            <h2 className="text-2xl font-bold">Finish Tattoo</h2>
            <p className="text-sm text-text-secondary mt-1">
              {formData.clientName} - {formData.date}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-tertiary rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Tattoo Photos
            </label>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-lg border border-border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-2 bg-accent-danger hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-border-primary hover:border-accent-primary rounded-lg p-8 text-center transition">
                <Upload className="w-12 h-12 mx-auto mb-4 text-text-tertiary" />
                <p className="text-text-secondary mb-2">Click to upload photos</p>
                <p className="text-xs text-text-tertiary">PNG, JPG up to 10MB each</p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Price & Supplies */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Final Price *
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
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="450.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Supplies Cost *
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
                  value={formData.suppliesCost}
                  onChange={(e) => setFormData({ ...formData, suppliesCost: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="50.00"
                />
              </div>
            </div>
          </div>

          {/* Earnings Display */}
          {(formData.price || formData.suppliesCost) && (
            <div className="bg-accent-success/10 border border-accent-success/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm text-text-secondary">Your Earnings</div>
                  <div className="text-xs text-text-tertiary mt-1">
                    {isCommission ? (
                      <>
                        ${formData.price || 0} × {Math.round(settings.commissionRate * 100)}% - ${formData.suppliesCost || 0} supplies
                      </>
                    ) : (
                      <>
                        ${formData.price || 0} - ${formData.suppliesCost || 0} supplies
                      </>
                    )}
                  </div>
                </div>
                <div className="text-3xl font-bold text-accent-success">
                  ${earnings.toFixed(2)}
                </div>
              </div>

              {isCommission && studioCut > 0 && (
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-accent-success/20">
                  <div className="text-xs text-text-tertiary">
                    Studio cut ({Math.round((1 - settings.commissionRate) * 100)}%)
                  </div>
                  <div className="text-sm text-text-tertiary">
                    ${studioCut.toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Body Location */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Body Location *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              placeholder="e.g., Left forearm, Upper back, Right ankle"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Session Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition resize-none"
              rows={4}
              placeholder="Design details, session length, client feedback, touch-up notes..."
            />
          </div>

          {/* Payment Status */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.paid}
                onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
                className="w-5 h-5 rounded border-border-primary bg-bg-primary focus:ring-accent-primary focus:ring-2"
              />
              <span className="font-semibold">Payment received</span>
            </label>
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
              className="flex-1 px-6 py-3 bg-accent-success hover:bg-green-600 rounded-lg font-semibold transition"
            >
              Complete Tattoo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FinishTattooModal;