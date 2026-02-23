import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { deriveSubscriptionState } from '../hooks/useSubscription';

function TrialBanner() {
  const { subscription } = useAuth();
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('trialBannerDismissed') === 'true'
  );

  const { isTrialing, trialDaysLeft } = deriveSubscriptionState(subscription);

  if (!isTrialing || dismissed) return null;

  const handleDismiss = () => {
    sessionStorage.setItem('trialBannerDismissed', 'true');
    setDismissed(true);
  };

  const dayLabel = trialDaysLeft === 1 ? '1 day' : `${trialDaysLeft} days`;

  return (
    <div className="bg-accent-warning/10 border-b border-accent-warning/30 px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm">
        <Zap className="w-4 h-4 text-accent-warning flex-shrink-0" />
        <span className="text-accent-warning font-semibold">
          {dayLabel} left in your free trial
        </span>
        <span className="text-text-secondary hidden sm:inline">·</span>
        <Link
          to="/pricing"
          className="text-accent-warning underline underline-offset-2 hover:text-yellow-300 transition hidden sm:inline font-medium"
        >
          Choose a plan →
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/pricing"
          className="text-xs px-3 py-1 bg-accent-warning text-black font-semibold rounded-full hover:bg-yellow-400 transition sm:hidden"
        >
          Upgrade
        </Link>
        <button
          onClick={handleDismiss}
          className="text-text-tertiary hover:text-text-primary transition"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default TrialBanner;
