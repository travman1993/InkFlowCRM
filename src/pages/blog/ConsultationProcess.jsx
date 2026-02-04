import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function ConsultationProcess() {
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
          Creating a Professional Consultation Process
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            December 28, 2025
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            7 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            First impressions matter. A structured consultation process shows professionalism, sets clear expectations, and dramatically increases your booking rate. Here's the proven framework that works.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Consultations Matter</h2>
          <p className="text-text-secondary mb-6">
            Many artists skip formal consultations and go straight to "send me a pic and I'll quote you." This creates:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Unclear expectations (client imagines one thing, you deliver another)</li>
            <li>Pricing disputes ("I thought it would be cheaper!")</li>
            <li>No-shows (less commitment without a face-to-face connection)</li>
            <li>Wasted time on clients who weren't serious</li>
          </ul>

          <p className="text-text-secondary mb-6">
            A good consultation process filters out tire-kickers and converts serious inquiries into booked appointments.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Three-Stage Process</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">Stage 1: Initial Inquiry (5 minutes)</h3>
          <p className="text-text-secondary mb-6">
            When someone reaches out via DM, text, or email:
          </p>

          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Your Response Template:</p>
            <p className="text-text-secondary italic mb-4">
              "Hey [Name]! Thanks for reaching out. I'd love to work with you on this piece. To give you an accurate quote and make sure we're on the same page, I do a quick (free/paid) consultation. Are you available for a 15-20 minute call/in-person meeting this week?"
            </p>
            <p className="text-text-secondary">
              <strong>Key elements:</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary mt-2 space-y-1">
              <li>Friendly, not salesy</li>
              <li>Sets expectation of a consultation</li>
              <li>Gives timeframe (15-20 min)</li>
              <li>Asks for commitment</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Stage 2: The Consultation (15-30 minutes)</h3>
          <p className="text-text-secondary mb-6">
            This is where the magic happens. Here's your consultation checklist:
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Consultation Agenda:</p>
            
            <p className="text-text-secondary font-bold mb-2">1. Build Rapport (3-5 min)</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-1">
              <li>Ask how they found you</li>
              <li>What drew them to your work</li>
              <li>Have they been tattooed before?</li>
            </ul>
            
            <p className="text-text-secondary font-bold mb-2">2. Understand Their Vision (5-10 min)</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-1">
              <li>"Walk me through what you're envisioning"</li>
              <li>Show reference photos (ask them to send ahead of time)</li>
              <li>Discuss style, size, placement</li>
              <li>Ask WHY they want this tattoo (emotional connection)</li>
            </ul>
            
            <p className="text-text-secondary font-bold mb-2">3. Set Realistic Expectations (5 min)</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-1">
              <li>Explain what's possible vs. what's not</li>
              <li>"That level of detail will require at least 6 hours"</li>
              <li>Discuss pain levels for that body part</li>
              <li>Timeline: "This will take 2-3 sessions"</li>
            </ul>
            
            <p className="text-text-secondary font-bold mb-2">4. Pricing & Logistics (3-5 min)</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-1">
              <li>Give an estimated price range</li>
              <li>Explain your deposit policy</li>
              <li>Discuss available dates</li>
              <li>Outline next steps</li>
            </ul>
            
            <p className="text-text-secondary font-bold mb-2">5. Answer Questions (2-5 min)</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-1">
              <li>"What questions do you have for me?"</li>
              <li>Address any concerns</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Stage 3: Booking & Deposit (5 minutes)</h3>
          <p className="text-text-secondary mb-6">
            If they're ready to book:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>"Great! Let's lock in your date. I require a $[X] non-refundable deposit to hold your spot. I take Venmo/CashApp/Zelle. Once I receive that, you're officially on my calendar and I'll start working on your design."</strong>
            </p>
            <p className="text-text-secondary mt-4">
              Send them:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-1">
              <li>Payment link</li>
              <li>Confirmation email with date, time, address</li>
              <li>Aftercare instructions (to review ahead of time)</li>
              <li>Consent form (if you use them)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">In-Person vs. Phone/Video Consultations</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">In-Person Consultations</h3>
          <p className="text-text-secondary mb-6">
            <strong>Pros:</strong>
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Stronger connection and trust</li>
            <li>Can assess actual placement on their body</li>
            <li>Higher booking conversion rate</li>
            <li>Clients can see your studio/vibe</li>
          </ul>
          <p className="text-text-secondary mb-6">
            <strong>Cons:</strong>
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Takes more time (travel for them, setup for you)</li>
            <li>Attracts some window shoppers</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Phone/Video Consultations</h3>
          <p className="text-text-secondary mb-6">
            <strong>Pros:</strong>
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>More efficient (can do multiple in one day)</li>
            <li>No-shows are less costly</li>
            <li>Easier for out-of-town clients</li>
          </ul>
          <p className="text-text-secondary mb-6">
            <strong>Cons:</strong>
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Slightly lower conversion rate</li>
            <li>Harder to assess placement/sizing</li>
          </ul>

          <p className="text-text-secondary mb-6">
            <strong>Recommendation:</strong> Offer both. Let clients choose based on their preference and distance.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Should You Charge for Consultations?</h2>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>Free Consultations:</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
              <li>Best for newer artists building clientele</li>
              <li>Attracts more inquiries</li>
              <li>Risk: time wasters</li>
            </ul>
            
            <p className="text-text-secondary mb-4 mt-4">
              <strong>Paid Consultations ($25-50):</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Filters out non-serious clients</li>
              <li>Compensates you for your time</li>
              <li>Fee usually applies toward deposit</li>
              <li>Best for in-demand artists</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Red Flags During Consultations</h2>
          <p className="text-text-secondary mb-6">
            Sometimes you need to politely decline a client. Watch for:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-3">
            <li>
              <strong>Price obsession:</strong> If they haggle excessively or want everything for cheap, they'll be difficult throughout.
            </li>
            <li>
              <strong>Unrealistic expectations:</strong> "I want a full sleeve but I can only sit for 2 hours and my budget is $200."
            </li>
            <li>
              <strong>Bad energy:</strong> Rude, dismissive, or disrespectful. Trust your gut.
            </li>
            <li>
              <strong>Under the influence:</strong> If they seem intoxicated, reschedule.
            </li>
            <li>
              <strong>Copying another artist's work:</strong> "I want this exact tattoo I found on Instagram."
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Scripts for Common Situations</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">When They Want a Quote Without a Consultation:</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary italic">
              "I totally get wanting a ballpark figure! Based on what you've described, I'd estimate [range]. But to give you an accurate quote and make sure we're aligned on vision, I'd love to do a quick consultation. That way we both feel confident moving forward. Sound good?"
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">When They're Not Ready to Book Yet:</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary italic">
              "No problem! Take your time. When you're ready, reach back out and we'll get you on the calendar. My books typically fill 4-6 weeks out, so just keep that in mind when you're planning."
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">When You Need to Say No:</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary italic">
              "I appreciate you thinking of me for this piece, but I don't think I'm the right artist for what you're looking for. I'd recommend [another artist/style] who specializes in [their request]. Best of luck with your tattoo!"
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Post-Consultation Follow-Up</h2>
          <p className="text-text-secondary mb-6">
            If they don't book immediately, follow up 24-48 hours later:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary italic">
              "Hey [Name], great talking with you yesterday! Just wanted to check in—do you have any other questions about the piece or process? I have a few spots still open for [month] if you want to lock something in."
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            A professional consultation process:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Increases booking conversion by 30-50%</li>
            <li>Reduces miscommunication and disputes</li>
            <li>Builds trust and professionalism</li>
            <li>Weeds out problem clients early</li>
          </ul>
          <p className="text-text-secondary mb-6">
            It takes an extra 20 minutes upfront, but saves hours of frustration later. Make consultations your standard process, not an optional add-on.
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

export default ConsultationProcess;