import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the artist profile for the logged-in user
  const fetchArtist = async (userId) => {
    console.log('[AuthContext] fetchArtist called for:', userId);
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('user_id', userId)
        .single();

      console.log('[AuthContext] fetchArtist result:', data, error);

      if (error) {
        console.error('[AuthContext] fetchArtist error:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('[AuthContext] fetchArtist unexpected error:', err);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // 1. Get the initial session and fetch artist
    const initAuth = async () => {
      console.log('[AuthContext] initAuth starting...');
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('[AuthContext] getSession result:', session ? 'HAS SESSION' : 'NO SESSION');

        if (session?.user && isMounted) {
          setUser(session.user);
          const artistData = await fetchArtist(session.user.id);
          console.log('[AuthContext] artist loaded:', artistData);
          if (isMounted) setArtist(artistData);
        }
      } catch (err) {
        console.error('[AuthContext] initAuth error:', err);
      } finally {
        console.log('[AuthContext] initAuth done, setting loading = false');
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    // 2. Listen for auth changes — but DON'T make DB calls inside the callback.
    //    Instead, just update user state. The DB fetch happens via the
    //    separate useEffect below that watches `user`.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[AuthContext] onAuthStateChange event:', event);
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          setArtist(null);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // 3. Whenever `user` changes (from login/logout), fetch artist separately.
  //    This avoids the Supabase deadlock from querying inside onAuthStateChange.
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const loadArtist = async () => {
      console.log('[AuthContext] loadArtist triggered for user:', user.id);
      const artistData = await fetchArtist(user.id);
      if (!cancelled) {
        console.log('[AuthContext] loadArtist setting artist:', artistData);
        setArtist(artistData);
        setLoading(false);
      }
    };

    // Only fetch if we don't already have the artist
    if (!artist) {
      loadArtist();
    }

    return () => { cancelled = true; };
  }, [user]);

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