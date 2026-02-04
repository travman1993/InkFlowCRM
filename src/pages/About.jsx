import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import icon from '../assets/icon.png';

function About() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <img src={icon} alt="InkFlowCRM" className="w-16 h-16 rounded-xl" />
            <h1 className="text-4xl md:text-5xl font-bold">About InkFlowCRM</h1>
          </div>
          
          <div className="space-y-6 text-text-secondary">
            <p className="text-xl">
              InkFlowCRM is built by artists, for artists. We understand the unique challenges of running a tattoo business 
              because we've lived them.
            </p>
            
            <p>
              The tattoo industry has been underserved by generic business software that doesn't understand the workflow, 
              commission structures, or client relationship needs specific to tattoo artists and studios.
            </p>
            
            <p>
              We're changing that. InkFlowCRM is purpose-built from the ground up to handle everything from client consultations 
              to automated aftercare emails, revenue tracking to multi-artist studio management.
            </p>
            
            <div className="mt-12 p-6 bg-bg-secondary rounded-lg border border-border-primary">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-text-secondary">
                To empower tattoo artists and studios with professional-grade business tools that are simple, powerful, 
                and affordable—so they can focus on what they do best: creating art.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;