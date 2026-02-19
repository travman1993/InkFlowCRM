import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-3">Something went wrong</h2>
            <p className="text-text-secondary mb-6">
              An unexpected error occurred. Try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
