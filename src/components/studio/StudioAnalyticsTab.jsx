import { useState, useMemo } from 'react';
import { DollarSign, TrendingDown, TrendingUp, Scissors } from 'lucide-react';
import StatCard from '../analytics/StatCard';
import RevenueChart from '../analytics/RevenueChart';

// Fixed artist palette (matches StudioMonthView for visual consistency)
const ARTIST_PALETTE_SOLIDS = [
  '#a855f7', // purple
  '#f43f5e', // rose
  '#f59e0b', // amber
  '#84cc16', // lime
  '#3b82f6', // blue
  '#ec4899', // pink
];

const PERIODS = [
  { id: 'day',   label: 'Today' },
  { id: 'week',  label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'year',  label: 'This Year' },
];

function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getPeriodRange(period) {
  const now = new Date();
  const todayStr = toDateStr(now);

  if (period === 'day') return { startStr: todayStr, endStr: todayStr };

  if (period === 'week') {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    return { startStr: toDateStr(startOfWeek), endStr: todayStr };
  }

  if (period === 'month') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return { startStr: toDateStr(startOfMonth), endStr: todayStr };
  }

  // year
  return { startStr: `${now.getFullYear()}-01-01`, endStr: `${now.getFullYear()}-12-31` };
}

function StudioAnalyticsTab({ studio }) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const { startStr, endStr } = getPeriodRange(selectedPeriod);

  const filteredTattoos = useMemo(() =>
    studio.tattoos.filter(t => t.date >= startStr && t.date <= endStr),
    [studio.tattoos, startStr, endStr]
  );

  const totalRevenue  = filteredTattoos.reduce((s, t) => s + t.price, 0);
  const totalPayouts  = filteredTattoos.reduce((s, t) => s + t.artistEarnings, 0);
  const studioTake    = totalRevenue - totalPayouts;
  const tattooCount   = filteredTattoos.length;

  // RevenueChart data — group by day for month view, by month for year, single bar otherwise
  const chartData = useMemo(() => {
    if (selectedPeriod === 'day') {
      return [{ label: 'Today', value: totalRevenue }];
    }

    if (selectedPeriod === 'week') {
      const dayLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());

      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const dStr = toDateStr(d);
        const value = filteredTattoos
          .filter(t => t.date === dStr)
          .reduce((s, t) => s + t.price, 0);
        return { label: dayLabels[i], value };
      });
    }

    if (selectedPeriod === 'month') {
      const now = new Date();
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const dStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const value = filteredTattoos
          .filter(t => t.date === dStr)
          .reduce((s, t) => s + t.price, 0);
        return { label: String(day), value };
      });
    }

    // year — monthly breakdown
    const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => {
      const mStr = String(i + 1).padStart(2, '0');
      const value = filteredTattoos
        .filter(t => t.date.startsWith(`${year}-${mStr}`))
        .reduce((s, t) => s + t.price, 0);
      return { label: monthLabels[i], value };
    });
  }, [filteredTattoos, selectedPeriod, totalRevenue]);

  // Per-artist breakdown
  const activeArtists = studio.artists.filter(a => a.active);
  const artistStats = useMemo(() =>
    activeArtists.map((artist, i) => {
      const artistTattoos = filteredTattoos.filter(t => t.studioArtistId === artist.id);
      return {
        artist,
        color: ARTIST_PALETTE_SOLIDS[i % ARTIST_PALETTE_SOLIDS.length],
        revenue: artistTattoos.reduce((s, t) => s + t.price, 0),
        earnings: artistTattoos.reduce((s, t) => s + t.artistEarnings, 0),
        tattooCount: artistTattoos.length,
      };
    }),
    [filteredTattoos, activeArtists]
  );

  // Owner's own tattoos (studioArtistId = null from studio_tattoos isn't tracked here — owner records their own in the artist dashboard)
  // Show only managed artists in the breakdown

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Period Selector */}
      <div className="flex gap-2 flex-wrap">
        {PERIODS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPeriod(p.id)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
              selectedPeriod === p.id
                ? 'bg-accent-primary text-white'
                : 'bg-bg-secondary border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="accent-success"
        />
        <StatCard
          title="Artist Payouts"
          value={`$${totalPayouts.toLocaleString()}`}
          icon={TrendingDown}
          color="accent-danger"
        />
        <StatCard
          title="Studio Take"
          value={`$${studioTake.toLocaleString()}`}
          icon={TrendingUp}
          color="accent-primary"
        />
        <StatCard
          title="Tattoos Completed"
          value={tattooCount}
          icon={Scissors}
          color="accent-primary"
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={chartData} title="Revenue Breakdown" />

      {/* Per-Artist Breakdown */}
      {activeArtists.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Artist Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artistStats.map(({ artist, color, revenue, earnings, tattooCount: tc }) => {
              const revenueShare = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
              return (
                <div
                  key={artist.id}
                  className="bg-bg-secondary rounded-xl border border-border-primary p-5"
                >
                  {/* Artist header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="font-bold">{artist.name}</div>
                    {artist.specialty && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-bg-primary border border-border-primary text-text-tertiary">
                        {artist.specialty}
                      </span>
                    )}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-accent-success">${revenue.toLocaleString()}</div>
                      <div className="text-xs text-text-tertiary">Revenue</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">${earnings.toLocaleString()}</div>
                      <div className="text-xs text-text-tertiary">
                        {artist.payModel === 'booth_rent' ? 'Booth Rent' : 'Earnings'}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{tc}</div>
                      <div className="text-xs text-text-tertiary">Tattoos</div>
                    </div>
                  </div>

                  {/* Revenue share bar */}
                  <div>
                    <div className="flex justify-between text-xs text-text-tertiary mb-1">
                      <span>Revenue share</span>
                      <span>{revenueShare.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-bg-primary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${revenueShare}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredTattoos.length === 0 && (
        <div className="text-center py-12 text-text-tertiary">
          No tattoo records for this period.
        </div>
      )}
    </div>
  );
}

export default StudioAnalyticsTab;
