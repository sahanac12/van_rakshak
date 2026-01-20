import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Users, MapPin, Filter } from 'lucide-react';

// Generate mock data
const generateMockData = () => {
  const categories = ['FOREST_FIRE', 'WILDLIFE_SIGHTING', 'ILLEGAL_LOGGING', 'POACHING', 'UNAUTHORIZED_ENTRY'];
  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const officers = ['OFF-001', 'OFF-002', 'OFF-003', 'OFF-004', 'OFF-005'];
  
  // Daily incidents for last 30 days
  const dailyData = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dailyData.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      incidents: Math.floor(Math.random() * 15) + 5,
      sos: Math.floor(Math.random() * 3),
    });
  }

  // Category distribution
  const categoryData = categories.map(cat => ({
    name: cat.replace(/_/g, ' '),
    value: Math.floor(Math.random() * 50) + 10,
  }));

  // Officer performance
  const officerData = officers.map((off, idx) => ({
    officer: `Officer ${idx + 1}`,
    incidents: Math.floor(Math.random() * 30) + 10,
    resolved: Math.floor(Math.random() * 25) + 15,
  }));

  // Hourly distribution
  const hourlyData = [];
  for (let h = 0; h < 24; h++) {
    hourlyData.push({
      hour: `${h}:00`,
      count: Math.floor(Math.random() * 8) + 1,
    });
  }

  // Priority breakdown
  const priorityData = priorities.map(p => ({
    name: p,
    value: Math.floor(Math.random() * 40) + 10,
  }));

  // Hotspot zones
  const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];
  const hotspotData = zones.map(zone => ({
    zone,
    incidents: Math.floor(Math.random() * 50) + 10,
  }));

  return { dailyData, categoryData, officerData, hourlyData, priorityData, hotspotData };
};

const Analytics = () => {
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setData(generateMockData());
  }, [timeRange]);

  if (!data) return <Dashboard><div>Loading...</div></Dashboard>;

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
  
  const stats = [
    { label: 'Total Incidents', value: '342', change: '+12%', icon: AlertTriangle, color: '#ef4444', bg: '#fef2f2' },
    { label: 'Active Officers', value: '28', change: '+2', icon: Users, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Hotspot Zones', value: '5', change: '0', icon: MapPin, color: '#f59e0b', bg: '#fff7ed' },
    { label: 'Avg Response', value: '18m', change: '-5m', icon: TrendingUp, color: '#10b981', bg: '#f0fdf4' },
  ];

  return (
    <Dashboard>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '10px', color: '#1a472a', fontSize: '24px', fontWeight: 'bold' }}>
          📊 Analytics Dashboard
        </h2>
        <p style={{ color: '#666', fontSize: '14px' }}>Forest Patrol Performance & Incident Analysis</p>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', borderRadius: '10px', padding: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <Filter size={20} color="#666" />
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '14px' }}
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '14px' }}
        >
          <option value="all">All Categories</option>
          <option value="fire">Forest Fire</option>
          <option value="wildlife">Wildlife</option>
          <option value="logging">Illegal Logging</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ background: stat.bg, padding: '10px', borderRadius: '8px' }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: stat.change.startsWith('+') ? '#10b981' : '#666' }}>
                {stat.change}
              </span>
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>{stat.value}</h3>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        {/* Incidents Trend */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Incidents Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="incidents" stroke="#3b82f6" strokeWidth={2} name="Incidents" />
              <Line type="monotone" dataKey="sos" stroke="#ef4444" strokeWidth={2} name="SOS Alerts" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Incident Categories</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data.categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {data.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        {/* Officer Performance */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Officer Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.officerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="officer" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="incidents" fill="#3b82f6" name="Reported" />
              <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Distribution */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Incidents by Hour</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={2} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Bar dataKey="count" fill="#8b5cf6" name="Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        {/* Priority Breakdown */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.priorityData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Bar dataKey="value" fill="#f59e0b" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hotspot Zones */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Hotspot Areas</h3>
          <div style={{ marginTop: '20px' }}>
            {data.hotspotData.map((zone, idx) => {
              const maxIncidents = Math.max(...data.hotspotData.map(z => z.incidents));
              const percentage = (zone.incidents / maxIncidents) * 100;
              
              return (
                <div key={idx} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>{zone.zone}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{zone.incidents} incidents</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '12px',
                        borderRadius: '10px',
                        width: `${percentage}%`,
                        backgroundColor: percentage > 80 ? '#ef4444' : percentage > 50 ? '#f59e0b' : '#10b981',
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '11px', color: '#6b7280' }}>
              🔴 Critical (&gt;80%) &nbsp; 🟠 High (&gt;50%) &nbsp; 🟢 Normal
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
        <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '10px', padding: '20px', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h4 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', opacity: 0.9 }}>Most Active Zone</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>Zone B</p>
          <p style={{ fontSize: '13px', opacity: 0.8 }}>62 incidents this month</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '10px', padding: '20px', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h4 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', opacity: 0.9 }}>Resolution Rate</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>87.5%</p>
          <p style={{ fontSize: '13px', opacity: 0.8 }}>↑ 5% from last month</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '10px', padding: '20px', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h4 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', opacity: 0.9 }}>Peak Activity Time</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>14:00 - 18:00</p>
          <p style={{ fontSize: '13px', opacity: 0.8 }}>Afternoon patrol hours</p>
        </div>
      </div>
    </Dashboard>
  );
};

export default Analytics;