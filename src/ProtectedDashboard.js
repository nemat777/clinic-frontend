// src/ProtectedDashboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Dashboard from './Dashboard';
import Login from './Login';

function ProtectedDashboard({ officeId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return <Dashboard officeId={officeId} />;
}

export default ProtectedDashboard;
