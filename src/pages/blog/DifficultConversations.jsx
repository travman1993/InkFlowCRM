import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function DifficultConversations() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-semibold rounded-full">
            Client Care
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          How to Handle Difficult Client Conversations
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 12, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            6 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            From pricing disputes to design changes, every artist faces challenging conversations. Here are proven scripts and strategies for maintaining professionalism while protecting your boundaries.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Pricing Negotiator</h2>
          <p className="text-text-secondary mb-6">
            <strong>The Situation:</strong> "That's too expensive. Can you do it for less?"
          </p>

          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-accent-danger font-bold mb-4">❌ Don't Say:</p>
            <p className="text-text-secondary italic mb-6">
              "Sorry, I guess I could do $200 instead of $300..."
            </p>
            <p className="text-text-secondary mb-4">
              <strong>Why it fails:</strong> Devalues your work, sets bad precedent, attracts price-shoppers.
            </p>
          </div>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-success font-bold mb-4">✅ Do Say:</p>
            <p className="text-text-secondary italic mb-6">
              "I understand budget is a consideration. My rates reflect my experience, quality, and the time required to do this right. If my pricing doesn't work for you right now, I totally get it—maybe we can connect when your budget allows. I don't negotiate on price, but I can work with you on design complexity or size to fit your budget better."
            </p>
            <p className="text-text-secondary">
              <strong>Why it works:</strong> Respectful, firm, offers alternatives without lowering your rate.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Endless Design Changer</h2>
          <p className="text-text-secondary mb-6">
            <strong>The Situation:</strong> Client keeps requesting major design revisions after you've already drawn it multiple times.
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-success font-bold mb-4">✅ Say This:</p>
            <p className="text-text-secondary italic mb-6">
              "I want to make sure you love this piece! I'm happy to make adjustments, but we've gone through several major revisions already. Moving forward, I'll need to charge a $50 design fee for additional complete redesigns to account for my time. Or we can simplify the concept to something we're both confident about. What works better for you?"
            </p>
            <p className="text-text-secondary">
              <strong>Key principle:</strong> Your design time has value. Set boundaries early (ideally in your booking process).
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Late/No-Show Who Wants to Reschedule</h2>
          <p className="text-text-secondary mb-6">
            <strong>The Situation:</strong> Client no-showed or cancelled last-minute and now wants to book again.
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-success font-bold mb-4">✅ Say This:</p>
            <p className="text-text-secondary italic mb-6">
              "Hey [Name], I understand life happens! To rebook, I'll need a $100 deposit (instead of my usual $50) to hold your spot. This protects my schedule since I held that time for you last time. Sound fair?"
            </p>
            <p className="text-text-secondary mb-4">
              <strong>Alternative (if they're repeat offenders):</strong>
            </p>
            <p className="text-text-secondary italic">
              "I appreciate you reaching out, but I need to prioritize clients who respect my time. I'm not able to book you again at this time. I wish you the best finding another artist."
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The "My Friend Does It Cheaper" Comparison</h2>
          <p className="text-text-secondary mb-6">
            <strong>The Situation:</strong> "My friend charges $100/hour. Why are you $150?"
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-success font-bold mb-4">✅ Say This:</p>
            <p className="text-text-secondary italic mb-6">
              "Every artist prices based on their experience, overhead, and the value they bring. If your friend is a better fit for your budget, I totally support you going with them! My rates reflect my [X years of experience / style / quality standards / etc.]. I'm confident in the work I deliver at this price point."
            </p>
            <p className="text-text-secondary">
              <strong>The mindset:</strong> You're not trying to win them over. You're qualifying whether they're YOUR client.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Unhappy Healed Tattoo</h2>
          <p className="text-text-secondary mb-6">
            <strong>The Situation:</strong> Client messages you upset about how their tattoo healed.
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-success font-bold mb-4">✅ Say This (Step 1 - Empathy):</p>
            <p className="text-text-secondary italic mb-6">
              "I'm sorry you're not happy with how it healed. I want you to love your tattoo! Can you send me some photos in good lighting so I can see what's going on?"
            </p>
            
            <p className="text-accent-success font-bold mb-4 mt-6">✅ Say This (Step 2 - After reviewing):</p>
            <p className="text-text-secondary mb-4">
              <strong>If it's a legitimate issue (blowout, bad line work, etc.):</strong>
            </p>
            <p className="text-text-secondary italic mb-4">
              "You're right, that didn't heal as cleanly as I'd like. Let's schedule a free touch-up session and I'll make it right."
            </p>
            
            <p className="text-text-secondary mb-4 mt-4">
              <strong>If it's normal healing (fading, peeling) or client error (sun exposure, picking):</strong>
            </p>
            <p className="text-text-secondary italic">
              "I see what you're describing. That's actually normal for [reason]. Tattoos go through a healing process that can make them look [lighter/patchy/etc] for a few weeks. Give it the full 4-6 weeks to settle, and if you still have concerns, I'm happy to do a touch-up at my normal hourly rate. In the meantime, make sure you're following the aftercare instructions I sent."
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Scope Creep During the Session</h2>
          <p className="text-text-secondary mb-6">
            <strong>The Situation:</strong> "Can we add this flower? And maybe extend it up my arm? And what about some shading here?"
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-success font-bold mb-4">✅ Say This:</p>
            <p className="text-text-secondary italic mb-6">
              "I love that you're excited! Adding those elements would be awesome, but it's going to add about 2 more hours to today's session. We agreed on [original quote], so the new total would be [new quote]. Want to go for it, or should we stick with the original plan and do those additions as a follow-up session?"
            </p>
            <p className="text-text-secondary">
              <strong>Key point:</strong> Always address scope changes BEFORE doing the extra work.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Refund Demander</h2>
          <p className="text-text-secondary mb-6">
            <strong>The Situation:</strong> "I want a refund because I'm not happy."
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-success font-bold mb-4">✅ Say This:</p>
            <p className="text-text-secondary italic mb-6">
              "I understand you're not satisfied. I don't offer refunds for completed work—that's outlined in the consent form you signed. However, I'm committed to making sure you're happy with the final result. I'd like to offer a complimentary touch-up session to address your concerns. Does that work for you?"
            </p>
            <p className="text-text-secondary mb-4">
              <strong>If they escalate or threaten legal action:</strong>
            </p>
            <p className="text-text-secondary italic">
              "I take your concerns seriously. If you'd like to pursue this further, please have your attorney contact me. Otherwise, I'm happy to schedule that touch-up."
            </p>
            <p className="text-text-secondary mt-4">
              <strong>Note:</strong> This is why consent forms and clear policies are essential.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">General Principles for Difficult Conversations</h2>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-3">
            <li>
              <strong>Stay calm:</strong> Never respond when you're emotional. Take 10 minutes (or 10 hours) to cool off.
            </li>
            <li>
              <strong>Validate their feelings:</strong> "I understand your frustration" goes a long way.
            </li>
            <li>
              <strong>Don't apologize for your policies:</strong> "Sorry, but..." weakens your position.
            </li>
            <li>
              <strong>Offer solutions, not excuses:</strong> Focus on what you CAN do, not why you can't.
            </li>
            <li>
              <strong>Know when to walk away:</strong> Not every client is worth keeping.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Phrases to Avoid</h2>
          <div className="bg-bg-secondary border border-accent-danger rounded-lg p-6 mb-6">
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>"I'm sorry you feel that way" (dismissive)</li>
              <li>"That's just how it is" (defensive)</li>
              <li>"You should have..." (blaming)</li>
              <li>"I don't know" (unprofessional)</li>
              <li>"Whatever" (combative)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Difficult conversations are part of running a business. The artists who handle them well:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Set clear expectations upfront (policies, consent forms, quotes)</li>
            <li>Stay calm and professional, even when clients aren't</li>
            <li>Offer solutions while maintaining boundaries</li>
            <li>Know their worth and don't apologize for it</li>
          </ul>
          <p className="text-text-secondary mb-6">
            You can be kind AND firm. You can be accommodating AND have boundaries. Practice these scripts, adapt them to your voice, and watch your confidence grow.
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

export default DifficultConversations;