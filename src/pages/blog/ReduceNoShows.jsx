import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function ReduceNoShows() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-semibold rounded-full">
            Business Tips
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          5 Ways to Reduce No-Shows at Your Tattoo Studio
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            February 1, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            5 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            No-shows cost tattoo artists an average of $150 per missed appointment. When someone doesn't show up, you lose money on booth rent, supplies you prepped, and the opportunity to book another client. Here are five proven strategies to dramatically reduce cancellations.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Require Deposits for All Appointments</h2>
          <p className="text-text-secondary mb-6">
            This is the #1 most effective strategy. When clients have money on the line, they're far more likely to show up or give adequate notice if they need to cancel. A $50-100 non-refundable deposit (that goes toward the final cost) creates financial commitment.
          </p>
          <p className="text-text-secondary mb-6">
            <strong>Pro tip:</strong> Use Venmo, CashApp, or Zelle for instant deposits. Make it clear in your booking confirmation that deposits are non-refundable but transferable to future appointments within 30 days.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Send Automated Reminder Messages</h2>
          <p className="text-text-secondary mb-6">
            People are busy and genuinely forget. Send reminders at strategic intervals:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>1 week before: "Looking forward to seeing you next week!"</li>
            <li>48 hours before: "Your appointment is in 2 days"</li>
            <li>24 hours before: "See you tomorrow at [time]"</li>
          </ul>
          <p className="text-text-secondary mb-6">
            SMS reminders have a 98% open rate compared to 20% for emails. Use a service like Twilio or integrate reminders directly through your CRM.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Have a Clear Cancellation Policy</h2>
          <p className="text-text-secondary mb-6">
            Your policy should be visible everywhere: your website, Instagram bio, booking confirmation, and appointment reminders. Here's an example:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary italic">
              "We require 48 hours notice for cancellations. Same-day cancellations or no-shows forfeit the deposit. We understand emergencies happen—please communicate with us and we'll work with you."
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Build Relationships, Not Just Transactions</h2>
          <p className="text-text-secondary mb-6">
            Clients who feel connected to you are less likely to ghost. Take time during consultations to get to know them. Send a quick "How's it healing?" message a few days after their tattoo. Remember details about their lives.
          </p>
          <p className="text-text-secondary mb-6">
            When clients see you as a person (not just a service provider), they're more respectful of your time.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Track and Analyze Your No-Show Patterns</h2>
          <p className="text-text-secondary mb-6">
            Look at your data. Are certain days worse? Certain times? First-time clients vs. repeat clients? Young clients vs. older? Understanding patterns helps you adjust your strategy.
          </p>
          <p className="text-text-secondary mb-6">
            For example, if Monday morning appointments have higher no-show rates, consider requiring larger deposits for those slots or only booking established clients then.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Implementing just these five strategies can reduce no-shows by 60-80%. The key is consistency—make these part of your standard operating procedure, not something you do occasionally.
          </p>
          <p className="text-text-secondary mb-6">
            Your time is valuable. Protecting your schedule isn't rude—it's professional business practice.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border-primary">
          <Link to="/blog" className="inline-flex items-center gap-2 text-accent-primary hover:underline font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReduceNoShows;