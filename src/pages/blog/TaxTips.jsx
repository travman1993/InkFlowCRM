import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function TaxTips() {
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
          Tax Tips Every Tattoo Artist Should Know
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 15, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            10 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-accent-warning/10 border border-accent-warning rounded-lg p-6 mb-8">
            <p className="text-accent-warning font-bold mb-2">⚠️ Disclaimer</p>
            <p className="text-text-secondary">
              I'm not a CPA or tax professional. This is general guidance—always consult with a qualified tax advisor for your specific situation.
            </p>
          </div>

          <p className="text-xl text-text-secondary mb-8">
            As a tattoo artist, you're likely a 1099 contractor, which means Uncle Sam expects you to handle your own taxes. Here's what you need to track, deduct, and save to avoid headaches at tax time.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Understanding Your Tax Status</h2>
          <p className="text-text-secondary mb-6">
            Most tattoo artists are classified as independent contractors, not employees. This means:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>You receive 1099 forms (not W-2s)</li>
            <li>No taxes are withheld from your payments</li>
            <li>You're responsible for income tax AND self-employment tax (15.3%)</li>
            <li>You pay quarterly estimated taxes</li>
            <li>You can deduct business expenses</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Self-Employment Tax Shock</h2>
          <p className="text-text-secondary mb-6">
            Here's what surprises most new artists: the self-employment tax is 15.3% (Social Security + Medicare) ON TOP OF regular income tax.
          </p>
          <div className="bg-bg-secondary border border-accent-danger rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>Example:</strong> If you earn $50,000:
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Self-employment tax: ~$7,065</li>
              <li>Federal income tax (22% bracket): ~$6,000-8,000</li>
              <li>State tax (varies): $0-3,000</li>
              <li><strong>Total: $13,000-18,000 in taxes</strong></li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Golden Rule: Set Aside 25-30%</h2>
          <p className="text-text-secondary mb-6">
            Every time you get paid, immediately transfer 25-30% to a separate savings account for taxes. Treat this money as already spent.
          </p>
          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary">
              <strong>Simple system:</strong><br/>
              Got paid $1,000? Move $300 to your tax savings account immediately.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Deductible Business Expenses</h2>
          <p className="text-text-secondary mb-6">
            The silver lining of being self-employed: you can deduct legitimate business expenses. This lowers your taxable income.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Equipment & Supplies</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Tattoo machines, power supplies, foot pedals</li>
            <li>Needles, ink, caps, grips</li>
            <li>Gloves, barriers, cleaning supplies</li>
            <li>Aftercare products (if you provide them)</li>
            <li>Stencil printers, transfer paper</li>
            <li>Drawing tablets, iPad for designs</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Booth Rent & Space</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Booth rent or studio lease payments</li>
            <li>Utilities (if you pay them separately)</li>
            <li>Furniture for your station</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Professional Development</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Tattoo conventions and seminars</li>
            <li>Workshops and training courses</li>
            <li>Books, magazines, reference materials</li>
            <li>Online courses and certifications</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Marketing & Advertising</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Website hosting and domain</li>
            <li>Business cards and promotional materials</li>
            <li>Social media advertising</li>
            <li>Photography equipment for portfolio shots</li>
            <li>CRM software subscriptions</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Insurance & Licenses</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Liability insurance</li>
            <li>Health insurance premiums (if self-employed)</li>
            <li>Business licenses and permits</li>
            <li>Bloodborne pathogen certifications</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Transportation</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Mileage to/from client consultations</li>
            <li>Trips to conventions or guest spots</li>
            <li>Supply store runs</li>
            <li><strong>Track every mile!</strong> Use an app like MileIQ or QuickBooks</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Home Office (If Applicable)</h3>
          <p className="text-text-secondary mb-6">
            If you use part of your home exclusively for business (design work, admin), you can deduct:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Percentage of rent/mortgage</li>
            <li>Percentage of utilities</li>
            <li>Internet (if used for business)</li>
          </ul>
          <p className="text-text-secondary mb-6">
            <strong>Note:</strong> The space must be used EXCLUSIVELY for business. Your bedroom doesn't count unless you have a dedicated office corner.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Quarterly Estimated Taxes</h2>
          <p className="text-text-secondary mb-6">
            If you expect to owe $1,000+ in taxes, you must pay quarterly. Deadlines are:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>Q1:</strong> April 15</li>
            <li><strong>Q2:</strong> June 15</li>
            <li><strong>Q3:</strong> September 15</li>
            <li><strong>Q4:</strong> January 15 (next year)</li>
          </ul>
          <p className="text-text-secondary mb-6">
            Pay online at IRS.gov/payments. Missing payments results in penalties and interest.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Record-Keeping Best Practices</h2>
          <p className="text-text-secondary mb-6">
            The IRS can audit you up to 3 years back (longer for fraud). Keep records:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">What to Save:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>All receipts (digital or physical)</li>
            <li>Bank and credit card statements</li>
            <li>1099 forms from clients/studios</li>
            <li>Mileage logs</li>
            <li>Invoices and payment records</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">How to Organize:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Use accounting software (QuickBooks, FreshBooks, Wave)</li>
            <li>Take photos of receipts immediately</li>
            <li>Separate business and personal expenses (get a business credit card)</li>
            <li>Categorize expenses as you go (don't wait until tax time)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Common Tax Mistakes Artists Make</h2>
          <div className="bg-bg-secondary border border-accent-danger rounded-lg p-6 mb-6">
            <ul className="list-disc pl-6 text-text-secondary space-y-3">
              <li>
                <strong>Not tracking cash tips:</strong> ALL income is taxable, including cash and Venmo.
              </li>
              <li>
                <strong>Mixing personal and business expenses:</strong> Get a separate business bank account and credit card.
              </li>
              <li>
                <strong>Deducting personal expenses:</strong> That new TV isn't a business expense just because you watch tattoo videos on it.
              </li>
              <li>
                <strong>Not paying quarterly:</strong> Waiting until April results in penalties.
              </li>
              <li>
                <strong>Losing receipts:</strong> No receipt = no deduction.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Should You Form an LLC or S-Corp?</h2>
          <p className="text-text-secondary mb-6">
            Many artists operate as sole proprietors. As you grow, consider:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>LLC:</strong> Liability protection, easier taxes (pass-through)</li>
            <li><strong>S-Corp:</strong> Potential tax savings if earning $60K+, but more paperwork</li>
          </ul>
          <p className="text-text-secondary mb-6">
            Consult a CPA to see if it makes sense for you.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">When to Hire a Tax Professional</h2>
          <p className="text-text-secondary mb-6">
            DIY tax software (TurboTax, H&R Block) works for simple returns. Hire a CPA if:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>You're earning $50K+/year</li>
            <li>You have complex deductions (home office, vehicle, etc.)</li>
            <li>You're considering LLC/S-Corp status</li>
            <li>You've been audited or owe back taxes</li>
            <li>You want strategic tax planning, not just filing</li>
          </ul>
          <p className="text-text-secondary mb-6">
            A good CPA costs $300-1,000 but can save you much more in deductions and peace of mind.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Taxes suck, but they're part of the game. The artists who succeed long-term:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Set aside 25-30% of every payment</li>
            <li>Track EVERYTHING</li>
            <li>Pay quarterly to avoid penalties</li>
            <li>Maximize deductions legally</li>
            <li>Work with a CPA once they're earning consistently</li>
          </ul>
          <p className="text-text-secondary mb-6">
            Don't let tax stress kill your passion. Set up good systems early, and it becomes just another part of running your business.
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

export default TaxTips;