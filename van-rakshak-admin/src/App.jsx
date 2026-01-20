import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Role Selection
import RoleSelection from './pages/RoleSelection';

// Admin Portal Components
import Login from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Patrols from './pages/Patrols';
import Incidents from './pages/Incidents';
import SOS from './pages/SOS';
import Analytics from './pages/Analytics';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Community Redirect Component
const CommunityRedirect = () => {
  React.useEffect(() => {
    // Redirect immediately to community app
    window.location.href = 'http://localhost:3001';
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
      color: 'white',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div style={{ fontSize: '64px' }}>🌲</div>
      <h1>Redirecting to Community Portal...</h1>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid rgba(255,255,255,0.3)',
        borderTop: '5px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page - Role Selection */}
        <Route path="/" element={<RoleSelection />} />

        {/* Admin Portal Routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard>
                <Overview /> 
              </Dashboard>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/patrols" 
          element={
            <ProtectedRoute>
              <Patrols />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/incidents" 
          element={
            <ProtectedRoute>
              <Incidents />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/sos" 
          element={
            <ProtectedRoute>
              <SOS />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/analytics" 
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } 
        />

        {/* Community Portal Route */}
        <Route 
          path="/community" 
          element={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              color: 'white',
              flexDirection: 'column',
              gap: '20px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '48px', margin: '0' }}>🌲 Community Portal</h1>
              <p style={{ fontSize: '20px', margin: '0' }}>Redirecting to Community Application...</p>
              <p style={{ fontSize: '14px', opacity: 0.8, margin: '20px 0 0 0' }}>
                This will open your Van-Rakshak-Community-App
              </p>
              <div style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '15px 30px', 
                borderRadius: '10px',
                fontSize: '14px',
                marginTop: '20px'
              }}>
                <p style={{ margin: '0 0 10px 0' }}>Expected at: <strong>http://localhost:3001</strong></p>
                <p style={{ margin: '0', fontSize: '12px', opacity: 0.9 }}>
                  Run: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '4px' }}>npm start</code> in community folder
                </p>
              </div>
            </div>
          } 
        />

        {/* Backward compatibility - redirect old admin routes */}
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/patrols" element={<Navigate to="/admin/patrols" replace />} />
        <Route path="/incidents" element={<Navigate to="/admin/incidents" replace />} />
        <Route path="/sos" element={<Navigate to="/admin/sos" replace />} />
        <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
        <Route path="/community" element={<CommunityRedirect />} />
        {/* Catch all - redirect to role selection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;