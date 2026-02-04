import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function RepeatClients() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-semibold rounded-full">
            Marketing
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Building a Repeat Client Base: The 7-Day Follow-Up System
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 18, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            5 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            The best clients are repeat clients. They know your work, trust your process, and refer their friends. Here's how to turn one-time customers into loyal collectors who come back year after year.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Repeat Clients Matter</h2>
          <p className="text-text-secondary mb-6">
            Acquiring a new client costs 5-7x more than retaining an existing one. Repeat clients:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Book faster (they already trust you)</li>
            <li>Pay more (they value your work)</li>
            <li>Refer more (they're your best marketers)</li>
            <li>Cancel less (they respect your time)</li>
            <li>Are easier to work with (established rapport)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The 7-Day Follow-Up System</h2>
          <p className="text-text-secondary mb-6">
            Most artists do zero follow-up after a tattoo. This simple system puts you ahead of 90% of your competition.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Day 0: Immediately After the Session</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>What to send:</strong> Aftercare instructions (email or text)
            </p>
            <p className="text-text-secondary mb-4">
              <strong>Why it works:</strong> Shows you care about healing, not just payment. Sets professional tone.
            </p>
            <p className="text-text-secondary italic">
              "Thanks for trusting me with your new ink! Here's your aftercare guide. Keep it handy and don't hesitate to reach out with questions."
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Day 2: Healing Check-In</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>What to send:</strong> Quick "How's it healing?" message
            </p>
            <p className="text-text-secondary mb-4">
              <strong>Why it works:</strong> Catches issues early, shows genuine care, opens conversation.
            </p>
            <p className="text-text-secondary italic">
              "Hey! Just checking in—how's your tattoo feeling? Any questions about the healing process?"
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Day 7: The Rebook Window</h3>
          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>What to send:</strong> Invitation to book next piece
            </p>
            <p className="text-text-secondary mb-4">
              <strong>Why it works:</strong> Strikes while enthusiasm is high. Most people who want more ink decide within 2 weeks.
            </p>
            <p className="text-text-secondary italic">
              "Your piece should be healing beautifully by now! Been thinking about your next tattoo? My books are open for [month]. Let's make it happen 🔥"
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Advanced Follow-Up Tactics</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">The Birthday Message</h3>
          <p className="text-text-secondary mb-6">
            Collect birthdays during consultations. Send a message on their birthday:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6 italic">
            <p className="text-text-secondary">
              "Happy Birthday [Name]! 🎉 Want to celebrate with some new ink? DM me and I'll throw in a discount for your special day."
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">The "Been A While" Check-In</h3>
          <p className="text-text-secondary mb-6">
            For clients you haven't heard from in 6+ months:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6 italic">
            <p className="text-text-secondary">
              "Hey [Name]! Been too long. How's your [mention their tattoo] looking? Ready to add to the collection?"
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">The Portfolio Feature</h3>
          <p className="text-text-secondary mb-6">
            When you post their healed tattoo on Instagram, tag them and send a personal message:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6 italic">
            <p className="text-text-secondary">
              "Just posted your piece—it healed amazing! Your next one is gonna look even better 😉"
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Automation vs. Personal Touch</h2>
          <p className="text-text-secondary mb-6">
            The key is balancing efficiency with authenticity:
          </p>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Automate These:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Day 0 aftercare instructions</li>
            <li>Day 2 healing check-in</li>
            <li>Day 7 rebook reminder</li>
            <li>Birthday messages</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Keep Personal:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Responses to their replies</li>
            <li>Portfolio feature messages</li>
            <li>"Been a while" check-ins</li>
            <li>Referral thank-yous</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Building a Client Database</h2>
          <p className="text-text-secondary mb-6">
            Track every client in a CRM or spreadsheet with:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Name, phone, email</li>
            <li>Birthday</li>
            <li>Tattoo details (what, where, when)</li>
            <li>Photos of their work</li>
            <li>Notes (style preferences, pain tolerance, life details)</li>
            <li>Last contact date</li>
            <li>Next follow-up date</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Referral Loop</h2>
          <p className="text-text-secondary mb-6">
            Happy repeat clients are referral machines. Make it easy:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>After their 2nd or 3rd tattoo:</strong>
            </p>
            <p className="text-text-secondary italic mb-4">
              "You've been amazing to work with! If you know anyone else who'd love my style, send them my way. I appreciate you!"
            </p>
            <p className="text-text-secondary">
              <strong>Optional incentive:</strong> "$50 off your next piece for every referral who books."
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Common Mistakes to Avoid</h2>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-3">
            <li>
              <strong>Being too salesy:</strong> "Ready to book?" feels pushy. "Been thinking about you!" feels genuine.
            </li>
            <li>
              <strong>Only reaching out to sell:</strong> Mix in non-sales touchpoints (healing check-ins, birthday wishes).
            </li>
            <li>
              <strong>Forgetting to track:</strong> You can't follow up if you don't know who to contact or when.
            </li>
            <li>
              <strong>Giving up after one try:</strong> People are busy. Send 2-3 messages over a few months.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Most artists focus 100% on getting new clients. The smart ones focus on keeping the ones they already have. A simple 7-day follow-up system can increase your repeat business by 40-60%.
          </p>
          <p className="text-text-secondary mb-6">
            Set it up once, automate what you can, and watch your calendar fill with familiar names instead of constantly chasing new leads.
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

export default RepeatClients;