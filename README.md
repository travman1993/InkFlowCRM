# InkFlowCRM
Client management, sales anylitics, marketing and workflow for individuals or artistist in the tattoo industry
# InkFlowCRM

> **The Business Operating System for Tattoo Artists & Studios**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

InkFlowCRM is a mobile-first SaaS platform built specifically for tattoo artists and studios to manage clients, bookings, revenue tracking, and automated client communication—all in one unified system.

---

## 🎯 The Problem

Tattoo artists are running businesses with:
- 📓 Notebooks and spreadsheets for client tracking
- 💸 No centralized financial tracking (taxes, supplies, commissions)
- 📱 Instagram DMs as a booking system
- ⏰ Missed appointments costing $50-150 per hour
- 🔄 No automated follow-ups for aftercare or rebookings
- 🎨 Lost client history and tattoo portfolios

**InkFlowCRM solves all of this.**

---

## ✨ Core Features

### For Solo Artists
- 📅 **Smart Calendar** - Monthly and day views with appointment management
- 👥 **Client Database** - Centralized client profiles with complete tattoo history
- 💰 **Revenue Analytics** - Track income, expenses, and supplies costs
- 📧 **Automated Emails** - Aftercare instructions, healing check-ins, rebook reminders
- 📊 **Financial Dashboard** - Daily/weekly/monthly revenue tracking

### For Studios
- 🏢 **Multi-Artist Management** - Manage multiple artists under one studio
- 💵 **Commission Tracking** - Automatic splits based on booth rent or commission models
- 📈 **Studio Analytics** - Performance leaderboards and revenue by artist
- 👔 **Role-Based Access** - Owners, admins, and artists with appropriate permissions
- 📧 **Centralized Client Database** - Studio-wide client management

### Coming Soon
- 📱 Mobile App (React Native/PWA)
- 🔔 SMS Reminders (Twilio integration)
- 📝 Digital Consent Forms
- 🤝 Client Self-Booking Portal
- 🎨 AI Design Suggestions
- 📦 Inventory Tracking (inks, needles, supplies)

---

## 🏗️ Tech Stack

### Frontend
- **React 18.3+** - UI framework
- **Vite 5.0+** - Build tool and dev server
- **Tailwind CSS 3.4+** - Utility-first styling
- **React Router v6** - Client-side routing
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **React Query** - Server state management
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

### Backend & Database
- **Supabase (PostgreSQL)** - Database, authentication, storage
- **Supabase Auth** - User authentication with JWT
- **Supabase Storage** - Tattoo image uploads
- **Row-Level Security** - Data isolation and permissions

### Third-Party Services
- **Stripe** - Subscription billing and payments
- **Resend** - Transactional and marketing emails
- **Vercel** - Frontend hosting and deployment
- **Sentry** (planned) - Error tracking and monitoring

---

## 📊 Market Opportunity

- **42,445** tattoo artists employed in the US (2024)
- **21,000-24,000** tattoo parlors operating in the US
- **$1.6 billion** annual US tattoo industry revenue
- **$3.55 billion** projected global market by 2030
- **No dominant CRM** specifically built for tattoo businesses

