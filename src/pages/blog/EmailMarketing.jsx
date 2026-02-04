import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function EmailMarketing() {
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
          The Power of Email Marketing for Tattoo Artists
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            December 25, 2025
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            6 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            Instagram reach is declining. The algorithm is unpredictable. Email marketing gives you direct access to your clients without fighting for visibility. Here's how to build and nurture your email list effectively.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Email Still Dominates</h2>
          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">The Numbers Don't Lie:</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li><strong>Instagram organic reach:</strong> 5-15% of your followers</li>
              <li><strong>Email open rates:</strong> 20-30% average (40-50% for tattoo artists with engaged lists)</li>
              <li><strong>Conversion rate:</strong> Email drives 3x more bookings than social media</li>
              <li><strong>You own your list:</strong> Instagram can ban you tomorrow. Your email list is yours forever.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Building Your Email List</h2>
          <p className="text-text-secondary mb-6">
            You can't email people who haven't given you permission. Here's how to grow your list:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">1. Collect Emails at Every Touchpoint</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-3">
            <li>
              <strong>During consultations:</strong> "Can I grab your email so I can send you booking confirmations and aftercare instructions?"
            </li>
            <li>
              <strong>At appointments:</strong> Have clients fill out a form with email included
            </li>
            <li>
              <strong>On your website:</strong> "Join my newsletter for booking updates and flash sales"
            </li>
            <li>
              <strong>Instagram bio:</strong> Link to a signup form
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">2. Offer an Incentive</h3>
          <p className="text-text-secondary mb-6">
            People need a reason to give you their email. Try:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>"Sign up for first access to open booking slots"</li>
            <li>"Get 10% off your next tattoo"</li>
            <li>"Exclusive flash designs sent to my email list first"</li>
            <li>"Free tattoo care guide (PDF)"</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">3. Make It Easy</h3>
          <p className="text-text-secondary mb-6">
            The fewer fields, the better. Just ask for:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>First name</li>
            <li>Email address</li>
          </ul>
          <p className="text-text-secondary mb-6">
            That's it. Don't ask for phone numbers, birthdates, or anything else unless you absolutely need it.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What to Send (Email Types)</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">1. The Welcome Email</h3>
          <p className="text-text-secondary mb-6">
            Sent immediately after someone subscribes. This has the highest open rate (60-80%).
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-2">Subject:</p>
            <p className="text-text-secondary italic mb-4">"Welcome! Here's what to expect from me"</p>
            
            <p className="text-text-secondary font-bold mb-2">Body:</p>
            <p className="text-text-secondary italic">
              "Hey [Name]!<br/><br/>
              Thanks for joining my email list! I'm [Your Name], and I specialize in [your style].<br/><br/>
              Here's what you can expect from me:<br/>
              - First access to open booking slots<br/>
              - Occasional flash designs<br/>
              - Tattoo care tips<br/><br/>
              My books are currently [open/closed]. If you're ready to get tattooed, reply to this email and let's chat!<br/><br/>
              - [Your Name]"
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">2. Monthly Newsletters</h3>
          <p className="text-text-secondary mb-6">
            Send once a month to stay top-of-mind. Include:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Recent work highlights (2-3 photos)</li>
            <li>Booking availability update</li>
            <li>Quick tip or story</li>
            <li>Call to action (book now, reply with ideas, etc.)</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">3. Booking Announcements</h3>
          <p className="text-text-secondary mb-6">
            When you open your books, email your list 24-48 hours BEFORE posting on Instagram.
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-2">Subject:</p>
            <p className="text-text-secondary italic mb-4">"My books are open! Here's how to get a spot"</p>
            
            <p className="text-text-secondary font-bold mb-2">Body:</p>
            <p className="text-text-secondary italic">
              "Hey!<br/><br/>
              Just opened my calendar for [Month]. I have [X] spots available and they typically fill within 48 hours.<br/><br/>
              If you've been thinking about getting tattooed, now's the time! Reply to this email with your idea and let's make it happen.<br/><br/>
              Spots are first-come, first-served.<br/><br/>
              Talk soon!<br/>
              [Your Name]"
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">4. Flash Sales</h3>
          <p className="text-text-secondary mb-6">
            Limited-time offers create urgency and drive bookings.
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-2">Example:</p>
            <p className="text-text-secondary italic">
              "Flash Friday! I have 3 walk-in spots tomorrow (Saturday) for small/medium pieces. $100/hour (normally $150). First 3 to reply get the slots!"
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">5. Re-Engagement Campaigns</h3>
          <p className="text-text-secondary mb-6">
            For clients who haven't booked in 6-12 months:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-2">Subject:</p>
            <p className="text-text-secondary italic mb-4">"Miss you! Ready for your next piece?"</p>
            
            <p className="text-text-secondary font-bold mb-2">Body:</p>
            <p className="text-text-secondary italic">
              "Hey [Name],<br/><br/>
              It's been a while since your last tattoo! I've been working on some new designs and thought of you.<br/><br/>
              Ready to add to your collection? I'd love to work with you again. Reply and let me know what you're thinking!<br/><br/>
              - [Your Name]"
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Email Frequency (How Often to Send)</h2>
          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Recommended Schedule:</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li><strong>Minimum:</strong> 1 email per month (stay relevant)</li>
              <li><strong>Optimal:</strong> 2-4 emails per month (newsletters + updates)</li>
              <li><strong>Maximum:</strong> 1 email per week (only if you have valuable content)</li>
            </ul>
            <p className="text-text-secondary mt-4">
              <strong>Rule of thumb:</strong> Only email when you have something worth saying. Quality over quantity.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Writing Emails That Convert</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">Subject Line Tips:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Keep it under 50 characters</li>
            <li>Create curiosity or urgency</li>
            <li>Use emojis sparingly (🔥 ⚡ 🎨)</li>
            <li>Personalize when possible: "Hey [Name], got a sec?"</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Body Copy Tips:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Write like you're texting a friend (casual, not corporate)</li>
            <li>Keep it short (200-300 words max)</li>
            <li>One clear call to action</li>
            <li>Include 1-2 images max (too many slow load times)</li>
            <li>End with a question or next step</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Tools to Use</h2>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>Email Service Providers (ESPs):</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li><strong>Mailchimp:</strong> Free up to 500 subscribers, easy to use</li>
              <li><strong>ConvertKit:</strong> Built for creators, great automation</li>
              <li><strong>Flodesk:</strong> Beautiful templates, flat $38/month pricing</li>
              <li><strong>InkFlowCRM:</strong> Built-in email automation for tattoo artists 😉</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Common Mistakes to Avoid</h2>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-3">
            <li>
              <strong>Buying email lists:</strong> Don't do it. It's illegal in many places and kills your sender reputation.
            </li>
            <li>
              <strong>No clear CTA:</strong> Every email should have ONE thing you want them to do (reply, book, click).
            </li>
            <li>
              <strong>Over-promoting:</strong> If every email is "BOOK NOW," people will unsubscribe. Mix in value (tips, stories).
            </li>
            <li>
              <strong>Ignoring mobile:</strong> 70% of emails are opened on phones. Keep it simple and scannable.
            </li>
            <li>
              <strong>No unsubscribe link:</strong> Legally required and actually helps (better to lose uninterested people).
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Tracking Success</h2>
          <p className="text-text-secondary mb-6">
            Monitor these metrics:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>Open rate:</strong> 20-30% is good, 40%+ is excellent</li>
            <li><strong>Click rate:</strong> 3-5% is average</li>
            <li><strong>Unsubscribe rate:</strong> Under 1% is healthy</li>
            <li><strong>Bookings generated:</strong> The ultimate metric</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Email marketing isn't sexy. It doesn't get likes or comments. But it:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Fills your calendar faster than social media</li>
            <li>Gives you direct access to your audience</li>
            <li>Builds long-term client relationships</li>
            <li>Can't be taken away by an algorithm change</li>
          </ul>
          <p className="text-text-secondary mb-6">
            Start collecting emails today. Send your first newsletter this week. Your future self will thank you when Instagram crashes or changes their algorithm again.
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

export default EmailMarketing;