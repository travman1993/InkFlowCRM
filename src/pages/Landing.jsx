import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  Calendar,
  Users,
  Mail,
  Check,
  ArrowRight,
  BarChart3,
  Smartphone,
  Clock,
  Menu,
  X,
  Building2,
  Globe,
  Zap,
  DollarSign,
  TrendingUp,
  Target,
  RefreshCw,
  CheckCircle,
  Star,
  ChevronRight,
} from 'lucide-react';

function Landing() {
  const [selectedPlan, setSelectedPlan] = useState('solo');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Global market stats ────────────────────────────────────────────────────
  const marketStats = [
    { number: '150,000+', label: 'Tattoo professionals in English-speaking markets' },
    { number: '$3.5B+',   label: 'Annual global tattoo industry revenue'            },
    { number: '1 in 3',   label: 'Adults in the US & UK have at least one tattoo'   },
    { number: '$6.4B',    label: 'Projected global market value by 2030'            },
  ];

  // ── Countries served ────────────────────────────────────────────────────────
  const countries = [
    { flag: '🇺🇸', name: 'United States'  },
    { flag: '🇬🇧', name: 'United Kingdom' },
    { flag: '🇦🇺', name: 'Australia'      },
    { flag: '🇨🇦', name: 'Canada'         },
    { flag: '🇳🇿', name: 'New Zealand'    },
    { flag: '🇮🇪', name: 'Ireland'        },
    { flag: '🇿🇦', name: 'South Africa'   },
  ];

  // ── Pain points ─────────────────────────────────────────────────────────────
  const problems = [
    'Using notebooks and Instagram DMs to manage bookings',
    'No-shows costing $150–$250 per wasted appointment slot',
    'No centralized client history or tattoo records',
    'Zero follow-up system — clients disappear after one session',
    'Financial chaos at tax time (expenses, commissions, supplies)',
    'Manually typing aftercare instructions after every session',
    'No idea which months are your best or where your revenue goes',
    'New clients rarely become regulars because no one followed up',
  ];

  // ── Edge comparison ─────────────────────────────────────────────────────────
  const edgeComparison = [
    {
      without: 'Clients walk out and never hear from you again',
      with:    '5-email automated sequence goes out over 38 days — zero effort from you',
    },
    {
      without: 'No-shows cost $150–$250 with no warning and no record',
      with:    'Calendar shows every booking so you can follow up before they ghost',
    },
    {
      without: 'Tax season means digging through bank statements and receipts',
      with:    'Revenue dashboard tracks every dollar in real time, year-round',
    },
    {
      without: 'Guessing which months are your busiest and most profitable',
      with:    'Analytics show peak months, top clients, and your best-earning work',
    },
    {
      without: 'Client history lives in your memory — or gets forgotten entirely',
      with:    'Every profile has full tattoo history, uploaded photos, and notes',
    },
    {
      without: 'New clients rarely rebook because nobody reached back out',
      with:    'Rebooking nudges at Week 1, 3-week, and 5-week marks convert them to regulars',
    },
  ];

  // ── Feature categories (what you get today) ─────────────────────────────────
  const featureCategories = [
    {
      icon:  <Calendar className="w-6 h-6" />,
      color: 'text-blue-400',
      bg:    'bg-blue-400/10',
      title: 'Smart Scheduling',
      badge: null,
      items: [
        'Monthly calendar with full appointment overview',
        'Day-view drill-down for your busiest days',
        'One-click tattoo completion workflow',
        'Appointment status tracking (scheduled → completed)',
        'Client name, phone & notes on every booking',
      ],
    },
    {
      icon:  <Users className="w-6 h-6" />,
      color: 'text-green-400',
      bg:    'bg-green-400/10',
      title: 'Client Database',
      badge: null,
      items: [
        'Unlimited client profiles',
        'Full tattoo history with photo uploads',
        'Skin condition & allergy notes',
        'Lifetime visit & spend tracking',
        'Bulk import from CSV',
      ],
    },
    {
      icon:  <Mail className="w-6 h-6" />,
      color: 'text-amber-400',
      bg:    'bg-amber-400/10',
      title: 'Automated Follow-Up Emails',
      badge: 'Key Differentiator',
      items: [
        'Day 1: Aftercare instructions sent right after the session',
        'Day 3: Healing check-in with care reminders',
        'Day 10: "Ready for your next piece?" pitch',
        'Day 24: 3-week relationship touchpoint',
        'Day 38: Final rebooking nudge',
        'Personalized with client name, your name & studio',
        'Review before sending — one click to open email client',
      ],
    },
    {
      icon:  <BarChart3 className="w-6 h-6" />,
      color: 'text-purple-400',
      bg:    'bg-purple-400/10',
      title: 'Revenue & Analytics',
      badge: null,
      items: [
        'Real-time revenue dashboard',
        'Expense tracking by category',
        'Supplies cost logging',
        'Monthly & yearly breakdowns with charts',
        'Artist earnings calculations',
        'Sidebar quick-stats (month + year at a glance)',
      ],
    },
    {
      icon:  <Building2 className="w-6 h-6" />,
      color: 'text-red-400',
      bg:    'bg-red-400/10',
      title: 'Studio Management',
      badge: 'Studio Plan',
      items: [
        'Unlimited artist roster',
        'Commission tracking (booth rent or percentage)',
        'Per-artist performance analytics',
        'Studio-wide revenue overview',
        'Multi-artist scheduling calendar',
        'Revenue by artist reporting',
      ],
    },
    {
      icon:  <Smartphone className="w-6 h-6" />,
      color: 'text-cyan-400',
      bg:    'bg-cyan-400/10',
      title: 'Mobile-First Design',
      badge: null,
      items: [
        'Fully responsive on any phone or tablet',
        'No app download required — works in your browser',
        'Fast and lightweight on mobile data',
        'Optimized touch targets for in-studio use',
      ],
    },
  ];

  // ── Impact stats ────────────────────────────────────────────────────────────
  const impactStats = [
    {
      number: '68%',
      label:  'of tattooed adults plan to get more ink',
      sub:    'They just need the right follow-up to book with you again.',
      icon:   <RefreshCw className="w-5 h-5" />,
      color:  'text-amber-400',
    },
    {
      number: '$250',
      label:  'lost per no-show appointment',
      sub:    'A calendar + reminder system keeps your day full and earning.',
      icon:   <DollarSign className="w-5 h-5" />,
      color:  'text-red-400',
    },
    {
      number: '5',
      label:  'automated emails per client',
      sub:    'Sent over 38 days — zero effort from you after the session.',
      icon:   <Mail className="w-5 h-5" />,
      color:  'text-blue-400',
    },
    {
      number: '3×',
      label:  'more repeat bookings with follow-ups',
      sub:    'Consistent follow-up is how top artists build loyal client bases.',
      icon:   <TrendingUp className="w-5 h-5" />,
      color:  'text-green-400',
    },
  ];

  // ── Pricing plans ───────────────────────────────────────────────────────────
  const soloFeatures = [
    'Smart calendar & appointment management',
    'Unlimited client profiles',
    'Tattoo history with image uploads',
    'Revenue, expense & supply tracking',
    '5-touch automated follow-up email system',
    'Aftercare, healing & rebooking emails',
    'Touchpoints at Day 1, 3, 10, 24 & 38',
    'Financial dashboard with charts',
    'Mobile-responsive design',
    'Sidebar quick-stats (month + year revenue)',
  ];

  const studioFeatures = [
    'Everything in Solo, plus:',
    'Unlimited artist roster',
    'Commission tracking (booth rent or %)',
    'Per-artist performance analytics',
    'Studio-wide revenue dashboard',
    'Multi-artist scheduling calendar',
    'Studio sidebar revenue quick-stats',
    'Revenue by artist reporting',
  ];

  // ── Roadmap ─────────────────────────────────────────────────────────────────
  const roadmap = [
    {
      phase:  'Available Now',
      status: 'live',
      items: [
        'Smart appointment calendar',
        'Unlimited client database',
        'Tattoo records with photos',
        'Revenue & expense tracking',
        'Automated 5-touch follow-up emails',
        'Studio multi-artist management',
        'Revenue analytics & reporting',
      ],
    },
    {
      phase:  'Late 2026',
      status: 'soon',
      items: [
        'Mobile app (iOS & Android)',
        'SMS appointment reminders',
        'Digital consent & waiver forms',
        'Stripe payment processing',
        'Appointment confirmation emails',
      ],
    },
    {
      phase:  '2027',
      status: 'planned',
      items: [
        'Client self-booking portal',
        'Google Calendar sync',
        'Supply & inventory tracking',
        'Staff scheduling',
        'Waitlist management',
      ],
    },
    {
      phase:  '2027+',
      status: 'future',
      items: [
        'AI design consultation tools',
        'Multi-location studio support',
        'Client review & rating system',
        'Custom branding options',
        'Advanced business intelligence',
      ],
    },
  ];

  const phaseStyle = {
    live:    { dot: 'bg-green-500 animate-pulse', text: 'text-green-400',       border: 'border-green-500/30'       },
    soon:    { dot: 'bg-accent-primary',           text: 'text-accent-primary',   border: 'border-accent-primary/30'  },
    planned: { dot: 'bg-purple-500',               text: 'text-purple-400',       border: 'border-purple-500/30'      },
    future:  { dot: 'bg-text-tertiary',            text: 'text-text-tertiary',    border: 'border-border-primary'     },
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full bg-bg-primary/95 backdrop-blur-lg border-b border-border-primary z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="InkFlowCRM" className="h-8 md:h-10" />
            </Link>

            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-text-secondary hover:text-text-primary transition">Features</a>
              <a href="#pricing"  className="text-text-secondary hover:text-text-primary transition">Pricing</a>
              <a href="#roadmap"  className="text-text-secondary hover:text-text-primary transition">Roadmap</a>
              <Link to="/blog"    className="text-text-secondary hover:text-text-primary transition">Blog</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login"  className="text-text-secondary hover:text-text-primary transition">Log In</Link>
              <Link to="/signup" className="px-4 py-2 bg-accent-primary hover:bg-teal-600 rounded-lg font-medium transition">
                Sign Up Free
              </Link>
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border-primary">
              <div className="flex flex-col space-y-4">
                {[
                  { href: '#features', label: 'Features',  anchor: true  },
                  { href: '#pricing',  label: 'Pricing',   anchor: true  },
                  { href: '#roadmap',  label: 'Roadmap',   anchor: true  },
                  { href: '/blog',     label: 'Blog',      anchor: false },
                  { href: '/login',    label: 'Log In',    anchor: false },
                ].map(item => item.anchor ? (
                  <a key={item.label} href={item.href}
                    className="text-text-secondary hover:text-text-primary transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >{item.label}</a>
                ) : (
                  <Link key={item.label} to={item.href}
                    className="text-text-secondary hover:text-text-primary transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >{item.label}</Link>
                ))}
                <Link to="/signup"
                  className="px-4 py-2 bg-accent-primary hover:bg-teal-600 rounded-lg font-medium transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-full mb-6 md:mb-8">
            <Globe className="w-3.5 h-3.5 text-accent-primary" />
            <span className="text-xs md:text-sm text-text-secondary">Now in Early Access · Available in 7 countries</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 px-4 leading-tight">
            The Business Operating System<br className="hidden md:block" /> for{' '}
            <span className="text-accent-primary">Tattoo Professionals</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Replace notebooks, spreadsheets, and Instagram DMs with one unified platform —
            built for independent artists and studios across the English-speaking world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 px-4">
            <Link to="/signup"
              className="px-6 md:px-8 py-3 md:py-4 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold text-base md:text-lg flex items-center justify-center gap-2 transition"
            >
              Start as Solo Artist
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link to="/studio/signup"
              className="px-6 md:px-8 py-3 md:py-4 bg-bg-tertiary hover:bg-bg-secondary border border-border-primary rounded-lg font-semibold text-base md:text-lg transition"
            >
              Start as Studio
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            {marketStats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent-primary mb-1 md:mb-2">{s.number}</div>
                <div className="text-xs md:text-sm text-text-secondary">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Countries ───────────────────────────────────────────────────────── */}
      <section className="py-8 md:py-12 px-4 bg-bg-secondary border-y border-border-primary">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs md:text-sm font-semibold text-text-tertiary uppercase tracking-widest mb-4 md:mb-5">
            Built for tattoo professionals in
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {countries.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-bg-primary border border-border-primary rounded-full text-sm md:text-base font-medium">
                <span>{c.flag}</span>
                <span className="text-text-secondary">{c.name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-tertiary mt-4 md:mt-5">
            One platform, one price — no matter where you're based.
          </p>
        </div>
      </section>

      {/* ── Problems ────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Sound Familiar?</h2>
            <p className="text-lg md:text-xl text-text-secondary">
              The headaches every tattoo professional deals with without the right tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-bg-secondary rounded-lg border border-border-primary">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <p className="text-sm md:text-base text-text-secondary">{p}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-accent-primary/10 border border-accent-primary rounded-lg">
              <p className="text-base md:text-lg font-semibold text-accent-primary">InkFlowCRM solves every one of these.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Your Edge ───────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 px-4 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Your Competitive Edge</h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              The top artists in every market have one thing in common: systems.
              Here's what changes when you run yours properly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-3 md:gap-6 mb-4">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-xs md:text-sm font-semibold text-red-400">
                  Without a System
                </span>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-accent-primary/10 border border-accent-primary/30 rounded-full text-xs md:text-sm font-semibold text-accent-primary">
                  With InkFlow
                </span>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              {edgeComparison.map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-bg-primary border border-red-500/20 rounded-lg">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </div>
                    <p className="text-xs md:text-sm text-text-secondary">{row.without}</p>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-bg-primary border border-accent-primary/20 rounded-lg">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs md:text-sm text-text-secondary">{row.with}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-semibold text-green-400 mb-4">
              <CheckCircle className="w-3.5 h-3.5" />
              Available Today — No Waiting
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Everything You Get, Right Now</h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              These tools are live and ready the moment you sign up.
              No setup fees, no onboarding calls.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {featureCategories.map((cat, i) => (
              <div key={i} className="p-5 md:p-6 bg-bg-secondary rounded-xl border border-border-primary hover:border-accent-primary/40 transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${cat.bg} flex items-center justify-center ${cat.color} group-hover:scale-110 transition`}>
                    {cat.icon}
                  </div>
                  {cat.badge && (
                    <span className="text-xs px-2 py-0.5 bg-accent-primary/20 border border-accent-primary/30 rounded-full text-accent-primary font-semibold shrink-0">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">{cat.title}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className={`w-3.5 h-3.5 ${cat.color} flex-shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Systems Win ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 bg-bg-secondary border-y border-border-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Systems Win</h2>
            <p className="text-text-secondary">The numbers that separate thriving artists from struggling ones</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {impactStats.map((s, i) => (
              <div key={i} className="text-center p-4 md:p-6 bg-bg-primary rounded-xl border border-border-primary">
                <div className={`inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-secondary ${s.color} mb-3`}>
                  {s.icon}
                </div>
                <div className={`text-3xl md:text-4xl font-bold ${s.color} mb-1`}>{s.number}</div>
                <div className="text-xs md:text-sm font-semibold text-text-primary mb-1">{s.label}</div>
                <div className="text-xs text-text-secondary">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg md:text-xl text-text-secondary">Same price worldwide. No hidden fees. No surprises.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Solo */}
            <div
              className={`relative p-6 md:p-8 bg-bg-secondary rounded-2xl border-2 transition cursor-pointer ${selectedPlan === 'solo' ? 'border-accent-primary' : 'border-border-primary'}`}
              onClick={() => setSelectedPlan('solo')}
            >
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Solo Artist</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl md:text-5xl font-bold">$29</span>
                  <span className="text-text-secondary ml-2">/month</span>
                </div>
                <p className="text-sm md:text-base text-text-secondary">For independent tattoo artists</p>
              </div>
              <ul className="space-y-3 mb-6 md:mb-8">
                {soloFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-accent-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block w-full py-3 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold text-center transition">
                Get Started Free
              </Link>
            </div>

            {/* Studio */}
            <div
              className={`relative p-6 md:p-8 bg-bg-secondary rounded-2xl border-2 transition cursor-pointer ${selectedPlan === 'studio' ? 'border-accent-primary' : 'border-border-primary'}`}
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
                <p className="text-sm md:text-base text-text-secondary">For multi-artist tattoo studios</p>
              </div>
              <ul className="space-y-3 mb-6 md:mb-8">
                {studioFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-accent-success flex-shrink-0 mt-0.5" />
                    <span className={`text-sm md:text-base ${f.startsWith('Everything') ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/studio/signup" className="block w-full py-3 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold text-center transition">
                Get Started Free
              </Link>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <p className="text-sm md:text-base text-text-secondary px-4">
              🎉 <span className="font-semibold text-text-primary">14-day free trial</span> · No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ── Roadmap ─────────────────────────────────────────────────────────── */}
      <section id="roadmap" className="py-12 md:py-20 px-4 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">We're Just Getting Started</h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              InkFlowCRM is growing fast. Here's what's live today and the roadmap ahead.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
            {roadmap.map((phase, i) => {
              const s = phaseStyle[phase.status];
              return (
                <div key={i} className={`p-5 md:p-6 bg-bg-primary rounded-xl border ${s.border}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                    <span className={`text-sm font-bold ${s.text}`}>{phase.phase}</span>
                  </div>
                  {phase.status === 'live' && (
                    <p className="text-xs text-green-400/70 mb-3 ml-4">Ready to use right now</p>
                  )}
                  {phase.status !== 'live' && <div className="mb-3" />}
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        {phase.status === 'live'
                          ? <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                          : <ChevronRight className={`w-3.5 h-3.5 ${s.text} flex-shrink-0 mt-0.5`} />
                        }
                        <span className={phase.status === 'live' ? 'text-text-primary' : 'text-text-secondary'}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full text-sm font-semibold text-accent-primary mb-6 md:mb-8">
            <Zap className="w-4 h-4" />
            14-day free trial · No credit card required
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4 leading-tight">
            Your art is world-class.<br />
            <span className="text-accent-primary">Your business tools should be too.</span>
          </h2>

          <p className="text-lg md:text-xl text-text-secondary mb-8 md:mb-10 px-4 max-w-2xl mx-auto">
            Join tattoo professionals across the US, UK, Australia, Canada, and beyond
            who are building better businesses with InkFlowCRM.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link to="/signup"
              className="px-6 md:px-8 py-3 md:py-4 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold text-base md:text-lg flex items-center justify-center gap-2 transition"
            >
              Start as Solo Artist
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link to="/studio/signup"
              className="px-6 md:px-8 py-3 md:py-4 bg-bg-secondary hover:bg-bg-tertiary border border-border-primary rounded-lg font-semibold text-base md:text-lg transition"
            >
              Start as Studio
            </Link>
          </div>

          <p className="mt-6 md:mt-8 text-sm md:text-base text-text-tertiary">
            Made with 🖤 for tattoo professionals worldwide
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border-primary py-8 md:py-12 px-4 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <img src={logo} alt="InkFlowCRM" className="h-6 md:h-8" />
              </div>
              <p className="text-xs md:text-sm text-text-secondary">
                The business operating system for tattoo artists and studios worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Product</h4>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li><a href="#features" className="hover:text-text-primary transition">Features</a></li>
                <li><a href="#pricing"  className="hover:text-text-primary transition">Pricing</a></li>
                <li><a href="#roadmap"  className="hover:text-text-primary transition">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Company</h4>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li><Link to="/about"   className="hover:text-text-primary transition">About</Link></li>
                <li><Link to="/blog"    className="hover:text-text-primary transition">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-text-primary transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Legal</h4>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li><Link to="/privacy" className="hover:text-text-primary transition">Privacy</Link></li>
                <li><Link to="/terms"   className="hover:text-text-primary transition">Terms</Link></li>
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
