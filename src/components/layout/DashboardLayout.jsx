import { useState } from 'react';
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

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, artist } = useAuth();
  const { loaded, loadError } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isStudio = Boolean(artist?.studio_name);

  const navItems = [
    ...(!isStudio ? [{ path: '/dashboard', label: 'Calendar', icon: Calendar }] : []),
    { path: '/clients', label: 'Clients', icon: Users },
    ...(!isStudio ? [{ path: '/analytics', label: 'Analytics', icon: BarChart3 }] : []),
    ...(isStudio ? [{ path: '/studio/dashboard', label: 'Studio', icon: Building2 }] : []),
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/clients') return location.pathname.startsWith('/clients');
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
      {/* Desktop Sidebar */}
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
            <div className="text-xs text-text-tertiary mt-2 truncate">
              {artist.name}
            </div>
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

      {/* Mobile Header */}
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
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
          </div>
        )}
      </div>

      {/* Main Content */}
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