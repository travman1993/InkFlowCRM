import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function TattooPricing() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-semibold rounded-full">
            Pricing
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          How to Calculate Your True Tattoo Pricing
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 25, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            8 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            Are you charging enough? Most tattoo artists underprice their work, especially when they're starting out. Let's break down the real math behind tattoo pricing so you can earn what you deserve.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Problem with "Going Rate"</h2>
          <p className="text-text-secondary mb-6">
            Many artists set prices based on what others charge or what they think clients will pay. This is backwards. Your pricing should be based on YOUR costs, YOUR skill level, and YOUR financial goals—not someone else's business model.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Real Cost of Doing Business</h2>
          <p className="text-text-secondary mb-6">
            Before you can price profitably, you need to know your actual costs. Here's what to factor in:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Fixed Monthly Costs:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>Booth rent or studio lease:</strong> $800-2,500/month</li>
            <li><strong>Insurance:</strong> $50-150/month</li>
            <li><strong>Marketing/advertising:</strong> $100-500/month</li>
            <li><strong>Software subscriptions (CRM, design tools):</strong> $50-200/month</li>
            <li><strong>Licensing/permits:</strong> Varies by location</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Variable Costs (Per Tattoo):</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>Needles:</strong> $2-10</li>
            <li><strong>Ink:</strong> $5-20</li>
            <li><strong>Gloves, barriers, cleaning supplies:</strong> $3-8</li>
            <li><strong>Aftercare products:</strong> $2-5</li>
            <li><strong>Stencil paper, transfer solution:</strong> $1-3</li>
          </ul>

          <p className="text-text-secondary mb-6">
            <strong>Average per-tattoo supply cost:</strong> $15-45 depending on size and complexity
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Pricing Formula</h2>
          <p className="text-text-secondary mb-6">
            Here's a simple formula that ensures profitability:
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold text-lg mb-4">Hourly Rate Formula:</p>
            <p className="text-text-secondary mb-2">
              <strong>Step 1:</strong> Calculate your monthly overhead
            </p>
            <p className="text-text-secondary mb-4 pl-4">
              Example: $1,200 booth rent + $100 insurance + $200 marketing = $1,500/month
            </p>
            
            <p className="text-text-secondary mb-2">
              <strong>Step 2:</strong> Estimate billable hours
            </p>
            <p className="text-text-secondary mb-4 pl-4">
              Realistic: 20-30 hours/week = 80-120 hours/month<br/>
              (Not all your time is billable—consultations, admin, setup don't count)
            </p>
            
            <p className="text-text-secondary mb-2">
              <strong>Step 3:</strong> Calculate break-even rate
            </p>
            <p className="text-text-secondary mb-4 pl-4">
              $1,500 overhead ÷ 100 billable hours = $15/hour (just to break even!)
            </p>
            
            <p className="text-text-secondary mb-2">
              <strong>Step 4:</strong> Add your desired income
            </p>
            <p className="text-text-secondary mb-4 pl-4">
              Want to make $50,000/year? That's $4,166/month<br/>
              $4,166 ÷ 100 hours = $42/hour for yourself
            </p>
            
            <p className="text-text-secondary mb-2">
              <strong>Step 5:</strong> Factor in supplies
            </p>
            <p className="text-text-secondary mb-4 pl-4">
              Average $25 per tattoo in supplies = add $25/hour
            </p>
            
            <p className="text-accent-primary font-bold text-lg">
              Minimum Hourly Rate: $15 + $42 + $25 = $82/hour
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Adjusting for Experience Level</h2>
          <p className="text-text-secondary mb-6">
            Your base rate should increase with experience:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>Apprentice/New Artist (0-2 years):</strong> $80-100/hour</li>
            <li><strong>Intermediate Artist (2-5 years):</strong> $100-150/hour</li>
            <li><strong>Experienced Artist (5-10 years):</strong> $150-200/hour</li>
            <li><strong>Master Artist (10+ years):</strong> $200-300+/hour</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Shop Minimum Explained</h2>
          <p className="text-text-secondary mb-6">
            Small tattoos still require setup, breakdown, and prep time. A $50 shop minimum protects your time even on 15-minute pieces.
          </p>
          <p className="text-text-secondary mb-6">
            <strong>Example:</strong> If your hourly rate is $150 and a small tattoo takes 20 minutes, your shop minimum should be at least $75-100.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Flat Rate vs. Hourly</h2>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>Use Hourly Rates When:</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
              <li>Custom, complex designs</li>
              <li>Large pieces with uncertain timelines</li>
              <li>Clients who change their mind frequently</li>
            </ul>
            
            <p className="text-text-secondary mb-4">
              <strong>Use Flat Rates When:</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Simple, standard designs (flash)</li>
              <li>You can accurately predict time</li>
              <li>Client wants price certainty upfront</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Common Pricing Mistakes</h2>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-3">
            <li>
              <strong>Undervaluing your time:</strong> Remember, you're a skilled professional. Your expertise has value beyond just "time tattooing."
            </li>
            <li>
              <strong>Not tracking actual hours:</strong> That "quick 2-hour piece" probably took 3.5 hours with setup and cleanup.
            </li>
            <li>
              <strong>Giving too many "friend discounts":</strong> Occasional discounts are fine, but don't make it a habit.
            </li>
            <li>
              <strong>Racing to the bottom:</strong> Competing on price alone attracts price-shoppers, not loyal clients.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Communicating Your Prices</h2>
          <p className="text-text-secondary mb-6">
            Be confident. When a client asks your rates, don't apologize or justify. Simply state:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6 italic">
            <p className="text-text-secondary">
              "My rate is $150/hour with a $100 shop minimum. Based on your design, I estimate this will take about 3 hours, so around $450 total. I require a $100 non-refundable deposit to book."
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            If you're charging less than your calculated rate, you're leaving money on the table—or worse, losing money. Know your numbers, charge accordingly, and don't apologize for being a professional.
          </p>
          <p className="text-text-secondary mb-6">
            The artists who thrive long-term are the ones who treat tattooing as a business, not just an art form.
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

export default TattooPricing;