import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function SupplyCosts() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-semibold rounded-full">
            Finance
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Supply Cost Tracking: Why Every Dollar Matters
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 1, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            5 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            Needles, ink, gloves, and aftercare supplies add up fast. Most artists have no idea they're losing hundreds of dollars a month. Here's how tracking your supply costs can reveal where you're bleeding money—and how to fix it.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Hidden Cost Problem</h2>
          <p className="text-text-secondary mb-6">
            You charge $500 for a tattoo. You think you're making $500. But did you account for:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>$8 in needles</li>
            <li>$12 in ink</li>
            <li>$5 in gloves and barriers</li>
            <li>$3 in aftercare</li>
            <li>$2 in stencil supplies</li>
          </ul>
          <p className="text-text-secondary mb-6">
            <strong>That's $30 in supplies.</strong> Your actual profit is $470, not $500. Do 100 tattoos a year? You just found $3,000 you didn't know about.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Average Supply Costs Per Tattoo</h2>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Typical Breakdown:</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li><strong>Small tattoo (1-2 hours):</strong> $15-25</li>
              <li><strong>Medium tattoo (3-5 hours):</strong> $25-45</li>
              <li><strong>Large tattoo (6+ hours):</strong> $45-75</li>
              <li><strong>Color work:</strong> Add 30-50% more for ink costs</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">What to Track</h2>
          <p className="text-text-secondary mb-6">
            Track these categories for every tattoo:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">1. Needles</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Cartridges or traditional needles</li>
            <li>How many you used</li>
            <li>Cost per needle</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">2. Ink</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Colors used</li>
            <li>Approximate amount (cap size x number of caps)</li>
            <li>Cost per bottle divided by usage</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">3. Disposables</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Gloves (usually 2-4 pairs per session)</li>
            <li>Barriers (clip cord covers, machine bags)</li>
            <li>Razors</li>
            <li>Paper towels / gauze</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">4. Aftercare</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Ointment or lotion samples you give clients</li>
            <li>Second Skin / Saniderm</li>
            <li>Instruction sheets (if printed)</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">5. Stencil Supplies</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Stencil paper</li>
            <li>Transfer solution</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">How to Track (The Easy Way)</h2>
          <p className="text-text-secondary mb-6">
            Don't overcomplicate this. Here are three methods:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Method 1: Flat Rate Estimate</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>Best for:</strong> Quick approximations, artists who hate tracking
            </p>
            <p className="text-text-secondary mb-4">
              Set a standard supply cost per hour:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Black and grey: $10-12/hour</li>
              <li>Color work: $15-18/hour</li>
            </ul>
            <p className="text-text-secondary mt-4">
              3-hour tattoo = $30-36 in supplies. Done.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Method 2: Post-Session Logging</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>Best for:</strong> More accuracy without being tedious
            </p>
            <p className="text-text-secondary mb-4">
              After each tattoo, take 60 seconds to jot down:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>"Used 4 needles ($8), 2 black caps ($4), typical disposables ($5) = $17"</li>
            </ul>
            <p className="text-text-secondary mt-4">
              Use a note in your phone or a simple spreadsheet.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Method 3: Automated CRM Tracking</h3>
          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>Best for:</strong> Data nerds and studio owners
            </p>
            <p className="text-text-secondary">
              Use a CRM (like InkFlowCRM 😉) that lets you input supply costs per tattoo and automatically calculates your true profit margin.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">What You'll Discover</h2>
          <p className="text-text-secondary mb-6">
            Once you track supplies for a month, patterns emerge:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Pattern 1: Color Work is Expensive</h3>
          <p className="text-text-secondary mb-6">
            You might find color tattoos cost 40-60% more in supplies but you're charging the same hourly rate. Solution: Adjust pricing or switch to more profitable styles.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Pattern 2: Small Tattoos Lose Money</h3>
          <p className="text-text-secondary mb-6">
            $50 tattoo with $15 in supplies + 30 minutes of your time = barely profitable. This is why shop minimums exist.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Pattern 3: You're Wasting Supplies</h3>
          <p className="text-text-secondary mb-6">
            Pouring too much ink, using more needles than necessary, or giving away expensive aftercare products to every client.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How to Reduce Supply Costs</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">1. Buy in Bulk</h3>
          <p className="text-text-secondary mb-6">
            Needles, gloves, and barriers are 20-40% cheaper when you buy boxes of 50-100 instead of packs of 10.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">2. Use Less Ink</h3>
          <p className="text-text-secondary mb-6">
            Most artists pour way more than they need. Start with smaller amounts and refill if necessary.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">3. Switch to Cartridges (If You Haven't)</h3>
          <p className="text-text-secondary mb-6">
            Cartridge needles cost slightly more upfront but save time on setup/breakdown, reducing overall hourly costs.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">4. Negotiate with Suppliers</h3>
          <p className="text-text-secondary mb-6">
            If you're a regular customer, ask for a discount. Suppliers would rather give you 10% off than lose you to a competitor.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">5. Stop Giving Away Premium Aftercare</h3>
          <p className="text-text-secondary mb-6">
            Saniderm costs $2-3 per piece. Offer it as an add-on for $10 instead of including it for free.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Factoring Supplies Into Pricing</h2>
          <p className="text-text-secondary mb-6">
            Your pricing formula should account for supplies:
          </p>
          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Pricing Formula:</p>
            <p className="text-text-secondary mb-2">
              <strong>Hourly Rate =</strong> (Your Desired Income/Hour) + (Overhead/Hour) + (Supply Cost/Hour)
            </p>
            <p className="text-text-secondary mt-4">
              Example:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Desired income: $50/hour</li>
              <li>Overhead (booth rent, etc.): $20/hour</li>
              <li>Supplies: $15/hour</li>
              <li><strong>Minimum rate: $85/hour</strong></li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">For Studio Owners: Track Studio-Wide</h2>
          <p className="text-text-secondary mb-6">
            If you provide supplies to your artists, tracking becomes even more critical:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Set monthly supply budgets per artist</li>
            <li>Track who's using excessive supplies</li>
            <li>Factor supply costs into commission splits</li>
            <li>Monitor inventory to prevent theft/waste</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Tax Benefit</h2>
          <p className="text-text-secondary mb-6">
            Every dollar you spend on supplies is a tax deduction. But you can only deduct what you track.
          </p>
          <div className="bg-accent-success/10 border border-accent-success rounded-lg p-6 mb-6">
            <p className="text-text-secondary">
              <strong>Example:</strong> If you spend $3,000/year on supplies and you're in the 25% tax bracket, tracking saves you $750 in taxes.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Supply costs are your most controllable expense. Artists who track them:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Price more accurately</li>
            <li>Identify waste</li>
            <li>Maximize tax deductions</li>
            <li>Make more profit per tattoo</li>
          </ul>
          <p className="text-text-secondary mb-6">
            It takes 5 minutes per week. The ROI is massive. Start tracking today.
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

export default SupplyCosts;