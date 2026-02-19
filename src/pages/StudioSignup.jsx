import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, ArrowLeft, Check, Building2 } from 'lucide-react';

function StudioSignup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    studioName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field) => (e) => setFormData(f => ({ ...f, [field]: e.target.value }));

  const passwordChecks = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    match: formData.password === formData.confirmPassword && formData.confirmPassword.length > 0,
  };

  const isValid =
    formData.name.trim() &&
    formData.studioName.trim() &&
    formData.email.trim() &&
    passwordChecks.length &&
    passwordChecks.number &&
    passwordChecks.match;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValid) {
      setError('Please fill in all fields and meet the password requirements.');
      return;
    }

    setLoading(true);

    // 1. Create the auth user
    const { data, error: signUpError } = await signUp(formData.email, formData.password);

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const userId = data?.user?.id;

    // 2. If we have a session (auto-confirmed), upsert the artists row now.
    //    Upsert handles both cases: trigger already created the row (update it)
    //    or no trigger exists (insert it).
    if (data?.session && userId) {
      const { error: upsertError } = await supabase
        .from('artists')
        .upsert({
          user_id: userId,
          name: formData.name.trim(),
          studio_name: formData.studioName.trim(),
          email: formData.email.trim(),
          pay_model: 'booth_rent',
          booth_rent_amount: 0,
          commission_rate: 0.60,
        }, { onConflict: 'user_id' });

      if (upsertError) {
        setError('Account created but profile setup failed. Please contact support.');
        setLoading(false);
        return;
      }

      navigate('/studio/dashboard');
      return;
    }

    // 3. Email confirmation required — store name/studio in localStorage
    //    so we can create the artists row after they confirm and log back in
    if (userId) {
      localStorage.setItem('pendingStudioProfile', JSON.stringify({
        userId,
        name: formData.name.trim(),
        studioName: formData.studioName.trim(),
        email: formData.email.trim(),
      }));
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-accent-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-accent-success" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">Check your email</h1>
          <p className="text-text-secondary mb-6">
            We sent a confirmation link to{' '}
            <span className="text-text-primary font-medium">{formData.email}</span>.
            Click the link to activate your studio account.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold text-white transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back */}
        <Link
          to="/"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-6 h-6 text-accent-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Create a Studio Account</h1>
          <p className="text-text-secondary">Manage your artists, schedule, and revenue in one place</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={set('name')}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Studio Name
              </label>
              <input
                type="text"
                value={formData.studioName}
                onChange={set('studioName')}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition"
                placeholder="Ink & Soul Studio"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={set('email')}
              required
              className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition"
              placeholder="you@studio.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={set('password')}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition pr-12"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={set('confirmPassword')}
              required
              className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition"
              placeholder="Confirm your password"
            />
          </div>

          {/* Password requirements */}
          <div className="space-y-2 text-sm">
            <div className={`flex items-center gap-2 ${passwordChecks.length ? 'text-accent-success' : 'text-text-tertiary'}`}>
              <Check className="w-4 h-4" />
              At least 8 characters
            </div>
            <div className={`flex items-center gap-2 ${passwordChecks.number ? 'text-accent-success' : 'text-text-tertiary'}`}>
              <Check className="w-4 h-4" />
              Contains a number
            </div>
            <div className={`flex items-center gap-2 ${passwordChecks.match ? 'text-accent-success' : 'text-text-tertiary'}`}>
              <Check className="w-4 h-4" />
              Passwords match
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isValid}
            className="w-full py-3 bg-accent-primary hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition"
          >
            {loading ? 'Creating studio account...' : 'Create Studio Account'}
          </button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>

        <p className="text-center text-text-secondary mt-2">
          Just an artist?{' '}
          <Link to="/signup" className="text-accent-primary hover:underline font-medium">
            Solo artist signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default StudioSignup;
