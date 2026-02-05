import { X, Calendar, Clock, User, Phone, FileText, Edit2, Trash2, CheckCircle } from 'lucide-react';

function AppointmentDetailModal({ isOpen, onClose, appointment, onEdit, onDelete, onComplete }) {
  if (!isOpen || !appointment) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              appointment.type === 'tattoo' ? 'bg-accent-primary' : 'bg-accent-warning'
            }`}></div>
            <h2 className="text-2xl font-bold">{appointment.client}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-tertiary rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Type Badge */}
          <div>
            <span className={`inline-block px-4 py-2 rounded-lg font-semibold ${
              appointment.type === 'tattoo'
                ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                : 'bg-accent-warning/20 text-accent-warning border border-accent-warning/30'
            }`}>
              {appointment.type === 'tattoo' ? 'Tattoo Session' : 'Consultation'}
            </span>
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
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

          {/* Client Info */}
          {appointment.phone && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-accent-primary mt-0.5" />
              <div>
                <div className="text-sm text-text-secondary">Phone</div>
                <div className="font-semibold">{appointment.phone}</div>
              </div>
            </div>
          )}

          {/* Notes */}
          {appointment.notes && (
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-accent-primary mt-0.5" />
              <div>
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
                : appointment.status === 'cancelled'
                ? 'bg-accent-danger/20 text-accent-danger'
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {appointment.status === 'scheduled' ? 'Scheduled' : 
               appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border-primary flex flex-wrap gap-3">
          {appointment.status === 'scheduled' && appointment.type === 'tattoo' && (
            <button
              onClick={() => {
                onComplete(appointment);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-accent-success hover:bg-green-600 rounded-lg font-semibold transition"
            >
              <CheckCircle className="w-4 h-4" />
              Complete Tattoo
            </button>
          )}
          
          <button
            onClick={() => {
              onEdit(appointment);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-primary hover:bg-bg-tertiary rounded-lg font-semibold transition"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this appointment?')) {
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

export default AppointmentDetailModal;