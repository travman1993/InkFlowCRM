import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useArtistSettings } from '../hooks/useArtistSettings';
import { useAuth } from '../context/AuthContext';
import { deriveSubscriptionState } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';
import {
  Settings as SettingsIcon,
  User,
  Building2,
  DollarSign,
  Save,
  CheckCircle,
  AlertCircle,
  CreditCard,
  ExternalLink,
  Loader2,
} from 'lucide-react';


const PLAN_LABELS = {
  solo_monthly:   'Solo Artist · Monthly',
  solo_yearly:    'Solo Artist · Yearly',
  studio_monthly: 'Studio · Monthly',
  studio_yearly:  'Studio · Yearly',
};

function Settings() {
  const { settings, updateSettings } = useArtistSettings();
  const { signOut, subscription, user } = useAuth();
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingError, setBillingError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    studioName: '',
    phone: '',
    email: '',
    paymentModel: 'booth_rent',
    boothRentAmount: 0,
    commissionRate: 0.6,
  });

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null

  // Populate form from context settings
  useEffect(() => {
    setFormData({
      name: settings.name || '',
      studioName: settings.studioName || '',
      phone: settings.phone || '',
      email: settings.email || '',
      paymentModel: settings.paymentModel || 'booth_rent',
      boothRentAmount: settings.boothRentAmount || 0,
      commissionRate: settings.commissionRate || 0.6,
    });
  }, [settings]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setSaveStatus(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);

    const result = await updateSettings({
      name: formData.name,
      studioName: formData.studioName,
      phone: formData.phone,
      email: formData.email,
      paymentModel: formData.paymentModel,
      boothRentAmount: parseFloat(formData.boothRentAmount) || 0,
      commissionRate: parseFloat(formData.commissionRate) || 0.6,
    });

    setSaving(false);
    setSaveStatus(result?.error ? 'error' : 'success');

    // Clear success message after 3 seconds
    if (!result?.error) {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleManageBilling = async () => {
    setBillingError('');
    setBillingLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-portal-session', {
        body: {},
      });

      if (error) throw new Error(error.message || 'Failed to open billing portal');
      if (!data?.url) throw new Error('No portal URL returned');
      window.location.href = data.url;
    } catch (err) {
      setBillingError(err.message);
      setBillingLoading(false);
    }
  };

  const subState = deriveSubscriptionState(subscription);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {/* Header */}
        <div className="bg-bg-secondary border-b border-border-primary p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SettingsIcon className="w-8 h-8 text-accent-primary" />
                <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
              </div>

              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-accent-danger/20 text-accent-danger hover:bg-accent-danger/30 rounded-lg font-semibold transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
          {/* Profile Section */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-accent-primary" />
              <h2 className="text-xl font-bold">Profile</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                  placeholder="555-123-4567"
                />
              </div>
            </div>
          </div>

          {/* Studio Section */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-accent-primary" />
              <h2 className="text-xl font-bold">Studio</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Studio Name</label>
              <input
                type="text"
                value={formData.studioName}
                onChange={(e) => handleChange('studioName', e.target.value)}
                className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                placeholder="Your studio name"
              />
            </div>
          </div>

          {/* Payment Model Section */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-accent-primary" />
              <h2 className="text-xl font-bold">Payment Model</h2>
            </div>

            <p className="text-text-secondary mb-4">
              This affects how your earnings are calculated when you complete a tattoo.
            </p>

            {/* Model Selector */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleChange('paymentModel', 'booth_rent')}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  formData.paymentModel === 'booth_rent'
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border-primary hover:border-accent-primary/50'
                }`}
              >
                <div className="font-bold mb-1">Booth Rent</div>
                <div className="text-sm text-text-secondary">
                  You pay a fixed monthly rent. You keep 100% of tattoo revenue minus supplies.
                </div>
              </button>

              <button
                onClick={() => handleChange('paymentModel', 'commission')}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  formData.paymentModel === 'commission'
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border-primary hover:border-accent-primary/50'
                }`}
              >
                <div className="font-bold mb-1">Commission Split</div>
                <div className="text-sm text-text-secondary">
                  The studio takes a percentage of each tattoo. You keep your split minus supplies.
                </div>
              </button>
            </div>

            {/* Model-specific fields */}
            {formData.paymentModel === 'booth_rent' ? (
              <div>
                <label className="block text-sm font-semibold mb-2">Monthly Booth Rent</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary">$</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={formData.boothRentAmount}
                    onChange={(e) => handleChange('boothRentAmount', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                    placeholder="800"
                  />
                </div>
                <p className="text-xs text-text-tertiary mt-2">
                  This is tracked as a recurring expense. Your earnings = tattoo price - supplies cost.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Commission Rate: {Math.round(formData.commissionRate * 100)}%
                </label>
                <input
                  type="range"
                  min="0.30"
                  max="0.90"
                  step="0.05"
                  value={formData.commissionRate}
                  onChange={(e) => handleChange('commissionRate', parseFloat(e.target.value))}
                  className="w-full accent-accent-primary"
                />
                <div className="flex justify-between text-xs text-text-tertiary mt-2">
                  <span>30%</span>
                  <span>Studio keeps {Math.round((1 - formData.commissionRate) * 100)}%</span>
                  <span>90%</span>
                </div>

                {/* Example calculation */}
                <div className="mt-4 p-4 bg-bg-primary rounded-lg border border-border-primary">
                  <div className="text-sm text-text-tertiary mb-2">Example: $500 tattoo, $40 supplies</div>
                  <div className="flex justify-between">
                    <span>Your earnings:</span>
                    <span className="font-bold text-accent-success">
                      ${((500 * formData.commissionRate) - 40).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-tertiary">
                    <span>Studio cut:</span>
                    <span>${(500 * (1 - formData.commissionRate)).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Billing Section */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-accent-primary" />
              <h2 className="text-xl font-bold">Billing</h2>
            </div>

            {subscription ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[160px] p-4 bg-bg-primary rounded-lg border border-border-primary">
                    <p className="text-xs text-text-tertiary mb-1 uppercase tracking-wide font-semibold">Plan</p>
                    <p className="font-semibold">
                      {subscription.plan_type
                        ? PLAN_LABELS[subscription.plan_type] ?? subscription.plan_type
                        : 'Free Trial'}
                    </p>
                  </div>
                  <div className="flex-1 min-w-[160px] p-4 bg-bg-primary rounded-lg border border-border-primary">
                    <p className="text-xs text-text-tertiary mb-1 uppercase tracking-wide font-semibold">Status</p>
                    <p className={`font-semibold capitalize ${
                      subState.isActive    ? 'text-accent-success' :
                      subState.isTrialing  ? 'text-accent-warning' :
                      'text-accent-danger'
                    }`}>
                      {subState.isTrialing
                        ? `Trial · ${subState.trialDaysLeft}d left`
                        : subscription.status}
                    </p>
                  </div>
                  {subscription.current_period_end && (
                    <div className="flex-1 min-w-[160px] p-4 bg-bg-primary rounded-lg border border-border-primary">
                      <p className="text-xs text-text-tertiary mb-1 uppercase tracking-wide font-semibold">Renews</p>
                      <p className="font-semibold">
                        {new Date(subscription.current_period_end).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {billingError && (
                  <p className="text-sm text-accent-danger">{billingError}</p>
                )}

                {subState.isActive ? (
                  <button
                    onClick={handleManageBilling}
                    disabled={billingLoading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-bg-primary border border-border-primary hover:border-accent-primary rounded-lg font-semibold text-sm transition disabled:opacity-50"
                  >
                    {billingLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )}
                    Manage Billing
                  </button>
                ) : subState.isTrialing ? (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/pricing"
                      className="flex items-center gap-2 px-5 py-2.5 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold text-sm transition"
                    >
                      Choose a Plan
                    </Link>
                    <p className="text-sm text-text-secondary">
                      Trial ends {new Date(subscription.trial_end).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold text-sm transition"
                  >
                    Reactivate Subscription
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-text-secondary text-sm">Loading billing information...</p>
            )}
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-accent-primary hover:bg-blue-600 disabled:opacity-50 rounded-lg font-semibold transition"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>

            {saveStatus === 'success' && (
              <div className="flex items-center gap-2 text-accent-success">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Settings saved!</span>
              </div>
            )}

            {saveStatus === 'error' && (
              <div className="flex items-center gap-2 text-accent-danger">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Failed to save. Please try again.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;