**Target Pricing:**
- Solo Artist: **$29/month**
- Studio: **$99/month**

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account (free tier available)
- Vercel account (optional, for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/InkFlowCRM.git
   cd InkFlowCRM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Set up Supabase database**
   
   Run the SQL schema in your Supabase project (see `docs/database-schema.sql`)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
InkFlowCRM/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base components (Button, Card, Input)
│   │   ├── layout/         # Layout components (Navbar, Sidebar)
│   │   ├── calendar/       # Calendar-specific components
│   │   ├── clients/        # Client management components
│   │   └── analytics/      # Analytics and charts
│   ├── pages/              # Page components (routes)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   ├── context/            # React context providers
│   └── styles/             # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
└── tests/                  # Test files
```

---

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts and authentication
- **studios** - Studio information and settings
- **artists** - Artist profiles and payment models
- **clients** - Client database with contact info
- **appointments** - Booking and scheduling
- **tattoos** - Tattoo records with images and pricing
- **transactions** - Financial tracking and payouts
- **email_automations** - Automated email scheduling
- **email_campaigns** - Marketing campaigns

See [Database Schema Documentation](docs/database-schema.md) for full details.

---

## 🛣️ Development Roadmap

### ✅ Phase 0: Setup (Week 1)
- [x] Project initialization
- [x] Supabase configuration
- [x] Deployment setup

### 🚧 Phase 1: Landing Page (Week 1)
- [ ] Hero section with value proposition
- [ ] Feature highlights
- [ ] Pricing tiers
- [ ] Statistics and social proof
- [ ] CTA buttons (Solo vs Studio)

### 📅 Phase 2: Solo Artist Dashboard (Weeks 2-3)
- [ ] Calendar system (month/day views)
- [ ] Client database and profiles
- [ ] Tattoo history tracking
- [ ] Finish tattoo workflow
- [ ] Basic revenue analytics

### 🏢 Phase 3: Studio Dashboard (Weeks 4-5)
- [ ] Multi-artist management
- [ ] Commission calculation logic
- [ ] Studio-wide analytics
- [ ] Role-based permissions
- [ ] Centralized client database

### 🔐 Phase 4: Authentication (Week 6)
- [ ] Email/password signup
- [ ] Login flow
- [ ] Row-level security policies
- [ ] Protected routes
- [ ] Password reset

### 📧 Phase 5: Email Automation (Week 7)
- [ ] Aftercare emails
- [ ] Healing check-ins (2-day)
- [ ] Rebook reminders (7-day)
- [ ] Editable templates
- [ ] Email scheduling system

### 📢 Phase 6: Marketing Features (Week 8)
- [ ] Mass email campaigns
- [ ] Client filtering
- [ ] Birthday reminders
- [ ] Social media sharing
- [ ] Campaign analytics

### 💳 Phase 7: Payment Integration (Week 9)
- [ ] Stripe Checkout
- [ ] Subscription management
- [ ] Customer portal
- [ ] Webhook handling
- [ ] Trial period logic

### 🎨 Phase 8: Polish & Optimization (Week 10)
- [ ] Performance optimization
- [ ] Error handling
- [ ] Mobile responsiveness
- [ ] Accessibility improvements
- [ ] Testing suite

### 🚀 Phase 9-10: Launch (Weeks 11-12)
- [ ] Beta testing
- [ ] Documentation
- [ ] Marketing materials
- [ ] Public launch
- [ ] Customer acquisition

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style (Prettier + ESLint)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep PRs focused on a single feature/fix

---

## 📈 Success Metrics

We're tracking:
- **Monthly Active Users (MAU)** - Target 80% of paying users
- **Monthly Recurring Revenue (MRR)** - Primary business metric
- **Customer Churn Rate** - Target <5% monthly
- **Feature Adoption** - Calendar, tattoo completion, email automation usage
- **Net Promoter Score (NPS)** - Customer satisfaction

---

## 🛡️ Security & Privacy

- ✅ Row-level security on all database tables
- ✅ Encrypted data at rest and in transit
- ✅ GDPR and CCPA compliant
- ✅ Regular security audits
- ✅ Secure authentication with JWT tokens
- ✅ No client data shared between accounts

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation:** [docs.inkflowcrm.com](https://docs.inkflowcrm.com) (coming soon)
- **Email:** support@inkflowcrm.com
- **Discord:** [Join our community](https://discord.gg/inkflowcrm) (coming soon)
- **Issues:** [GitHub Issues](https://github.com/yourusername/InkFlowCRM/issues)

---

## 🙏 Acknowledgments

Built with ❤️ for the tattoo community.

Special thanks to:
- The amazing tattoo artists who provided feedback and inspiration
- The open-source community for incredible tools and libraries
- Beta testers who helped shape the product

---

## 🔮 Vision

InkFlowCRM aims to be **the Shopify of tattoo businesses**—simple, powerful, and purpose-built for the industry. Our goal is to help every tattoo artist and studio run their business professionally while focusing on what they do best: creating art.

---

**Ready to transform your tattoo business?**

[Start Free Trial](https://inkflowcrm.com) | [View Demo](https://demo.inkflowcrm.com) | [Read the Docs](https://docs.inkflowcrm.com)

---

*Made with 🖤 by artists, for artists*

*Last Updated: February 2026*