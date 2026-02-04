import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

function InstagramGrowth() {
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
          The Artist's Guide to Instagram Growth in 2026
        </h1>

        <div className="flex items-center gap-6 text-text-tertiary mb-8 pb-8 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 8, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            9 min read
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary mb-8">
            Instagram is still the #1 platform for tattoo artists to get discovered. But the algorithm has changed. Here's what actually works in 2026.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The 2026 Instagram Reality Check</h2>
          <p className="text-text-secondary mb-6">
            Let's be honest: organic reach is down. The algorithm prioritizes Reels over static posts. And you're competing with thousands of other artists. But don't panic—the fundamentals still work.
          </p>

          <div className="bg-accent-primary/10 border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Key Algorithm Changes in 2026:</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Reels get 3-5x more reach than static posts</li>
              <li>Carousel posts outperform single images</li>
              <li>Engagement rate matters more than follower count</li>
              <li>Saves and shares are weighted heavily</li>
              <li>Consistent posting (3-5x/week) beats sporadic posting</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Content Strategy: What to Post</h2>

          <h3 className="text-xl font-bold mt-6 mb-3">1. Finished Healed Work (30%)</h3>
          <p className="text-text-secondary mb-6">
            Your best portfolio pieces. High-quality photos in natural light. These establish your skill level.
          </p>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-2">Pro tip:</p>
            <p className="text-text-secondary">
              Ask clients to send healed photos after 4-6 weeks. Healed tattoos perform better than fresh because they show your true quality.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">2. Process Videos/Reels (40%)</h3>
          <p className="text-text-secondary mb-6">
            Time-lapses of you working. These get MASSIVE reach because they're mesmerizing.
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Speed up 10-20x</li>
            <li>Add trending audio (mute your video, layer in music)</li>
            <li>Keep it 15-30 seconds max</li>
            <li>Show the final result at the end</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">3. Before & After / Progress Shots (15%)</h3>
          <p className="text-text-secondary mb-6">
            Carousel posts showing: Stencil → Fresh → Healed. People love transformation content.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">4. Behind-the-Scenes / Personal (10%)</h3>
          <p className="text-text-secondary mb-6">
            You in your studio, your setup, your story. This builds connection and trust.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">5. Educational/Tips (5%)</h3>
          <p className="text-text-secondary mb-6">
            Aftercare advice, "What to expect," FAQs. High-value content that gets saved and shared.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Posting Frequency & Timing</h2>
          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Optimal Posting Schedule:</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li><strong>3-5 posts per week minimum</strong></li>
              <li><strong>1-2 Reels per week</strong> (these do the heavy lifting for reach)</li>
              <li><strong>Best times:</strong> 7-9am, 12-2pm, 7-9pm (when people are on their phones)</li>
              <li><strong>Best days:</strong> Tuesday-Friday</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Hashtag Strategy That Actually Works</h2>
          <p className="text-text-secondary mb-6">
            The old "30 hashtags" strategy is dead. Here's what works now:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Use 5-10 Strategic Hashtags:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>2-3 Large (500K+ posts):</strong> #tattoo #tattooed #inked</li>
            <li><strong>3-5 Medium (50K-500K):</strong> #blackwork #traditionaltattoo #floraltattoo</li>
            <li><strong>2-3 Niche (5K-50K):</strong> #nyctattooist #geometrictattoos #finelinetattoo</li>
          </ul>

          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary font-bold mb-2">Location Matters:</p>
            <p className="text-text-secondary">
              Always include your city/neighborhood hashtag: #brooklyntattoo #austintattooartist
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Caption Writing That Converts</h2>
          <p className="text-text-secondary mb-6">
            Your caption should do one of these things:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-3">
            <li>
              <strong>Tell the story:</strong> "Client wanted to honor her grandmother with this floral piece..."
            </li>
            <li>
              <strong>Ask a question:</strong> "Would you get this on your [body part]? 🤔"
            </li>
            <li>
              <strong>Share a tip:</strong> "Here's why I start with the darkest values first..."
            </li>
            <li>
              <strong>Create urgency:</strong> "Just opened 2 spots for March. DM to book."
            </li>
          </ul>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Caption Formula That Works:</p>
            <p className="text-text-secondary mb-2">Line 1: Hook (stop the scroll)</p>
            <p className="text-text-secondary mb-2">Lines 2-5: Story/context/details</p>
            <p className="text-text-secondary mb-2">Last line: Call to action</p>
            <p className="text-text-secondary mt-4 italic">
              Example:<br/>
              "This floral sleeve took 18 hours over 3 sessions 🌸<br/>
              Client wanted something feminine but bold—we went with high-contrast black and grey with subtle dotwork shading...<br/>
              DM me to start your custom sleeve project 📩"
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Engagement Tactics</h2>
          <p className="text-text-secondary mb-6">
            The algorithm rewards engagement. Here's how to get it:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">1. Reply to EVERY Comment</h3>
          <p className="text-text-secondary mb-6">
            Within the first hour especially. This signals to Instagram that your post is engaging.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">2. Ask Questions in Captions</h3>
          <p className="text-text-secondary mb-6">
            Questions = comments. "Where would you get this?" "Which design would you choose?"
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">3. Use Polls and Sliders in Stories</h3>
          <p className="text-text-secondary mb-6">
            Interactive stories get more views. "Which color palette?" "Rate this 1-10"
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">4. Tag Clients (With Permission)</h3>
          <p className="text-text-secondary mb-6">
            When they repost your work, it exposes you to their network.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Reels Strategy (The Growth Hack)</h2>
          <p className="text-text-secondary mb-6">
            Reels are your fastest path to new followers. Instagram is pushing them HARD.
          </p>

          <div className="bg-bg-secondary border border-accent-primary rounded-lg p-6 mb-6">
            <p className="text-accent-primary font-bold mb-4">Reel Formula:</p>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li><strong>0-3 seconds:</strong> Hook (text on screen or visual pop)</li>
              <li><strong>3-20 seconds:</strong> The actual content (your tattooing)</li>
              <li><strong>Final frame:</strong> Call to action ("Follow for more")</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Reel Ideas:</h3>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Time-lapse of full session</li>
            <li>"Day in the life" of a tattoo artist</li>
            <li>Stencil placement process</li>
            <li>"Watch this coverup transform"</li>
            <li>Your most intricate detail work (zoomed in)</li>
            <li>"POV: You're getting a [style] tattoo"</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">What NOT to Do</h2>
          <div className="bg-bg-secondary border border-accent-danger rounded-lg p-6 mb-6">
            <ul className="list-disc pl-6 text-text-secondary space-y-3">
              <li>
                <strong>Don't buy followers:</strong> Fake engagement kills your reach.
              </li>
              <li>
                <strong>Don't post inconsistently:</strong> The algorithm rewards consistency over perfection.
              </li>
              <li>
                <strong>Don't ignore DMs:</strong> That's where bookings happen.
              </li>
              <li>
                <strong>Don't post low-quality photos:</strong> Blurry, poorly lit shots hurt your brand.
              </li>
              <li>
                <strong>Don't use engagement pods:</strong> Instagram detects this and throttles your reach.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Converting Followers to Clients</h2>
          <p className="text-text-secondary mb-6">
            Followers mean nothing if they don't book. Here's the bridge:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Optimize Your Bio:</h3>
          <div className="bg-bg-secondary border border-border-primary rounded-lg p-6 mb-6">
            <p className="text-text-secondary mb-2">✅ Your name and style</p>
            <p className="text-text-secondary mb-2">✅ Location (Brooklyn, NY)</p>
            <p className="text-text-secondary mb-2">✅ Clear CTA ("DM to book" or "Link to book below")</p>
            <p className="text-text-secondary mb-2">✅ Link to booking form or portfolio site</p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Make Booking Easy:</h3>
          <p className="text-text-secondary mb-6">
            The fewer steps between "I want this" and "I'm booked," the higher your conversion rate.
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Respond to DMs within 2-4 hours (or use auto-replies)</li>
            <li>Have a booking form link ready</li>
            <li>Make your availability clear in highlights</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Long Game</h2>
          <p className="text-text-secondary mb-6">
            Instagram growth isn't overnight. Expect:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li><strong>0-1K followers:</strong> Slow grind. Focus on quality content.</li>
            <li><strong>1K-5K:</strong> Momentum builds. Keep posting consistently.</li>
            <li><strong>5K-10K:</strong> Growth accelerates. Reels start working for you.</li>
            <li><strong>10K+:</strong> You've hit critical mass. Maintain consistency.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>
          <p className="text-text-secondary mb-6">
            Instagram success in 2026 comes down to:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Post consistently (3-5x/week)</li>
            <li>Prioritize Reels for reach</li>
            <li>Use strategic hashtags</li>
            <li>Engage with your audience</li>
            <li>Make booking dead simple</li>
          </ul>
          <p className="text-text-secondary mb-6">
            The artists who win on Instagram aren't always the most talented—they're the most consistent. Show up, post your work, engage genuinely, and the bookings will follow.
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

export default InstagramGrowth;