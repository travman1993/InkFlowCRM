import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, TrendingUp, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.png';

function DashboardLayout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Calendar', href: '/dashboard', icon: Calendar },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-bg-secondary border-b border-border-primary z-40">
        <div className="flex items-center justify-between p-4">
          <Link to="/dashboard">
            <img src={logo} alt="InkFlowCRM" className="h-8" />
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-bg-tertiary rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border-primary bg-bg-secondary">
            <nav className="p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive(item.href)
                        ? 'bg-accent-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-bg-secondary border-r border-border-primary">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-border-primary">
            <Link to="/dashboard">
              <img src={logo} alt="InkFlowCRM" className="h-10" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive(item.href)
                      ? 'bg-accent-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border-primary">
            <div className="px-4 py-3 bg-bg-primary rounded-lg">
              <div className="text-sm font-semibold">Solo Artist</div>
              <div className="text-xs text-text-tertiary mt-1">Free Trial - 14 days left</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;