import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Check } from 'lucide-react';

function ForgotPassword() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: resetError } = await resetPassword(email);

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-accent-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-accent-success" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">Check your email</h1>
          <p className="text-text-secondary mb-6">
            We sent a password reset link to <span className="text-text-primary font-medium">{email}</span>.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-accent-primary hover:bg-teal-600 rounded-lg font-semibold text-white transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Reset your password</h1>
          <p className="text-text-secondary">Enter your email and we'll send you a reset link</p>
        </div>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent-primary hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;