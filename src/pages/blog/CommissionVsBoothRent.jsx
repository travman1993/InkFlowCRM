import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function CommissionVsBoothRent() {
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
          Commission vs. Booth Rent: Which Model is Right for You?
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 22, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            6 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            Understanding the financial implications of commission versus booth rent can save you thousands of dollars annually. Let's break down both models with real numbers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Two Models Explained</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Commission Model</h3>
          <p className="text-text-secondary mb-6">
            The studio takes a percentage of every tattoo you do. Common splits are 50/50, 60/40, or 70/30 (artist/studio).
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-2">Example:</p>
            <p className="text-text-secondary">
              You do a $500 tattoo at a 60/40 shop<br/>
              You get: $300<br/>
              Shop gets: $200
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Booth Rent Model</h3>
          <p className="text-text-secondary mb-6">
            You pay a fixed weekly or monthly fee to use a station. Everything you earn above that is yours.
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-2">Example:</p>
            <p className="text-text-secondary">
              Booth rent: $300/week ($1,200/month)<br/>
              You do a $500 tattoo<br/>
              You keep: $500 (minus your rent)
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Math: When Does Each Model Win?</h2>
          <p className="text-text-secondary mb-6">
            Let's compare using a $1,200/month booth rent versus a 60/40 commission split:
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Monthly Revenue: $3,000</p>
            <p className="text-text-secondary mb-2">Commission (60/40): You keep $1,800</p>
            <p className="text-text-secondary mb-4">Booth Rent: You keep $1,800 ($3,000 - $1,200)</p>
            <p className="text-accent-primary"><strong>Break-even point</strong></p>
          </div>

          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Monthly Revenue: $5,000</p>
            <p className="text-text-secondary mb-2">Commission (60/40): You keep $3,000</p>
            <p className="text-text-secondary mb-4">Booth Rent: You keep $3,800 ($5,000 - $1,200)</p>
            <p className="text-accent-primary"><strong>Booth rent wins by $800/month</strong></p>
          </div>

          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Monthly Revenue: $2,000</p>
            <p className="text-text-secondary mb-2">Commission (60/40): You keep $1,200</p>
            <p className="text-text-secondary mb-4">Booth Rent: You keep $800 ($2,000 - $1,200)</p>
            <p className="text-accent-primary"><strong>Commission wins by $400/month</strong></p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Commission Model: Pros and Cons</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3 text-accent-success">Pros:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Lower financial risk—if you have a slow month, you pay less</li>
            <li>Shop typically provides supplies (ink, needles, gloves)</li>
            <li>No upfront costs if you don't work</li>
            <li>Better for newer artists with inconsistent bookings</li>
            <li>Shop handles marketing, front desk, cleaning</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 text-accent-danger">Cons:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>The more you earn, the more the shop takes</li>
            <li>No ceiling on what you pay the shop</li>
            <li>Less autonomy over pricing and policies</li>
            <li>Split can feel unfair when you're booked solid</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Booth Rent Model: Pros and Cons</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3 text-accent-success">Pros:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Keep 100% of what you earn (after fixed rent)</li>
            <li>More profitable when you're consistently busy</li>
            <li>Full control over your pricing, schedule, policies</li>
            <li>Incentivizes building your own clientele</li>
            <li>Predictable fixed cost</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 text-accent-danger">Cons:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Pay rent even if you have zero bookings</li>
            <li>Responsible for your own supplies</li>
            <li>May need to handle your own admin/marketing</li>
            <li>Higher pressure to stay booked</li>
            <li>Can lose money in slow months</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Who Should Choose Commission?</h2>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>New artists still building clientele</li>
            <li>Artists earning less than $3,000-4,000/month</li>
            <li>Those who want the shop to handle all overhead</li>
            <li>Artists who value predictable expenses</li>
            <li>Part-time tattooers with inconsistent schedules</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Who Should Choose Booth Rent?</h2>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Established artists with steady bookings</li>
            <li>Those earning $4,000+/month consistently</li>
            <li>Artists who want autonomy and control</li>
            <li>Self-motivated hustlers comfortable with risk</li>
            <li>Full-time professionals with loyal clientele</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Hybrid Models</h2>
          <p className="text-text-secondary mb-6">
            Some shops offer hybrid arrangements:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>Tiered commission:</strong> Higher percentage as you earn more</li>
            <li><strong>Commission with supplies included:</strong> Split but shop covers materials</li>
            <li><strong>Reduced booth rent + small commission:</strong> Lower fixed cost plus small %</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">For Studio Owners: Which Should You Offer?</h2>
          <p className="text-text-secondary mb-6">
            Consider your business goals:
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-4">
              <strong>Offer Commission If:</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
              <li>You want more control over artists' work/pricing</li>
              <li>You're providing extensive support (reception, marketing, supplies)</li>
              <li>You want steady income regardless of individual artist performance</li>
            </ul>
            
            <p className="text-text-secondary mb-4">
              <strong>Offer Booth Rent If:</strong>
            </p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>You want independent, self-sufficient artists</li>
              <li>You're providing minimal services (just space)</li>
              <li>You want predictable income and less management overhead</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            There's no universal "better" model. Run the numbers for YOUR situation:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Calculate your average monthly revenue</li>
            <li>Compare what you'd keep under each model</li>
            <li>Factor in your risk tolerance and career stage</li>
            <li>Consider non-financial factors (autonomy, support, etc.)</li>
          </ul>
          <p className="text-text-secondary mb-6">
            The right choice depends on where you are in your career and what trade-offs matter most to you.
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

export default CommissionVsBoothRent;