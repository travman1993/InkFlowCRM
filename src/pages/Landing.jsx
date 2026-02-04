import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Mail, 
  Check, 
  ArrowRight,
  Sparkles,
  BarChart3,
  Smartphone,
  Clock,
  Menu,
  X
} from 'lucide-react';

function Landing() {
  const [selectedPlan, setSelectedPlan] = useState('solo');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { number: '42,445', label: 'Tattoo Artists in the US' },
    { number: '$1.6B', label: 'Annual Industry Revenue' },
    { number: '24,000+', label: 'Tattoo Parlors Operating' },
    { number: '$3.55B', label: 'Projected Market by 2030' },
  ];

  const problems = [
    'Using notebooks and spreadsheets to track clients',
    'Missed appointments costing $50-150 per hour',
    'No centralized client history or tattoo records',
    'Poor follow-up systems losing repeat business',
    'Financial tracking chaos (taxes, expenses, commissions)',
    'Manual aftercare instructions',
    'Instagram DMs as a booking system'
  ];

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Smart Calendar',
      description: 'Monthly and day views with drag-and-drop scheduling. Never miss an appointment.',
      color: 'text-blue-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Client Database',
      description: 'Complete client profiles with tattoo history, photos, and notes in one place.',
      color: 'text-green-500'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Revenue Analytics',
      description: 'Track income, expenses, and supplies costs. Know exactly where you stand.',
      color: 'text-purple-500'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Automated Emails',
      description: 'Send aftercare instructions, healing check-ins, and rebook reminders automatically.',
      color: 'text-amber-500'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Studio Analytics',
      description: 'For studios: track performance by artist, manage commissions, and see studio-wide metrics.',
      color: 'text-red-500'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile-First',
      description: 'Built for your phone. Manage your business from anywhere, anytime.',
      color: 'text-cyan-500'
    }
  ];

  const soloFeatures = [
    'Smart calendar with appointment management',
    'Unlimited client profiles',
    'Tattoo history with image uploads',
    'Revenue tracking & analytics',
    'Automated aftercare emails',
    'Healing check-in emails (2-day)',
    'Rebook reminder emails (7-day)',
    'Financial dashboard',
    'Mobile-responsive design'
  ];

  const studioFeatures = [
    'Everything in Solo, plus:',
    'Multi-artist management',
    'Commission tracking (booth rent or %)',
    'Studio-wide analytics',
    'Performance leaderboards',
    'Role-based access control',
    'Centralized client database',
    'Revenue by artist reports',
    'Unlimited artists'
  ];

  const roadmap = [
    { phase: 'Q2 2026', items: ['Mobile app (iOS & Android)', 'SMS reminders', 'Digital consent forms'] },
    { phase: 'Q3 2026', items: ['Client self-booking portal', 'Google Calendar sync', 'Inventory tracking'] },
    { phase: 'Q4 2026', items: ['AI design suggestions', 'Payment processing', 'Review system'] },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-bg-primary/95 backdrop-blur-lg border-b border-border-primary z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-accent-primary" />
              <span className="text-xl font-bold">InkFlowCRM</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-text-secondary hover:text-text-primary transition">Features</a>
              <a href="#pricing" className="text-text-secondary hover:text-text-primary transition">Pricing</a>
              <a href="#roadmap" className="text-text-secondary hover:text-text-primary transition">Roadmap</a>
            </div>

            {/* Desktop CTA */}
            <Link 
              to="/dashboard" 
              className="hidden md:block px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-medium transition"
            >
              Try Dashboard
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border-primary">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#features" 
                  className="text-text-secondary hover:text-text-primary transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className="text-text-secondary hover:text-text-primary transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="#roadmap" 
                  className="text-text-secondary hover:text-text-primary transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Roadmap
                </a>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-medium transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Try Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-bg-secondary rounded-full mb-6 md:mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs md:text-sm text-text-secondary">Currently in development • Launching Q2 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-balance px-4">
            The Business Operating System for{' '}
            <span className="text-accent-primary">Tattoo Artists</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 md:mb-12 max-w-3xl mx-auto text-balance px-4">
            Replace notebooks, spreadsheets, and Instagram DMs with one unified platform for managing clients, 
            bookings, revenue, and automated follow-ups.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 px-4">
            <Link 
              to="/dashboard"
              className="px-6 md:px-8 py-3 md:py-4 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold text-base md:text-lg flex items-center justify-center gap-2 transition"
            >
              Start as Solo Artist
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link 
              to="/studio/dashboard"
              className="px-6 md:px-8 py-3 md:py-4 bg-bg-tertiary hover:bg-bg-secondary border border-border-primary rounded-lg font-semibold text-base md:text-lg transition"
            >
              Start as Studio
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent-primary mb-1 md:mb-2">{stat.number}</div>
                <div className="text-xs md:text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 md:py-20 px-4 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Sound Familiar?</h2>
            <p className="text-lg md:text-xl text-text-secondary">The problems every tattoo artist faces</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-bg-primary rounded-lg border border-border-primary">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <p className="text-sm md:text-base text-text-secondary">{problem}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-accent-primary/10 border border-accent-primary rounded-lg">
              <p className="text-base md:text-lg font-semibold text-accent-primary">InkFlowCRM solves all of this.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Everything You Need to Run Your Business</h2>
            <p className="text-lg md:text-xl text-text-secondary">Professional tools built specifically for tattoo artists</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-5 md:p-6 bg-bg-secondary rounded-xl border border-border-primary hover:border-accent-primary/50 transition group">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-bg-tertiary flex items-center justify-center mb-3 md:mb-4 ${feature.color} group-hover:scale-110 transition`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-20 px-4 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg md:text-xl text-text-secondary">Choose the plan that fits your business</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Solo Plan */}
            <div 
              className={`relative p-6 md:p-8 bg-bg-primary rounded-2xl border-2 transition cursor-pointer ${
                selectedPlan === 'solo' ? 'border-accent-primary' : 'border-border-primary'
              }`}
              onClick={() => setSelectedPlan('solo')}
            >
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Solo Artist</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl md:text-5xl font-bold">$29</span>
                  <span className="text-text-secondary ml-2">/month</span>
                </div>
                <p className="text-sm md:text-base text-text-secondary">Perfect for independent artists</p>
              </div>

              <ul className="space-y-3 mb-6 md:mb-8">
                {soloFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-accent-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/dashboard"
                className="block w-full py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold text-center transition"
              >
                Try Solo Dashboard
              </Link>
            </div>

            {/* Studio Plan */}
            <div 
              className={`relative p-6 md:p-8 bg-bg-primary rounded-2xl border-2 transition cursor-pointer ${
                selectedPlan === 'studio' ? 'border-accent-primary' : 'border-border-primary'
              }`}
              onClick={() => setSelectedPlan('studio')}
            >
              <div className="absolute -top-3 md:-top-4 right-6 md:right-8 px-3 md:px-4 py-1 bg-accent-primary rounded-full text-xs md:text-sm font-semibold">
                Most Popular
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Studio</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl md:text-5xl font-bold">$99</span>
                  <span className="text-text-secondary ml-2">/month</span>
                </div>
                <p className="text-sm md:text-base text-text-secondary">For multi-artist studios</p>
              </div>

              <ul className="space-y-3 mb-6 md:mb-8">
                {studioFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-accent-success flex-shrink-0 mt-0.5" />
                    <span className={`text-sm md:text-base ${
                      feature.startsWith('Everything') ? 'font-semibold text-text-primary' : 'text-text-secondary'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/studio/dashboard"
                className="block w-full py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold text-center transition"
              >
                Try Studio Dashboard
              </Link>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <p className="text-sm md:text-base text-text-secondary px-4">
              🎉 <span className="font-semibold text-text-primary">14-day free trial</span> • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">What's Coming Next</h2>
            <p className="text-lg md:text-xl text-text-secondary">We're just getting started. Here's what's on the horizon.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {roadmap.map((phase, index) => (
              <div key={index} className="p-5 md:p-6 bg-bg-secondary rounded-xl border border-border-primary">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent-primary" />
                  <span className="text-sm md:text-base font-semibold text-accent-primary">{phase.phase}</span>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-text-secondary">•</span>
                      <span className="text-sm md:text-base text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 bg-bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4">Ready to Transform Your Business?</h2>
          <p className="text-lg md:text-xl text-text-secondary mb-6 md:mb-8 px-4">
            Try the demo dashboards and see how InkFlowCRM can streamline your workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link 
              to="/dashboard"
              className="px-6 md:px-8 py-3 md:py-4 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold text-base md:text-lg flex items-center justify-center gap-2 transition"
            >
              Start as Solo Artist
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link 
              to="/studio/dashboard"
              className="px-6 md:px-8 py-3 md:py-4 bg-bg-primary hover:bg-bg-tertiary border border-border-primary rounded-lg font-semibold text-base md:text-lg transition"
            >
              Start as Studio
            </Link>
          </div>

          <p className="mt-6 md:mt-8 text-sm md:text-base text-text-tertiary">
            Made with 🖤 by artists, for artists
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-primary py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-accent-primary" />
                <span className="font-bold text-sm md:text-base">InkFlowCRM</span>
              </div>
              <p className="text-xs md:text-sm text-text-secondary">
                The business operating system for tattoo artists and studios.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Product</h4>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li><a href="#features" className="hover:text-text-primary transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-text-primary transition">Pricing</a></li>
                <li><a href="#roadmap" className="hover:text-text-primary transition">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Company</h4>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary transition">About</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Blog</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Legal</h4>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border-primary pt-6 md:pt-8 text-center text-xs md:text-sm text-text-tertiary">
            <p>© 2026 InkFlowCRM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;