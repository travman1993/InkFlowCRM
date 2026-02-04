import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare } from 'lucide-react';


function Contact() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        
        <div className="space-y-6">
          <p className="text-xl text-text-secondary">
            We'd love to hear from you! Whether you have questions, feedback, or just want to say hi.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-bg-secondary rounded-lg border border-border-primary">
              <Mail className="w-8 h-8 text-accent-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-text-secondary mb-4">For general inquiries and support</p>
              <a href="mailto:travisgolembiewski@gmail.com" className="text-accent-primary hover:underline">
                support@inkflowcrm.com
              </a>
            </div>
            
            <div className="p-6 bg-bg-secondary rounded-lg border border-border-primary">
              <MessageSquare className="w-8 h-8 text-accent-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Feedback</h3>
              <p className="text-text-secondary mb-4">Help us improve InkFlowCRM</p>
              <a href="mailto:travisgolembiewski@gmail.com" className="text-accent-primary hover:underline">
                feedback@inkflowcrm.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;