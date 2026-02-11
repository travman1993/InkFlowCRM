import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the artist profile for the logged-in user
  const fetchArtist = async (userId) => {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching artist:', error);
      return null;
    }
    return data;
  };

  useEffect(() => {
    // Check for existing session on load
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        const artistData = await fetchArtist(session.user.id);
        setArtist(artistData);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const artistData = await fetchArtist(session.user.id);
          setArtist(artistData);
        } else {
          setUser(null);
          setArtist(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ---------- Auth Methods ----------

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setArtist(null);
    }
    return { error };
  };

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  };

  const updateArtist = async (updates) => {
    if (!artist) return { error: { message: 'No artist profile found' } };

    const { data, error } = await supabase
      .from('artists')
      .update(updates)
      .eq('id', artist.id)
      .select()
      .single();

    if (!error && data) {
      setArtist(data);
    }
    return { data, error };
  };

  const value = {
    user,
    artist,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateArtist,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;