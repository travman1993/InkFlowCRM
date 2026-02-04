import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Terms() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
        <p className="text-text-secondary mb-8">Last updated: February 2026</p>
        
        <div className="space-y-8 text-text-secondary">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using InkFlowCRM, you accept and agree to be bound by the terms and provision 
              of this agreement.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">2. Use License</h2>
            <p>
              Permission is granted to temporarily use InkFlowCRM for personal or commercial purposes. This is 
              the grant of a license, not a transfer of title.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password. You agree 
              to accept responsibility for all activities that occur under your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">4. Service Modifications</h2>
            <p>
              We reserve the right to modify or discontinue the service at any time, with or without notice. 
              We shall not be liable to you or any third party for any modification or discontinuance.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">5. Limitation of Liability</h2>
            <p>
              InkFlowCRM shall not be liable for any indirect, incidental, special, consequential or punitive 
              damages resulting from your use of or inability to use the service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-3">6. Contact</h2>
            <p>
              Questions about the Terms of Service should be sent to us at{' '}
              <a href="mailto:travisgolembiewski@gmail.com" className="text-accent-primary hover:underline">
                legal@inkflowcrm.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;