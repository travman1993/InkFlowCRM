import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Privacy() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-text-secondary mb-8">Last updated: February 2026</p>
        
        <div className="space-y-8 text-text-secondary">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, use our services, 
              or communicate with us. This includes your name, email address, and business information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to process your 
              transactions, and to communicate with you about products, services, and promotional offers.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your 
              personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">4. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. You can 
              do this through your account settings or by contacting us directly.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:travisgolembiewski@gmail.com" className="text-accent-primary hover:underline">
                privacy@inkflowcrm.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;