import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [artist, setArtist] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the artist profile for the logged-in user
  const fetchArtist = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) return null;
      return data;
    } catch (err) {
      return null;
    }
  };

  // Fetch the subscription row for the logged-in user
  const fetchSubscription = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('artist_id', userId)
        .single();

      if (error) return null;
      return data;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // 1. Get the initial session and fetch artist + subscription
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user && isMounted) {
          setUser(session.user);
          const [artistData, subData] = await Promise.all([
            fetchArtist(session.user.id),
            fetchSubscription(session.user.id),
          ]);
          if (isMounted) {
            setArtist(artistData);
            setSubscription(subData);
          }
        }
      } catch (err) {
        // session load failed, user stays logged out
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    // 2. Listen for auth changes — but DON'T make DB calls inside the callback.
    //    Instead, just update user state. The DB fetch happens via the
    //    separate useEffect below that watches `user`.
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          setArtist(null);
          setSubscription(null);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      authSub.unsubscribe();
    };
  }, []);

  // 3. Whenever `user` changes (from login/logout), fetch artist + subscription separately.
  //    This avoids the Supabase deadlock from querying inside onAuthStateChange.
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const loadProfile = async () => {
      const [artistData, subData] = await Promise.all([
        fetchArtist(user.id),
        fetchSubscription(user.id),
      ]);
      if (!cancelled) {
        setArtist(artistData);
        setSubscription(subData);
        setLoading(false);
      }
    };

    // Only fetch if we don't already have the profile
    if (!artist) {
      loadProfile();
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
      setSubscription(null);
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

  // Refresh subscription from DB (called after checkout success)
  const refreshSubscription = async () => {
    if (!user) return;
    const subData = await fetchSubscription(user.id);
    setSubscription(subData);
  };

  const value = {
    user,
    artist,
    subscription,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateArtist,
    refreshSubscription,
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
