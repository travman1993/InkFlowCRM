import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Droplets,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';

// Format a dollar amount compactly: $950, $1.5k, $12k, $120k
function fmtRev(n) {
  if (n >= 10000) return `$${(n / 1000).toFixed(0)}k`;
  if (n >= 1000)  return `$${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return `$${Math.round(n)}`;
}

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, artist } = useAuth();
  const { state, loaded, loadError } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [studioStats, setStudioStats] = useState(null);

  const isStudio = Boolean(artist?.studio_name);

  // Current month/year strings used for filtering
  const now        = new Date();
  const thisYear   = now.getFullYear();
  const monthPad   = String(now.getMonth() + 1).padStart(2, '0');
  const monthPfx   = `${thisYear}-${monthPad}`;          // "2026-02"
  const yearPfx    = `${thisYear}`;                       // "2026"
  const monthLabel = now.toLocaleString('default', { month: 'short' }); // "Feb"

  // ── Artist stats (computed from already-loaded AppContext data) ──────────
  const artistStats = useMemo(() => {
    if (isStudio || !state.tattoos) return null;
    const year  = state.tattoos.filter(t => t.date?.startsWith(yearPfx));
    const month = state.tattoos.filter(t => t.date?.startsWith(monthPfx));
    return {
      monthRevenue: month.reduce((s, t) => s + (t.price || 0), 0),
      monthCount:   month.length,
      yearRevenue:  year.reduce((s, t)  => s + (t.price || 0), 0),
      yearCount:    year.length,
    };
  }, [isStudio, state.tattoos, monthPfx, yearPfx]);

  // ── Studio stats (lightweight query — just what the sidebar needs) ────────
  useEffect(() => {
    if (!isStudio || !artist?.id) return;

    const load = async () => {
      const [{ data: tattoos }, { data: artists }] = await Promise.all([
        supabase
          .from('studio_tattoos')
          .select('studio_artist_id, price, date_completed')
          .eq('owner_id', artist.id)
          .gte('date_completed', `${thisYear}-01-01`),
        supabase
          .from('studio_artists')
          .select('id, name')
          .eq('owner_id', artist.id)
          .eq('active', true)
          .order('name'),
      ]);

      if (!tattoos) return;

      const monthTattoos = tattoos.filter(t => t.date_completed?.startsWith(monthPfx));
      const yearRevenue  = tattoos.reduce((s, t) => s + parseFloat(t.price || 0), 0);
      const monthRevenue = monthTattoos.reduce((s, t) => s + parseFloat(t.price || 0), 0);

      const perArtist = (artists || [])
        .map(a => {
          const rows = monthTattoos.filter(t => t.studio_artist_id === a.id);
          return {
            id:           a.id,
            name:         a.name,
            monthCount:   rows.length,
            monthRevenue: rows.reduce((s, t) => s + parseFloat(t.price || 0), 0),
          };
        })
        .filter(a => a.monthCount > 0);

      setStudioStats({
        monthRevenue,
        monthCount: monthTattoos.length,
        yearRevenue,
        yearCount:  tattoos.length,
        artists:    perArtist,
      });
    };

    load();
  }, [isStudio, artist?.id, monthPfx, thisYear]);

  const stats = isStudio ? studioStats : artistStats;

  // ── Stats panel JSX (reused in desktop sidebar + mobile menu) ────────────
  const statsPanel = stats ? (
    <div className="px-4 py-3 border-t border-border-primary">
      <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2">Revenue</p>

      {/* This Month */}
      <div className="bg-bg-tertiary rounded-lg px-3 py-2 mb-2">
        <p className="text-xs text-text-tertiary mb-0.5">{monthLabel} {thisYear}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-accent-primary">{fmtRev(stats.monthRevenue)}</span>
          <span className="text-xs text-text-secondary">
            {stats.monthCount} {stats.monthCount === 1 ? 'tattoo' : 'tattoos'}
          </span>
        </div>
      </div>

      {/* This Year */}
      <div className="bg-bg-tertiary rounded-lg px-3 py-2">
        <p className="text-xs text-text-tertiary mb-0.5">{thisYear}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-text-primary">{fmtRev(stats.yearRevenue)}</span>
          <span className="text-xs text-text-secondary">
            {stats.yearCount} {stats.yearCount === 1 ? 'tattoo' : 'tattoos'}
          </span>
        </div>
      </div>

      {/* Studio: per-artist breakdown for this month */}
      {isStudio && stats.artists?.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">
            Artists · {monthLabel}
          </p>
          <div className="space-y-0.5">
            {stats.artists.map(a => (
              <div key={a.id} className="flex items-center justify-between text-xs py-0.5">
                <span className="text-text-secondary truncate mr-2">{a.name}</span>
                <span className="text-text-tertiary shrink-0">
                  {a.monthCount} · {fmtRev(a.monthRevenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : null;

  // ── Nav items ─────────────────────────────────────────────────────────────
  const navItems = [
    ...(!isStudio ? [{ path: '/dashboard',        label: 'Calendar',  icon: Calendar   }] : []),
    {                 path: '/clients',            label: 'Clients',   icon: Users      },
    ...(!isStudio ? [{ path: '/analytics',         label: 'Analytics', icon: BarChart3  }] : []),
    ...(isStudio  ? [{ path: '/studio/dashboard',  label: 'Studio',    icon: Building2  }] : []),
    {                 path: '/settings',           label: 'Settings',  icon: Settings   },
  ];

  const isActive = (path) => {
    if (path === '/clients')          return location.pathname.startsWith('/clients');
    if (path === '/studio/dashboard') return location.pathname.startsWith('/studio');
    return location.pathname === path;
  };

  const handleNav = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-bg-primary">

      {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 bg-bg-secondary border-r border-border-primary">

        {/* Logo */}
        <div
          className="p-6 border-b border-border-primary cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-accent-primary" />
            <span className="text-xl font-bold">InkFlow</span>
          </div>
          {artist?.name && (
            <div className="text-xs text-text-tertiary mt-2 truncate">{artist.name}</div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
                isActive(item.path)
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Stats panel */}
        {statsPanel}

        {/* Sign Out */}
        <div className="p-4 border-t border-border-primary">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-accent-danger hover:bg-bg-tertiary font-semibold transition"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ───────────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-bg-secondary border-b border-border-primary">
        <div className="flex items-center justify-between px-4 py-3">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Droplets className="w-6 h-6 text-accent-primary" />
            <span className="text-lg font-bold">InkFlow</span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-bg-tertiary rounded-lg transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-border-primary bg-bg-secondary">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
                    isActive(item.path)
                      ? 'bg-accent-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-accent-danger hover:bg-bg-tertiary font-semibold transition"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>

            {/* Stats panel in mobile menu */}
            {statsPanel}
          </div>
        )}
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-0 mt-14 lg:mt-0">
        {loadError ? (
          <div className="flex items-center justify-center min-h-screen p-6">
            <div className="bg-bg-secondary border border-accent-danger/30 rounded-xl p-8 max-w-md w-full text-center">
              <p className="text-accent-danger font-semibold mb-4">{loadError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Refresh Page
              </button>
            </div>
          </div>
        ) : !loaded ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

export default DashboardLayout;
