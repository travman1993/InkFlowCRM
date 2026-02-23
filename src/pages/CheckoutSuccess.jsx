import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function CheckoutSuccess() {
  const { artist, refreshSubscription } = useAuth();
  const isStudio = Boolean(artist?.studio_name);

  // Refresh subscription state so ProtectedRoute allows access immediately
  useEffect(() => {
    refreshSubscription();
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-accent-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-accent-success" />
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-3">You're all set!</h1>
        <p className="text-text-secondary mb-2 text-lg">
          Your subscription is now active.
        </p>
        <p className="text-text-secondary text-sm mb-8">
          You have full access to InkFlowCRM. Welcome aboard!
        </p>

        <Link
          to={isStudio ? '/studio/dashboard' : '/dashboard'}
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold transition"
        >
          Go to Dashboard
        </Link>

        <p className="text-xs text-text-tertiary mt-8">
          Manage your billing anytime from Settings
        </p>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
