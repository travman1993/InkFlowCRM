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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, artist } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Calendar', icon: Calendar },
    { path: '/clients', label: 'Clients', icon: Users },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/clients') {
      return location.pathname.startsWith('/clients');
    }
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
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;