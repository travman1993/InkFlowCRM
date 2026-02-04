import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


function Blog() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
        <div className="text-center py-20">
          <div className="inline-block px-6 py-3 bg-accent-primary/10 border border-accent-primary rounded-lg">
            <p className="text-accent-primary">Coming Soon! Stay tuned for tips, updates, and industry insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;