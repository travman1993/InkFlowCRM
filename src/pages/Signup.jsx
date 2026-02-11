import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    number: /\d/.test(password),
    match: password === confirmPassword && confirmPassword.length > 0,
  };

  const isValid = passwordChecks.length && passwordChecks.number && passwordChecks.match;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValid) {
      setError('Please fix the password requirements below.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await signUp(email, password);

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // If Supabase requires email confirmation
    if (data?.user && !data?.session) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    // If auto-confirmed (dev mode), go straight to dashboard
    navigate('/dashboard');
  };

  // Success state — check your email
  if (success) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-accent-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-accent-success" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">Check your email</h1>
          <p className="text-text-secondary mb-6">
            We sent a confirmation link to <span className="text-text-primary font-medium">{email}</span>.
            Click the link to activate your account.
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
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Create your account</h1>
          <p className="text-text-secondary">Start managing your tattoo business today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-text-secondary mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;