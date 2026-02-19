import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import StudioDashboard from './pages/StudioDashboard';
import Clients from './pages/Clients';
import ClientDetail from './pages/ClientDetail';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudioSignup from './pages/StudioSignup';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Blog posts — lazy loaded so they don't bloat the main bundle
const ReduceNoShows = lazy(() => import('./pages/blog/ReduceNoShows'));
const AftercareEmails = lazy(() => import('./pages/blog/AftercareEmails'));
const TattooPricing = lazy(() => import('./pages/blog/TattooPricing'));
const CommissionVsBoothRent = lazy(() => import('./pages/blog/CommissionVsBoothRent'));
const RepeatClients = lazy(() => import('./pages/blog/RepeatClients'));
const TaxTips = lazy(() => import('./pages/blog/TaxTips'));
const DifficultConversations = lazy(() => import('./pages/blog/DifficultConversations'));
const InstagramGrowth = lazy(() => import('./pages/blog/InstagramGrowth'));
const ManagingArtists = lazy(() => import('./pages/blog/ManagingArtists'));
const SupplyCosts = lazy(() => import('./pages/blog/SupplyCosts'));
const ConsultationProcess = lazy(() => import('./pages/blog/ConsultationProcess'));
const EmailMarketing = lazy(() => import('./pages/blog/EmailMarketing'));

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studio/signup" element={<StudioSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/clients/:id" element={<ProtectedRoute><ClientDetail /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/studio/dashboard" element={<ProtectedRoute><StudioDashboard /></ProtectedRoute>} />

        {/* Blog posts — loaded on demand */}
        <Route path="/blog/reduce-no-shows" element={<Suspense fallback={null}><ReduceNoShows /></Suspense>} />
        <Route path="/blog/aftercare-emails" element={<Suspense fallback={null}><AftercareEmails /></Suspense>} />
        <Route path="/blog/tattoo-pricing" element={<Suspense fallback={null}><TattooPricing /></Suspense>} />
        <Route path="/blog/commission-vs-booth-rent" element={<Suspense fallback={null}><CommissionVsBoothRent /></Suspense>} />
        <Route path="/blog/repeat-clients" element={<Suspense fallback={null}><RepeatClients /></Suspense>} />
        <Route path="/blog/tax-tips" element={<Suspense fallback={null}><TaxTips /></Suspense>} />
        <Route path="/blog/difficult-conversations" element={<Suspense fallback={null}><DifficultConversations /></Suspense>} />
        <Route path="/blog/instagram-growth" element={<Suspense fallback={null}><InstagramGrowth /></Suspense>} />
        <Route path="/blog/managing-artists" element={<Suspense fallback={null}><ManagingArtists /></Suspense>} />
        <Route path="/blog/supply-costs" element={<Suspense fallback={null}><SupplyCosts /></Suspense>} />
        <Route path="/blog/consultation-process" element={<Suspense fallback={null}><ConsultationProcess /></Suspense>} />
        <Route path="/blog/email-marketing" element={<Suspense fallback={null}><EmailMarketing /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;