import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/auth/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('admin_token', response.data.access_token);
        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Connection error. Make sure backend is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #1a472a 0%, #2e7d32 100%)' 
    }}>
      <form onSubmit={handleLogin} style={{ 
        background: 'white', 
        padding: '2.5rem', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ color: '#1a472a', textAlign: 'center', marginBottom: '1.5rem' }}>
          🌳 Van Rakshak Admin
        </h2>
        
        {error && (
          <div style={{ 
            padding: '12px', 
            background: '#ffebee', 
            color: '#c62828', 
            borderRadius: '5px', 
            marginBottom: '1rem',
            fontSize: '14px',
            border: '1px solid #ef5350'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Admin Email
          </label>
          <input 
            type="email" 
            placeholder="admin@test.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1
            }} 
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password
          </label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1
            }} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: loading ? '#999' : '#1a472a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s'
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '1rem' }}>
          Authorized Personnel Only
        </p>
      </form>
    </div>
  );
};

export default Login;