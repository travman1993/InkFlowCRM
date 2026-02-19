import { useState } from 'react';
import { Plus, Edit2, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import ArtistModal from './ArtistModal';
import AddStudioTattooModal from './AddStudioTattooModal';

function StudioArtistsTab({ studio }) {
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const [isTattooModalOpen, setIsTattooModalOpen] = useState(false);
  const [tattooArtistId, setTattooArtistId] = useState(null);
  const [showInactive, setShowInactive] = useState(false);

  const activeArtists = studio.artists.filter(a => a.active);
  const inactiveArtists = studio.artists.filter(a => !a.active);

  const now = new Date();
  const startOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const todayStr = now.toISOString().split('T')[0];

  const handleSaveArtist = async (formData) => {
    if (editingArtist) {
      await studio.updateArtist(editingArtist.id, formData);
    } else {
      await studio.addArtist(formData);
    }
  };

  const handleRecordTattoo = (artistId) => {
    setTattooArtistId(artistId);
    setIsTattooModalOpen(true);
  };

  if (activeArtists.length === 0 && inactiveArtists.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => { setEditingArtist(null); setIsArtistModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
          >
            <Plus className="w-5 h-5" />
            Add Artist
          </button>
        </div>
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg mb-4">No artists yet.</p>
          <p className="text-text-tertiary text-sm">Add your first artist to get started.</p>
        </div>

        <ArtistModal
          isOpen={isArtistModalOpen}
          onClose={() => setIsArtistModalOpen(false)}
          onSave={handleSaveArtist}
          onDeactivate={studio.deactivateArtist}
          artist={editingArtist}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Artist Roster</h2>
          <p className="text-sm text-text-secondary mt-1">{activeArtists.length} active artist{activeArtists.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { setEditingArtist(null); setIsArtistModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
        >
          <Plus className="w-5 h-5" />
          Add Artist
        </button>
      </div>

      {/* Active Artists */}
      <div className="space-y-4 mb-8">
        {activeArtists.map(artist => {
          const stats = studio.getStatsForArtist(artist.id, { startStr: startOfMonth, endStr: todayStr });

          return (
            <div
              key={artist.id}
              className="bg-bg-secondary rounded-xl border border-border-primary p-4 md:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-lg font-bold">{artist.name}</h3>
                    {artist.specialty && (
                      <span className="text-xs px-2 py-1 bg-accent-primary/10 text-accent-primary rounded-full">
                        {artist.specialty}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary mt-1">
                    {artist.phone && <span>{artist.phone}</span>}
                    {artist.email && <span>{artist.email}</span>}
                    <span className="text-text-tertiary">
                      {artist.payModel === 'booth_rent'
                        ? `Booth Rent: $${artist.boothRentAmount}/mo`
                        : `Commission: ${Math.round(artist.commissionRate * 100)}%`}
                    </span>
                  </div>
                </div>

                {/* Right: stats */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center hidden md:block">
                    <div className="text-xl font-bold text-accent-success">${stats.revenue.toLocaleString()}</div>
                    <div className="text-xs text-text-tertiary">Revenue this month</div>
                  </div>
                  <div className="text-center hidden md:block">
                    <div className="text-xl font-bold">{stats.tattooCount}</div>
                    <div className="text-xs text-text-tertiary">Tattoos this month</div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRecordTattoo(artist.id)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-accent-success/10 text-accent-success hover:bg-accent-success/20 rounded-lg text-sm font-semibold transition"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span className="hidden md:inline">Record</span>
                    </button>
                    <button
                      onClick={() => { setEditingArtist(artist); setIsArtistModalOpen(true); }}
                      className="p-2 hover:bg-bg-tertiary rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile stats */}
              <div className="flex gap-4 mt-4 pt-4 border-t border-border-primary md:hidden">
                <div>
                  <div className="text-lg font-bold text-accent-success">${stats.revenue.toLocaleString()}</div>
                  <div className="text-xs text-text-tertiary">Revenue this month</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{stats.tattooCount}</div>
                  <div className="text-xs text-text-tertiary">Tattoos</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inactive Artists */}
      {inactiveArtists.length > 0 && (
        <div>
          <button
            onClick={() => setShowInactive(!showInactive)}
            className="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-secondary mb-3 transition"
          >
            {showInactive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {inactiveArtists.length} inactive artist{inactiveArtists.length !== 1 ? 's' : ''}
          </button>

          {showInactive && (
            <div className="space-y-3">
              {inactiveArtists.map(artist => (
                <div
                  key={artist.id}
                  className="bg-bg-secondary rounded-xl border border-border-primary p-4 opacity-60 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-text-secondary">{artist.name}</div>
                    {artist.specialty && (
                      <div className="text-xs text-text-tertiary">{artist.specialty}</div>
                    )}
                  </div>
                  <button
                    onClick={() => studio.reactivateArtist(artist.id)}
                    className="px-3 py-1.5 bg-bg-primary border border-border-primary hover:bg-bg-tertiary rounded-lg text-sm font-semibold transition"
                  >
                    Reactivate
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <ArtistModal
        isOpen={isArtistModalOpen}
        onClose={() => { setIsArtistModalOpen(false); setEditingArtist(null); }}
        onSave={handleSaveArtist}
        onDeactivate={studio.deactivateArtist}
        artist={editingArtist}
      />

      <AddStudioTattooModal
        isOpen={isTattooModalOpen}
        onClose={() => { setIsTattooModalOpen(false); setTattooArtistId(null); }}
        onSave={studio.addTattooRecord}
        artists={studio.artists}
        preselectedArtistId={tattooArtistId}
      />
    </div>
  );
}

export default StudioArtistsTab;
