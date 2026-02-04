import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function AftercareEmails() {
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
          The Complete Guide to Tattoo Aftercare Emails
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 28, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            7 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            Proper aftercare is crucial for tattoo healing and client satisfaction. Automated aftercare emails ensure every client gets consistent, professional guidance—without you having to remember to send them manually.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Aftercare Emails Matter</h2>
          <p className="text-text-secondary mb-6">
            When clients leave your chair, they're excited but also a bit overwhelmed. They might not remember everything you told them about aftercare. A detailed email they can reference helps:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Reduce healing complications</li>
            <li>Decrease panicked "Is this normal?" messages</li>
            <li>Show professionalism and attention to detail</li>
            <li>Build trust for future bookings</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Immediate Aftercare Email (Sent Same Day)</h2>
          <p className="text-text-secondary mb-6">
            Send this within 1-2 hours after the appointment. Include:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Subject Line:</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-4 mb-6">
            <p className="text-text-secondary">"Your New Tattoo Care Instructions - [Client Name]"</p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Email Body:</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">Hi [Client Name],</p>
            <p className="text-text-secondary mb-4">
              Thank you for trusting me with your new tattoo! Here's everything you need to know about caring for it:
            </p>
            <p className="text-text-secondary font-bold mb-2">First 24 Hours:</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-1">
              <li>Leave the bandage on for 2-4 hours (or overnight if applied in the evening)</li>
              <li>Wash hands before removing bandage</li>
              <li>Gently wash with antibacterial soap and lukewarm water</li>
              <li>Pat dry with a clean paper towel</li>
              <li>Apply a thin layer of [your preferred aftercare product]</li>
            </ul>
            <p className="text-text-secondary font-bold mb-2">Days 2-14:</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-1">
              <li>Wash 2-3 times daily</li>
              <li>Apply thin layer of aftercare product after each wash</li>
              <li>Do NOT pick, scratch, or peel</li>
              <li>Avoid direct sunlight, swimming, and soaking</li>
            </ul>
            <p className="text-text-secondary mb-4 font-bold">What's Normal:</p>
            <p className="text-text-secondary mb-4">
              Slight redness, warmth, and oozing of clear fluid/ink in the first 48 hours. Peeling and itching around day 3-7.
            </p>
            <p className="text-text-secondary mb-4 font-bold">When to Worry:</p>
            <p className="text-text-secondary mb-4">
              Excessive swelling, pus, fever, or spreading redness could indicate infection. Contact me immediately or see a doctor.
            </p>
            <p className="text-text-secondary mb-4">
              Questions? Reply to this email or text me at [your number].
            </p>
            <p className="text-text-secondary">- [Your Name]</p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The 2-Day Check-In Email</h2>
          <p className="text-text-secondary mb-6">
            This shows you care and catches issues early:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">Subject: "How's your tattoo healing?"</p>
            <p className="text-text-secondary mb-4">Hi [Client Name],</p>
            <p className="text-text-secondary mb-4">
              Just checking in! How's your new ink feeling? Any questions or concerns about healing?
            </p>
            <p className="text-text-secondary mb-4">
              Remember: some redness, tenderness, and ink seeping is totally normal in the first few days. By now you might be starting to see some peeling—don't pick!
            </p>
            <p className="text-text-secondary">
              Hit reply if anything feels off. Otherwise, can't wait to see how it's healing!
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The 7-Day Rebook Reminder</h2>
          <p className="text-text-secondary mb-6">
            Strike while the iron is hot. Most clients who want more ink will book within 2 weeks:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">Subject: "Ready for your next piece?"</p>
            <p className="text-text-secondary mb-4">Hey [Client Name],</p>
            <p className="text-text-secondary mb-4">
              Hope your tattoo is healing beautifully! I'm booking out [X weeks/months] right now and wanted to give you first dibs on my schedule.
            </p>
            <p className="text-text-secondary mb-4">
              Got any other ideas you want to bring to life? Let's make it happen!
            </p>
            <p className="text-text-secondary">
              [Link to booking calendar or "Reply to this email to schedule"]
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Pro Tips for Aftercare Emails</h2>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>Include photos:</strong> Show examples of normal healing vs. infection</li>
            <li><strong>Link to products:</strong> Amazon affiliate links to your recommended aftercare</li>
            <li><strong>Be personal:</strong> Reference specific details from their session</li>
            <li><strong>Make it mobile-friendly:</strong> Most clients read emails on their phone</li>
            <li><strong>Automate it:</strong> Set up templates in your CRM to send automatically</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Aftercare emails aren't just helpful—they're a business tool. They reduce your workload, improve healing outcomes, and increase rebooking rates. Set them up once, and they work for you automatically with every client.
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

export default AftercareEmails;