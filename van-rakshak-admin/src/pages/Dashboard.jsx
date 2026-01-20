import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Map, AlertOctagon, ShieldAlert, BarChart3, LogOut } from 'lucide-react';

const Dashboard = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/');  // ← CHANGED (goes to role selection now)
  };

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20}/>, path: '/admin/dashboard' },      // ← CHANGED
    { name: 'Live Patrols', icon: <Map size={20}/>, path: '/admin/patrols' },                // ← CHANGED
    { name: 'Incidents', icon: <AlertOctagon size={20}/>, path: '/admin/incidents' },        // ← CHANGED
    { name: 'SOS Alerts', icon: <ShieldAlert size={20}/>, path: '/admin/sos' },              // ← CHANGED
    { name: 'Analytics', icon: <BarChart3 size={20}/>, path: '/admin/analytics' },           // ← CHANGED
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f4f7f6' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', background: '#1a472a', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '30px', borderBottom: '1px solid #2e7d32', paddingBottom: '10px' }}>Van Rakshak</h2>
        <nav style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '5px', marginBottom: '8px', gap: '10px', background: window.location.pathname === item.path ? '#2e7d32' : 'transparent' }}>
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} style={{ background: '#c62828', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LogOut size={20}/> Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {children || <h2>Welcome to the Admin Command Center</h2>}
      </div>
    </div>
  );
};

export default Dashboard;