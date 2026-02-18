import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Calendar, 
  AlertCircle, 
  Edit2, 
  Trash2,
  DollarSign,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import FinishTattooModal from '../tattoos/FinishTattooModal';
import { useTattoos } from '../../hooks/useTattoos';

function ClientProfile({ client, onEdit, onDelete, onUpdateClient }) {
  const navigate = useNavigate();
  const { getTattoosByClient, completeTattoo } = useTattoos();
  const [isAddTattooOpen, setIsAddTattooOpen] = useState(false);

  const clientTattoos = getTattoosByClient(client.id);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatBirthday = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
      onDelete(client.id);
      navigate('/clients');
    }
  };

  const handleSaveTattoo = async (tattooData) => {
    // Use completeTattoo which handles:
    // 1. Inserting tattoo to Supabase
    // 2. Updating client stats in Supabase
    // 3. Updating local state
    await completeTattoo(
      tattooData,
      null, // no appointment
      client.id
    );
    
    setIsAddTattooOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-primary p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/clients')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Clients
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{client.name}</h1>
              <div className="flex flex-wrap gap-4 text-text-secondary">
                {client.phone && (
                  <a href={`tel:${client.phone}`} className="flex items-center gap-2 hover:text-accent-primary transition">
                    <Phone className="w-4 h-4" />
                    {client.phone}
                  </a>
                )}
                {client.email && (
                  <a href={`mailto:${client.email}`} className="flex items-center gap-2 hover:text-accent-primary transition">
                    <Mail className="w-4 h-4" />
                    {client.email}
                  </a>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(client)}
                className="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-primary hover:bg-bg-tertiary rounded-lg font-semibold transition"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-accent-danger/20 text-accent-danger hover:bg-accent-danger/30 rounded-lg font-semibold transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Client Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-text-tertiary mb-1">Total Spent</div>
                  <div className="text-2xl font-bold text-accent-primary">
                    ${client.totalSpent.toLocaleString()}
                  </div>
                </div>

                <div className="border-t border-border-primary pt-4">
                  <div className="text-sm text-text-tertiary mb-1">Total Tattoos</div>
                  <div className="text-2xl font-bold">{client.totalTattoos}</div>
                </div>

                <div className="border-t border-border-primary pt-4">
                  <div className="text-sm text-text-tertiary mb-1">Last Visit</div>
                  <div className="font-semibold">
                    {client.lastVisit ? formatDate(client.lastVisit) : 'No visits yet'}
                  </div>
                </div>

                <div className="border-t border-border-primary pt-4">
                  <div className="text-sm text-text-tertiary mb-1">Client Since</div>
                  <div className="font-semibold">{formatDate(client.createdAt)}</div>
                </div>
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
              <h2 className="text-xl font-bold mb-4">Personal Info</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-text-tertiary">Birthday</div>
                    <div className="font-semibold">{formatBirthday(client.birthday)}</div>
                  </div>
                </div>

                {client.skinConditions && (
                  <div className="flex items-start gap-3 pt-4 border-t border-border-primary">
                    <AlertCircle className="w-5 h-5 text-accent-warning mt-0.5" />
                    <div>
                      <div className="text-sm text-text-tertiary">Skin Conditions</div>
                      <div className="font-semibold">{client.skinConditions}</div>
                    </div>
                  </div>
                )}

                {client.notes && (
                  <div className="pt-4 border-t border-border-primary">
                    <div className="text-sm text-text-tertiary mb-2">Notes</div>
                    <div className="text-text-secondary bg-bg-primary p-4 rounded-lg border border-border-primary">
                      {client.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Tattoo History */}
          <div className="lg:col-span-2">
            <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Tattoo History</h2>
                <button
                  onClick={() => setIsAddTattooOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
                >
                  <Plus className="w-5 h-5" />
                  Add Tattoo
                </button>
              </div>

              {clientTattoos.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 text-text-tertiary" />
                  <p className="text-text-secondary text-lg mb-4">
                    No tattoos recorded yet.
                  </p>
                  <button
                    onClick={() => setIsAddTattooOpen(true)}
                    className="px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
                  >
                    Add First Tattoo
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {clientTattoos.map((tattoo) => (
                    <div
                      key={tattoo.id}
                      className="bg-bg-primary rounded-lg border border-border-primary p-6 hover:border-accent-primary/50 transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-lg font-bold mb-1">{tattoo.location}</div>
                          <div className="text-sm text-text-secondary">
                            {formatDate(tattoo.date)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-accent-primary">
                            ${tattoo.price}
                          </div>
                          <div className="text-xs text-text-tertiary">
                            Supplies: ${tattoo.suppliesCost} | Earnings: ${tattoo.artistEarnings}
                          </div>
                        </div>
                      </div>

                      {tattoo.notes && (
                        <div className="mb-4 p-4 bg-bg-secondary rounded-lg border border-border-primary">
                          <div className="text-sm text-text-secondary">{tattoo.notes}</div>
                        </div>
                      )}

                      {tattoo.images && tattoo.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {tattoo.images.map((image, index) => (
                            <div
                              key={index}
                              className="aspect-square bg-bg-tertiary rounded-lg border border-border-primary overflow-hidden"
                            >
                              <img
                                src={image}
                                alt={`Tattoo ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center aspect-video bg-bg-tertiary rounded-lg border border-border-primary">
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2 text-text-tertiary" />
                            <div className="text-sm text-text-tertiary">No photos</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Tattoo Modal */}
      <FinishTattooModal
        isOpen={isAddTattooOpen}
        onClose={() => setIsAddTattooOpen(false)}
        onSave={handleSaveTattoo}
        client={client}
      />
    </div>
  );
}

export default ClientProfile;