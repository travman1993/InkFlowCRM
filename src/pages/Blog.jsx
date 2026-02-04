import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const blogPosts = [
    {
      id: 1,
      title: "5 Ways to Reduce No-Shows at Your Tattoo Studio",
      excerpt: "No-shows cost tattoo artists an average of $150 per missed appointment. Learn proven strategies to dramatically reduce cancellations and keep your calendar full.",
      date: "February 1, 2026",
      readTime: "5 min read",
      category: "Business Tips",
      slug: "reduce-no-shows"
    },
    {
      id: 2,
      title: "The Complete Guide to Tattoo Aftercare Emails",
      excerpt: "Automated aftercare instructions improve healing outcomes and client satisfaction. Here's exactly what to include in your post-appointment emails.",
      date: "January 28, 2026",
      readTime: "7 min read",
      category: "Client Care",
      slug: "aftercare-emails"
    },
    {
      id: 3,
      title: "How to Calculate Your True Tattoo Pricing",
      excerpt: "Are you charging enough? Most artists underprice their work. Learn the formula for calculating your hourly rate based on booth rent, supplies, and experience.",
      date: "January 25, 2026",
      readTime: "8 min read",
      category: "Pricing",
      slug: "tattoo-pricing"
    },
    {
      id: 4,
      title: "Commission vs. Booth Rent: Which Model is Right for You?",
      excerpt: "Understanding the financial implications of different payment structures can save you thousands. We break down the math for both solo artists and studio owners.",
      date: "January 22, 2026",
      readTime: "6 min read",
      category: "Studio Management",
      slug: "commission-vs-booth-rent"
    },
    {
      id: 5,
      title: "Building a Repeat Client Base: The 7-Day Follow-Up System",
      excerpt: "The best clients are repeat clients. Learn how automated follow-ups can turn one-time customers into loyal collectors who come back year after year.",
      date: "January 18, 2026",
      readTime: "5 min read",
      category: "Marketing",
      slug: "repeat-clients"
    },
    {
      id: 6,
      title: "Tax Tips Every Tattoo Artist Should Know",
      excerpt: "As a tattoo artist, you're likely a 1099 contractor. Here's what you need to track, deduct, and save to avoid headaches at tax time.",
      date: "January 15, 2026",
      readTime: "10 min read",
      category: "Finance",
      slug: "tax-tips"
    },
    {
      id: 7,
      title: "How to Handle Difficult Client Conversations",
      excerpt: "From pricing disputes to design changes, every artist faces challenging conversations. Here are proven scripts and strategies for maintaining professionalism.",
      date: "January 12, 2026",
      readTime: "6 min read",
      category: "Client Care",
      slug: "difficult-conversations"
    },
    {
      id: 8,
      title: "The Artist's Guide to Instagram Growth in 2026",
      excerpt: "Social media is still the #1 way tattoo artists get discovered. Learn the latest algorithm changes and posting strategies that actually work.",
      date: "January 8, 2026",
      readTime: "9 min read",
      category: "Marketing",
      slug: "instagram-growth"
    },
    {
      id: 9,
      title: "Managing Multiple Artists: A Studio Owner's Playbook",
      excerpt: "From scheduling conflicts to commission disputes, running a multi-artist studio comes with unique challenges. Here's how to keep everything running smoothly.",
      date: "January 5, 2026",
      readTime: "8 min read",
      category: "Studio Management",
      slug: "managing-artists"
    },
    {
      id: 10,
      title: "Supply Cost Tracking: Why Every Dollar Matters",
      excerpt: "Needles, ink, gloves, and aftercare supplies add up fast. Learn how tracking your supply costs can reveal where you're losing money—and how to fix it.",
      date: "January 1, 2026",
      readTime: "5 min read",
      category: "Finance",
      slug: "supply-costs"
    },
    {
      id: 11,
      title: "Creating a Professional Consultation Process",
      excerpt: "First impressions matter. A structured consultation process shows professionalism, sets expectations, and increases booking rates. Here's our proven framework.",
      date: "December 28, 2025",
      readTime: "7 min read",
      category: "Business Tips",
      slug: "consultation-process"
    },
    {
      id: 12,
      title: "The Power of Email Marketing for Tattoo Artists",
      excerpt: "Instagram reach is declining. Email marketing gives you direct access to your clients. Learn how to build and nurture your email list effectively.",
      date: "December 25, 2025",
      readTime: "6 min read",
      category: "Marketing",
      slug: "email-marketing"
    }
  ];

  const categories = [
    "All Posts",
    "Business Tips",
    "Client Care",
    "Pricing",
    "Studio Management",
    "Marketing",
    "Finance"
  ];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All Posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">InkFlow Blog</h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Business tips, industry insights, and practical advice for tattoo artists and studio owners.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-border-primary bg-bg-secondary sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-accent-primary text-white'
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-bg-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {selectedCategory === 'All Posts' && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-accent-primary/10 to-bg-secondary p-8 rounded-2xl border border-accent-primary/20 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent-primary text-white text-sm font-semibold rounded-full">
                Featured
              </span>
              <span className="text-accent-primary font-semibold">{filteredPosts[0].category}</span>
            </div>
            
            <Link to={`/blog/${filteredPosts[0].slug}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-accent-primary transition cursor-pointer">
                {filteredPosts[0].title}
              </h2>
            </Link>
            
            <p className="text-lg text-text-secondary mb-6">
              {filteredPosts[0].excerpt}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-text-tertiary mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {filteredPosts[0].date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {filteredPosts[0].readTime}
              </div>
            </div>
            
            <Link to={`/blog/${filteredPosts[0].slug}`}>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-teal-600 text-white rounded-lg font-semibold transition">
                Read Full Article
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedCategory === 'All Posts' ? filteredPosts.slice(1) : filteredPosts).map((post) => (
              <div
                key={post.id}
                className="bg-bg-secondary rounded-xl border border-border-primary hover:border-accent-primary/50 transition group overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-accent-primary px-3 py-1 bg-accent-primary/10 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-text-tertiary">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent-primary transition cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border-primary">
                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <button className="text-sm font-semibold text-accent-primary hover:gap-2 flex items-center gap-1 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No posts in this category yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-bg-secondary rounded-2xl border border-border-primary p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Get the latest business tips, industry insights, and InkFlowCRM updates delivered to your inbox weekly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
            />
            <button className="px-6 py-3 bg-accent-primary hover:bg-teal-600 text-white rounded-lg font-semibold transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
          
          <p className="text-xs text-text-tertiary mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog;