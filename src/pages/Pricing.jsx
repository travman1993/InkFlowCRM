import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft, Zap, Building2, User, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const PLANS = {
  solo: {
    name: 'Solo Artist',
    icon: User,
    description: 'For independent tattoo artists',
    monthly: { price: 29, period: '/mo', planType: 'solo_monthly' },
    yearly:  { price: 26.10, period: '/mo', billed: 313.20, planType: 'solo_yearly' },
    features: [
      'Appointment calendar',
      'Unlimited client profiles',
      'Tattoo history & photo uploads',
      'Revenue & expense tracking',
      'Automated follow-up emails (5-email sequence)',
      'Analytics dashboard',
      'Recurring appointment templates',
    ],
  },
  studio: {
    name: 'Studio',
    icon: Building2,
    description: 'For multi-artist tattoo studios',
    monthly: { price: 99, period: '/mo', planType: 'studio_monthly' },
    yearly:  { price: 89.10, period: '/mo', billed: 1069.20, planType: 'studio_yearly' },
    features: [
      'Everything in Solo Artist',
      'Multi-artist roster management',
      'Studio-wide calendar & scheduling',
      'Per-artist revenue breakdowns',
      'Studio analytics & performance',
      'Commission & booth rent tracking',
    ],
    popular: true,
  },
};

function Pricing() {
  const { user, artist } = useAuth();
  const [billing, setBilling] = useState('monthly');
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState('');

  const isStudio = Boolean(artist?.studio_name);

  // When logged in, only show the plan matching the account type.
  // When not logged in (public visitor), show both so they can compare.
  const visiblePlans = user
    ? Object.entries(PLANS).filter(([key]) => isStudio ? key === 'studio' : key === 'solo')
    : Object.entries(PLANS);

  const handleSubscribe = async (planType) => {
    if (!user) return;
    setError('');
    setLoadingPlan(planType);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { plan_type: planType, email: user.email },
      });

      if (error) {
        let msg = error.message || 'Failed to create checkout session';
        try {
          const body = await error.context.json();
          if (body?.error) msg = body.error;
        } catch {}
        throw new Error(msg);
      }
      if (!data?.url) throw new Error('No checkout URL returned');

      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-primary px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {user ? (
            <Link
              to={isStudio ? '/studio/dashboard' : '/dashboard'}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to dashboard
            </Link>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-warning/10 border border-accent-warning/30 rounded-full text-xs font-semibold text-accent-warning mb-4">
            <Zap className="w-3.5 h-3.5" />
            Your free trial has ended
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Choose your plan</h1>
          <p className="text-text-secondary text-lg">
            Pick the plan that fits your business. Cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              billing === 'monthly'
                ? 'bg-accent-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${
              billing === 'yearly'
                ? 'bg-accent-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Yearly
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              billing === 'yearly'
                ? 'bg-white/20 text-white'
                : 'bg-accent-success/20 text-accent-success'
            }`}>
              Save 10%
            </span>
          </button>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Plan cards */}
        <div className={`grid gap-6 mx-auto ${visiblePlans.length === 1 ? 'max-w-md' : 'md:grid-cols-2 max-w-3xl'}`}>
          {visiblePlans.map(([key, plan]) => {
            const tier = plan[billing];
            const isLoading = loadingPlan === tier.planType;

            return (
              <div
                key={key}
                className={`relative p-6 md:p-8 bg-bg-secondary rounded-2xl border-2 transition ${
                  plan.popular ? 'border-accent-primary' : 'border-border-primary'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 bg-accent-primary rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent-primary/10 rounded-lg flex items-center justify-center">
                    <plan.icon className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{plan.name}</h2>
                    <p className="text-sm text-text-secondary">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${tier.price.toFixed(2).replace(/\.00$/, '')}</span>
                    <span className="text-text-secondary">{tier.period}</span>
                  </div>
                  {billing === 'yearly' && (
                    <p className="text-xs text-text-secondary mt-1">
                      Billed ${tier.billed.toFixed(2)}/year · Save 10%
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 mt-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        f.startsWith('Everything') ? 'text-accent-primary' : 'text-accent-success'
                      }`} />
                      <span className={f.startsWith('Everything') ? 'font-semibold text-text-primary' : ''}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleSubscribe(tier.planType)}
                  disabled={isLoading || Boolean(loadingPlan)}
                  className="w-full py-3 bg-accent-primary hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting to checkout...
                    </>
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-text-tertiary mt-8">
          Secure payment via Stripe · Cancel anytime · No hidden fees
        </p>
      </div>
    </div>
  );
}

export default Pricing;
