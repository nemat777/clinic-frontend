// src/Login.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function Login({ setUser }) {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Check your email for the login link!');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Clinic Dashboard Login</h2>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '8px', width: '250px' }}
      />
      <button onClick={handleLogin} style={{ marginLeft: '10px', padding: '8px 16px' }}>
        Send Login Link
      </button>
    </div>
  );
}

export default Login;
