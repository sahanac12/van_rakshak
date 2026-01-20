import React, { useState, useEffect } from 'react';
import { Map, AlertOctagon, ShieldAlert, Users, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const Overview = () => {
  const [liveStats, setLiveStats] = useState({
    activePatrols: 12,
    pendingIncidents: 5,
    activeSOS: 1,
    totalOfficers: 48,
    resolvedToday: 8,
    avgResponseTime: '12 min'
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'patrol', message: 'Officer 100449 started a new patrol route in North Sector', time: 'Just now', priority: 'low', officer: 'Officer 100449' },
    { id: 2, type: 'sos', message: 'SOS signal received from Gajraj Point', time: '12 mins ago', priority: 'high', officer: 'Officer 100231' },
    { id: 3, type: 'incident', message: 'Unidentified vehicle spotted near Zone B', time: '45 mins ago', priority: 'medium', officer: 'Officer 100587' }
  ]);

  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate live updates
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Simulate random stat changes
      setLiveStats(prev => ({
        ...prev,
        activePatrols: Math.max(8, Math.min(15, prev.activePatrols + Math.floor(Math.random() * 3) - 1)),
        pendingIncidents: Math.max(0, Math.min(10, prev.pendingIncidents + Math.floor(Math.random() * 3) - 1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const stats = [
    { 
      label: 'Active Patrols', 
      value: liveStats.activePatrols, 
      icon: <Map size={24} color="#2563eb" />, 
      bg: '#eff6ff',
      change: '+2 from yesterday',
      trend: 'up'
    },
    { 
      label: 'Pending Incidents', 
      value: liveStats.pendingIncidents, 
      icon: <AlertOctagon size={24} color="#ea580c" />, 
      bg: '#fff7ed',
      change: '-3 from yesterday',
      trend: 'down'
    },
    { 
      label: 'Active SOS', 
      value: liveStats.activeSOS, 
      icon: <ShieldAlert size={24} color="#dc2626" />, 
      bg: '#fef2f2',
      change: 'Urgent attention needed',
      trend: 'urgent'
    },
    { 
      label: 'Total Officers', 
      value: liveStats.totalOfficers, 
      icon: <Users size={24} color="#16a34a" />, 
      bg: '#f0fdf4',
      change: '4 on leave',
      trend: 'neutral'
    },
  ];

  const performanceMetrics = [
    { label: 'Resolved Today', value: liveStats.resolvedToday, icon: <CheckCircle size={20} color="#16a34a" /> },
    { label: 'Avg Response Time', value: liveStats.avgResponseTime, icon: <Clock size={20} color="#2563eb" /> },
    { label: 'Success Rate', value: '94%', icon: <TrendingUp size={20} color="#16a34a" /> }
  ];

  const handleAcknowledge = (activityId) => {
    setRecentActivity(prev => prev.filter(activity => activity.id !== activityId));
  };

  const handleViewDetails = (activity) => {
    alert(`Viewing details for: ${activity.message}\nOfficer: ${activity.officer}\nPriority: ${activity.priority.toUpperCase()}`);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#ea580c';
      case 'low': return '#16a34a';
      default: return '#666';
    }
  };

  const getPriorityBg = (priority) => {
    switch(priority) {
      case 'high': return '#fef2f2';
      case 'medium': return '#fff7ed';
      case 'low': return '#f0fdf4';
      default: return '#f8fafc';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#1a472a' }}>Command Center Dashboard</h2>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={autoRefresh} 
              onChange={(e) => setAutoRefresh(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Auto-refresh
          </label>
          
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '6px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px',
        marginBottom: '30px' 
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: stat.trend === 'urgent' ? '2px solid #dc2626' : '1px solid #f0f0f0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: stat.bg, padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#666', marginBottom: '4px' }}>{stat.label}</p>
                <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{stat.value}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: stat.trend === 'up' ? '#16a34a' : stat.trend === 'down' ? '#666' : '#dc2626', marginTop: '4px' }}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Metrics Bar */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1a472a 0%, #2e7d32 100%)', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        color: 'white'
      }}>
        <h4 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Performance Metrics</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          {performanceMetrics.map((metric, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {metric.icon}
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{metric.value}</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>{metric.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Live Activity Feed</h3>
          <button 
            onClick={() => setRecentActivity([])}
            style={{ 
              padding: '6px 12px', 
              fontSize: '12px', 
              background: '#f3f4f6', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Clear All
          </button>
        </div>
        
        {recentActivity.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            <CheckCircle size={48} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
            <p>All activities acknowledged. Great work!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivity.map((activity) => (
              <div key={activity.id} style={{ 
                padding: '15px', 
                borderRadius: '8px', 
                background: getPriorityBg(activity.priority),
                borderLeft: `4px solid ${getPriorityColor(activity.priority)}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    {activity.type === 'sos' && <ShieldAlert size={16} color="#dc2626" />}
                    {activity.type === 'incident' && <AlertOctagon size={16} color="#ea580c" />}
                    {activity.type === 'patrol' && <Map size={16} color="#16a34a" />}
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{activity.message}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', display: 'flex', gap: '15px' }}>
                    <span>🕐 {activity.time}</span>
                    <span>👤 {activity.officer}</span>
                    <span style={{ 
                      background: getPriorityColor(activity.priority), 
                      color: 'white', 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {activity.priority}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleViewDetails(activity)}
                    style={{ 
                      padding: '6px 12px', 
                      background: '#2563eb', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      fontSize: '12px', 
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => handleAcknowledge(activity.id)}
                    style={{ 
                      padding: '6px 12px', 
                      background: '#16a34a', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      fontSize: '12px', 
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;