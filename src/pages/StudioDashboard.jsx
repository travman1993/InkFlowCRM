import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function StudioDashboard() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Studio Dashboard</h1>
          <p className="text-xl text-text-secondary mb-8">
            Coming soon! Manage your entire studio from here.
          </p>
          <div className="inline-block px-6 py-3 bg-accent-primary/10 border border-accent-primary rounded-lg">
            <p className="text-accent-primary">Under Construction 🚧</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudioDashboard;