import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { deriveSubscriptionState } from '../hooks/useSubscription';

function ProtectedRoute({ children }) {
  const { user, subscription, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If no subscription row yet (race condition right after signup), allow through
  // The subscription row is created during signup, so this should be rare
  if (subscription === null) {
    // Still loading subscription or brand new user — allow through
    return children;
  }

  const { hasAccess } = deriveSubscriptionState(subscription);

  if (!hasAccess) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
}

export default ProtectedRoute;
