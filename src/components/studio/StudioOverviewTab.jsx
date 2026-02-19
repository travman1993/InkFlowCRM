import { useMemo } from 'react';
import { DollarSign, Users, Calendar, Scissors } from 'lucide-react';
import StatCard from '../analytics/StatCard';

function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function StudioOverviewTab({ studio }) {
  const now = new Date();
  const todayStr = toDateStr(now);

  const startOfMonth = toDateStr(new Date(now.getFullYear(), now.getMonth(), 1));

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const startOfWeekStr = toDateStr(startOfWeek);
  const endOfWeekStr   = toDateStr(endOfWeek);

  const revenueThisMonth = useMemo(() =>
    studio.tattoos
      .filter(t => t.date >= startOfMonth && t.date <= todayStr)
      .reduce((sum, t) => sum + t.price, 0),
    [studio.tattoos, startOfMonth, todayStr]
  );

  const tattoosThisMonth = useMemo(() =>
    studio.tattoos.filter(t => t.date >= startOfMonth && t.date <= todayStr).length,
    [studio.tattoos, startOfMonth, todayStr]
  );

  const appointmentsThisWeek = useMemo(() =>
    studio.appointments.filter(a => a.date >= startOfWeekStr && a.date <= endOfWeekStr).length,
    [studio.appointments, startOfWeekStr, endOfWeekStr]
  );

  const activeArtistCount = studio.artists.filter(a => a.active).length;

  // Next 5 upcoming appointments (today or future, scheduled status, sorted by date then time)
  const upcomingAppointments = useMemo(() => {
    return studio.appointments
      .filter(a => a.date >= todayStr && a.status !== 'completed')
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return (a.time || '').localeCompare(b.time || '');
      })
      .slice(0, 5);
  }, [studio.appointments, todayStr]);

  const getArtistName = (studioArtistId) => {
    if (!studioArtistId) return 'Owner';
    const artist = studio.artists.find(a => a.id === studioArtistId);
    return artist ? artist.name.split(' ')[0] : 'Unknown';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const isToday = dateStr === todayStr;
    if (isToday) return 'Today';
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    if (dateStr === toDateStr(tomorrow)) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Revenue This Month"
          value={`$${revenueThisMonth.toLocaleString()}`}
          icon={DollarSign}
          color="accent-success"
        />
        <StatCard
          title="Active Artists"
          value={activeArtistCount}
          icon={Users}
          color="accent-primary"
        />
        <StatCard
          title="Appointments This Week"
          value={appointmentsThisWeek}
          icon={Calendar}
          color="accent-primary"
        />
        <StatCard
          title="Tattoos This Month"
          value={tattoosThisMonth}
          icon={Scissors}
          color="accent-primary"
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>

        {upcomingAppointments.length === 0 ? (
          <p className="text-text-tertiary text-sm py-6 text-center">No upcoming appointments.</p>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map(apt => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-primary"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[72px]">
                    <div className="text-xs font-semibold text-accent-primary">{formatDate(apt.date)}</div>
                    <div className="text-xs text-text-tertiary">{apt.time || 'TBD'}</div>
                  </div>

                  <div className={`w-1 h-8 rounded-full shrink-0 ${apt.type === 'consult' ? 'bg-amber-400' : 'bg-accent-primary'}`} />

                  <div>
                    <div className="font-semibold">{apt.clientName}</div>
                    <div className="text-sm text-text-secondary">
                      {getArtistName(apt.studioArtistId)} · {apt.type === 'consult' ? 'Consultation' : 'Tattoo Session'}
                    </div>
                  </div>
                </div>

                {apt.clientPhone && (
                  <div className="hidden md:block text-sm text-text-tertiary">{apt.clientPhone}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudioOverviewTab;
