import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import StudioDashboard from './pages/StudioDashboard';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Blog posts
import ReduceNoShows from './pages/blog/ReduceNoShows';
import AftercareEmails from './pages/blog/AftercareEmails';
import TattooPricing from './pages/blog/TattooPricing';
import CommissionVsBoothRent from './pages/blog/CommissionVsBoothRent';
import RepeatClients from './pages/blog/RepeatClients';
import TaxTips from './pages/blog/TaxTips';
import DifficultConversations from './pages/blog/DifficultConversations';
import InstagramGrowth from './pages/blog/InstagramGrowth';
import ManagingArtists from './pages/blog/ManagingArtists';
import SupplyCosts from './pages/blog/SupplyCosts';
import ConsultationProcess from './pages/blog/ConsultationProcess';
import EmailMarketing from './pages/blog/EmailMarketing';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studio/dashboard" element={<StudioDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Blog posts */}
        <Route path="/blog/reduce-no-shows" element={<ReduceNoShows />} />
        <Route path="/blog/aftercare-emails" element={<AftercareEmails />} />
        <Route path="/blog/tattoo-pricing" element={<TattooPricing />} />
        <Route path="/blog/commission-vs-booth-rent" element={<CommissionVsBoothRent />} />
        <Route path="/blog/repeat-clients" element={<RepeatClients />} />
        <Route path="/blog/tax-tips" element={<TaxTips />} />
        <Route path="/blog/difficult-conversations" element={<DifficultConversations />} />
        <Route path="/blog/instagram-growth" element={<InstagramGrowth />} />
        <Route path="/blog/managing-artists" element={<ManagingArtists />} />
        <Route path="/blog/supply-costs" element={<SupplyCosts />} />
        <Route path="/blog/consultation-process" element={<ConsultationProcess />} />
        <Route path="/blog/email-marketing" element={<EmailMarketing />} />
      </Routes>
    </Router>
  );
}

export default App;
