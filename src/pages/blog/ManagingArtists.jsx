import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function ManagingArtists() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-semibold rounded-full">
            Studio Management
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Managing Multiple Artists: A Studio Owner's Playbook
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 5, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            8 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            Running a multi-artist studio comes with unique challenges—from scheduling conflicts to commission disputes. Here's how to keep everything running smoothly while keeping your artists happy and productive.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Three Core Challenges</h2>
          <p className="text-text-secondary mb-6">
            Every studio owner faces these recurring issues:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>Scheduling chaos:</strong> Double bookings, cancellations, station conflicts</li>
            <li><strong>Commission disputes:</strong> "Why did they get 60% and I only get 50%?"</li>
            <li><strong>Quality control:</strong> Maintaining studio standards across different artists</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Setting Up for Success: The Foundation</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">1. Crystal Clear Contracts</h3>
          <p className="text-text-secondary mb-6">
            Every artist should sign a contract that covers:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Commission split or booth rent amount</li>
            <li>Payment schedule (weekly, bi-weekly, monthly)</li>
            <li>What's included (supplies, receptionist, marketing)</li>
            <li>Station assignment and booking hours</li>
            <li>Termination clause (30-day notice standard)</li>
            <li>Non-compete clause (within X miles for X months)</li>
            <li>Social media/portfolio usage rights</li>
          </ul>

          <div className="bg-accent-warning/10 border border-accent-warning rounded-lg p-6 mb-6">
            <p className="text-accent-warning font-bold mb-2">⚠️ Legal Note:</p>
            <p className="text-text-secondary">
              Have a lawyer review your contracts. Each state has different rules about independent contractors vs. employees.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">2. Standardized Policies</h3>
          <p className="text-text-secondary mb-6">
            Create a studio manual that covers:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Booking procedures (deposits, cancellations)</li>
            <li>Client consultation process</li>
            <li>Aftercare instructions (everyone gives the same)</li>
            <li>Supply ordering and inventory</li>
            <li>Cleaning schedule and responsibilities</li>
            <li>Social media posting guidelines</li>
            <li>Conflict resolution process</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Scheduling System That Works</h2>
          <p className="text-text-secondary mb-6">
            Scheduling is where most studio drama starts. Here's how to prevent it:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Option 1: Assigned Days</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              Each artist gets specific days they're guaranteed to work:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Artist A: Tuesday, Thursday, Saturday</li>
              <li>Artist B: Monday, Wednesday, Friday</li>
              <li>Artist C: Wednesday, Friday, Sunday</li>
            </ul>
            <p className="text-text-secondary mt-4">
              <strong>Pros:</strong> Predictable, fewer conflicts<br/>
              <strong>Cons:</strong> Less flexibility
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Option 2: Station Assignments</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              Each artist has their own station and manages their own calendar:
            </p>
            <p className="text-text-secondary">
              <strong>Pros:</strong> Maximum flexibility, artists feel ownership<br/>
              <strong>Cons:</strong> Requires more stations (higher overhead)
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Option 3: Shared Calendar</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              Central booking system where artists claim available slots:
            </p>
            <p className="text-text-secondary">
              <strong>Pros:</strong> Efficient use of space<br/>
              <strong>Cons:</strong> Can create tension if popular slots get claimed fast
            </p>
          </div>

          <p className="text-text-secondary mb-6">
            <strong>Recommendation:</strong> Hybrid approach—assigned days with ability to swap if both parties agree.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Commission Structures That Are Fair</h2>
          <p className="text-text-secondary mb-6">
            Nothing breeds resentment faster than perceived unfair pay. Here's how to structure it:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Tiered Commission Based on Experience</h3>
          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li><strong>New Artists (0-2 years):</strong> 50/50 split</li>
              <li><strong>Intermediate (2-5 years):</strong> 60/40 split</li>
              <li><strong>Senior Artists (5+ years):</strong> 70/30 split or booth rent</li>
            </ul>
            <p className="text-text-secondary mt-4">
              This gives artists something to work toward and feels merit-based.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Volume Bonuses</h3>
          <p className="text-text-secondary mb-6">
            Reward artists who bring in more business:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary">
              "Hit $10K in monthly revenue and your split goes from 60/40 to 65/35 that month."
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Handling Common Conflicts</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">The Client Poacher</h3>
          <p className="text-text-secondary mb-6">
            <strong>Issue:</strong> Artist B tries to book Artist A's returning client.
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-4">Solution:</p>
            <p className="text-text-secondary mb-4">
              <strong>Policy:</strong> "Clients belong to the artist who did their first tattoo. Poaching results in forfeiting commission on that client permanently."
            </p>
            <p className="text-text-secondary">
              Exception: If client specifically requests a different artist, original artist gets first right of refusal.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">The Messy Station</h3>
          <p className="text-text-secondary mb-6">
            <strong>Issue:</strong> One artist consistently leaves their station a disaster.
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-4">Solution:</p>
            <p className="text-text-secondary">
              <strong>Strike system:</strong> First offense = warning. Second = $50 cleaning fee. Third = termination discussion.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">The No-Show Artist</h3>
          <p className="text-text-secondary mb-6">
            <strong>Issue:</strong> Artist frequently cancels or doesn't show up for their shifts.
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-4">Solution:</p>
            <p className="text-text-secondary">
              <strong>Policy:</strong> "Three no-shows or last-minute cancellations in a month = loss of guaranteed days or termination."
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">The Drama Starter</h3>
          <p className="text-text-secondary mb-6">
            <strong>Issue:</strong> Artist gossips, creates tension, or badmouths other artists.
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-4">Solution:</p>
            <p className="text-text-secondary">
              Private conversation: "The vibe in this studio matters to everyone's success. If you're not happy here, let's talk about whether this is the right fit."
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Quality Control Without Micromanaging</h2>
          <p className="text-text-secondary mb-6">
            You need standards, but you can't hover over everyone's shoulder. Here's the balance:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Set Minimum Standards:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>All artists must use proper sterilization procedures</li>
            <li>All clients must sign consent forms</li>
            <li>All artists must provide the same aftercare instructions</li>
            <li>Portfolio-worthy work only gets posted on studio account</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Monthly Portfolio Reviews:</h3>
          <p className="text-text-secondary mb-6">
            Sit down with each artist once a month to review their recent work. Frame it as mentorship, not criticism.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">When to Let Someone Go:</h3>
          <div className="bg-bg-secondary border border-accent-danger rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              If an artist is consistently:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Producing work that doesn't meet studio standards</li>
              <li>Creating drama that affects others</li>
              <li>Violating safety protocols</li>
              <li>Not paying their rent/commission on time</li>
              <li>Driving away clients with unprofessionalism</li>
            </ul>
            <p className="text-text-secondary mt-4">
              ...it's time to have the hard conversation. Your studio's reputation is on the line.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Communication Systems</h2>
          <p className="text-text-secondary mb-6">
            Most issues come from poor communication. Set up:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">1. Weekly Check-Ins</h3>
          <p className="text-text-secondary mb-6">
            10-minute one-on-ones with each artist to catch small issues before they become big ones.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">2. Monthly Studio Meetings</h3>
          <p className="text-text-secondary mb-6">
            Everyone together to discuss:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Schedule changes</li>
            <li>Supply needs</li>
            <li>Upcoming events (conventions, promotions)</li>
            <li>Any tensions or issues</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">3. Group Chat (Use Wisely)</h3>
          <p className="text-text-secondary mb-6">
            Group chats are great for quick coordination but terrible for conflict resolution. Keep it positive and logistical.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Building Studio Culture</h2>
          <p className="text-text-secondary mb-6">
            The best studios aren't just workspaces—they're communities:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Celebrate wins (big bookings, Instagram milestones)</li>
            <li>Host occasional social events (not forced, but available)</li>
            <li>Encourage mentorship between senior and junior artists</li>
            <li>Create a vibe that makes everyone want to show up</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Managing artists is like herding cats—creative, independent, opinionated cats. But with:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Clear contracts and policies</li>
            <li>Fair and transparent compensation</li>
            <li>Consistent communication</li>
            <li>Respect for their autonomy</li>
          </ul>
          <p className="text-text-secondary mb-6">
            You can build a studio where talented artists WANT to work—and stay.
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

export default ManagingArtists;