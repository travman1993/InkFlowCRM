import { X, Calendar, Clock, Phone, FileText, Edit2, Trash2, User } from 'lucide-react';

function StudioAppointmentDetailModal({ isOpen, onClose, appointment, artists, onEdit, onDelete }) {
  if (!isOpen || !appointment) return null;

  const artist = artists.find(a => a.id === appointment.studioArtistId);
  const artistLabel = artist ? artist.name : 'Owner (You)';

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${appointment.type === 'tattoo' ? 'bg-accent-primary' : 'bg-amber-400'}`} />
            <h2 className="text-2xl font-bold">{appointment.clientName}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-tertiary rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Type badge */}
          <span className={`inline-block px-4 py-2 rounded-lg font-semibold ${
            appointment.type === 'tattoo'
              ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
              : 'bg-amber-500/20 text-amber-400 border border-amber-400/30'
          }`}>
            {appointment.type === 'tattoo' ? 'Tattoo Session' : 'Consultation'}
          </span>

          {/* Artist */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-accent-primary mt-0.5" />
            <div>
              <div className="text-sm text-text-secondary">Artist</div>
              <div className="font-semibold">{artistLabel}</div>
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-accent-primary mt-0.5" />
              <div>
                <div className="text-sm text-text-secondary">Date</div>
                <div className="font-semibold">{formatDate(appointment.date)}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-accent-primary mt-0.5" />
              <div>
                <div className="text-sm text-text-secondary">Time</div>
                <div className="font-semibold">{appointment.time} ({appointment.duration} min)</div>
              </div>
            </div>
          </div>

          {/* Phone */}
          {appointment.clientPhone && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-accent-primary mt-0.5" />
              <div>
                <div className="text-sm text-text-secondary">Phone</div>
                <div className="font-semibold">{appointment.clientPhone}</div>
              </div>
            </div>
          )}

          {/* Notes */}
          {appointment.notes && (
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-accent-primary mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-text-secondary mb-2">Notes</div>
                <div className="text-text-secondary bg-bg-primary p-4 rounded-lg border border-border-primary">
                  {appointment.notes}
                </div>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              appointment.status === 'completed'
                ? 'bg-accent-success/20 text-accent-success'
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {appointment.status === 'completed' ? 'Completed' : 'Scheduled'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border-primary flex gap-3">
          <button
            onClick={() => { onEdit(appointment); onClose(); }}
            className="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-primary hover:bg-bg-tertiary rounded-lg font-semibold transition"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Delete this appointment?')) {
                onDelete(appointment.id);
                onClose();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-accent-danger/20 text-accent-danger hover:bg-accent-danger/30 rounded-lg font-semibold transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudioAppointmentDetailModal;
