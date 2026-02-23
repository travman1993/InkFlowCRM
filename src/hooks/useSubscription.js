/**
 * Derives subscription state from a raw subscriptions row.
 * Used by ProtectedRoute, TrialBanner, and Settings.
 */
export function deriveSubscriptionState(subscription) {
  if (!subscription) {
    return {
      isTrialing:   false,
      isActive:     false,
      hasAccess:    false,
      trialExpired: false,
      trialDaysLeft: 0,
    };
  }

  const now = new Date();
  const trialEnd = subscription.trial_end ? new Date(subscription.trial_end) : null;
  const isTrialing = subscription.status === 'trialing' && trialEnd && trialEnd > now;
  const isActive = subscription.status === 'active';
  const trialExpired = subscription.status === 'trialing' && trialEnd && trialEnd <= now;

  let trialDaysLeft = 0;
  if (isTrialing && trialEnd) {
    trialDaysLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
  }

  return {
    isTrialing:    Boolean(isTrialing),
    isActive,
    hasAccess:     Boolean(isTrialing) || isActive,
    trialExpired:  Boolean(trialExpired),
    trialDaysLeft,
  };
}
