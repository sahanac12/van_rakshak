import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { ShieldAlert, AlertTriangle, MapPin, Clock, Phone, User, CheckCircle, X } from 'lucide-react';

const SOS = () => {
  const [sosAlerts, setSosAlerts] = useState([
    {
      id: 'SOS-001',
      officer: 'Officer 100231',
      location: 'Gajraj Point',
      coordinates: '12.9850°N, 77.6100°E',
      timestamp: '2026-01-19 10:45:23',
      status: 'Active',
      priority: 'Critical',
      type: 'Emergency',
      description: 'Officer in distress - possible wildlife encounter',
      duration: '12 mins',
      respondersDispatched: 2,
      contact: '+91-98765-43210'
    },
    {
      id: 'SOS-002',
      officer: 'Officer 100445',
      location: 'North Trail',
      coordinates: '12.9720°N, 77.5950°E',
      timestamp: '2026-01-19 09:30:15',
      status: 'Responding',
      priority: 'High',
      type: 'Medical',
      description: 'Officer injured - requires medical assistance',
      duration: '1 hr 27 mins',
      respondersDispatched: 3,
      contact: '+91-98765-43211'
    }
  ]);

  const [resolvedCount, setResolvedCount] = useState(3);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [flashingAlert, setFlashingAlert] = useState(true);

  // Flashing effect for active alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashingAlert(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (alertId) => {
    setSosAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, status: 'Responding' } : alert
    ));
  };

  const handleResolve = (alertId) => {
    if (window.confirm('Mark this SOS alert as resolved?')) {
      setSosAlerts(prev => prev.filter(alert => alert.id !== alertId));
      setResolvedCount(prev => prev + 1);
      setSelectedAlert(null);
    }
  };

  const handleDispatchUnit = (alertId) => {
    setSosAlerts(prev => prev.map(alert =>
      alert.id === alertId 
        ? { ...alert, respondersDispatched: alert.respondersDispatched + 1 }
        : alert
    ));
    alert('Emergency unit dispatched!');
  };

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'Critical':
        return { bg: '#fef2f2', border: '#dc2626', text: '#dc2626' };
      case 'High':
        return { bg: '#fff7ed', border: '#ea580c', text: '#ea580c' };
      case 'Medium':
        return { bg: '#fffbeb', border: '#f59e0b', text: '#f59e0b' };
      default:
        return { bg: '#f0fdf4', border: '#16a34a', text: '#16a34a' };
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#dc2626';
      case 'Responding': return '#f59e0b';
      case 'Resolved': return '#16a34a';
      default: return '#666';
    }
  };

  const activeAlertsCount = sosAlerts.filter(a => a.status === 'Active').length;
  const respondingCount = sosAlerts.filter(a => a.status === 'Responding').length;

  return (
    <Dashboard>
      <div>
        {/* Header with Stats */}
        <div style={{ 
          background: activeAlertsCount > 0 && flashingAlert ? '#dc2626' : '#1a472a',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '25px',
          transition: 'background 0.3s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={32} />
                Emergency SOS Management
              </h2>
              <p style={{ margin: 0, opacity: 0.9 }}>
                Real-time emergency alert monitoring and response coordination
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{activeAlertsCount}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Active</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{respondingCount}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Responding</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{resolvedCount}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Resolved Today</div>
              </div>
            </div>
          </div>
        </div>

        {sosAlerts.length === 0 ? (
          <div style={{ 
            background: 'white', 
            padding: '60px', 
            borderRadius: '12px', 
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <CheckCircle size={64} color="#16a34a" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>All Clear</h3>
            <p style={{ color: '#666', margin: 0 }}>
              No active SOS alerts at the moment. All officers are safe.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {sosAlerts.map(alert => {
              const priorityStyle = getPriorityStyle(alert.priority);
              const isActive = alert.status === 'Active';
              
              return (
                <div 
                  key={alert.id}
                  style={{
                    background: 'white',
                    border: `3px solid ${priorityStyle.border}`,
                    borderRadius: '12px',
                    padding: '25px',
                    boxShadow: isActive ? '0 8px 20px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
                    animation: isActive && flashingAlert ? 'pulse 1s' : 'none'
                  }}
                >
                  {/* Alert Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: priorityStyle.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ShieldAlert size={28} color={priorityStyle.text} />
                      </div>
                      <div>
                        <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', color: priorityStyle.text }}>
                          {alert.id} - {alert.type} Emergency
                        </h3>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          <Clock size={14} style={{ display: 'inline', marginRight: '5px' }} />
                          {alert.timestamp} ({alert.duration} ago)
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: priorityStyle.bg,
                        color: priorityStyle.text,
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}>
                        {alert.priority} Priority
                      </span>
                      <span style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: getStatusColor(alert.status) + '20',
                        color: getStatusColor(alert.status),
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}>
                        {alert.status}
                      </span>
                    </div>
                  </div>

                  {/* Alert Details */}
                  <div style={{ 
                    background: '#f8fafc', 
                    padding: '20px', 
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: '600' }}>
                          <User size={14} style={{ display: 'inline', marginRight: '5px' }} />
                          OFFICER
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>{alert.officer}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: '600' }}>
                          <MapPin size={14} style={{ display: 'inline', marginRight: '5px' }} />
                          LOCATION
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>{alert.location}</div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{alert.coordinates}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: '600' }}>
                          <Phone size={14} style={{ display: 'inline', marginRight: '5px' }} />
                          CONTACT
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '15px', color: '#2563eb' }}>{alert.contact}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: '600' }}>
                          🚨 RESPONDERS
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>
                          {alert.respondersDispatched} units dispatched
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e0e0e0' }}>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: '600' }}>
                        <AlertTriangle size={14} style={{ display: 'inline', marginRight: '5px' }} />
                        DESCRIPTION
                      </div>
                      <div style={{ fontSize: '14px', lineHeight: '1.6' }}>{alert.description}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {alert.status === 'Active' && (
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        style={{
                          padding: '12px 24px',
                          background: '#2563eb',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <CheckCircle size={18} />
                        Acknowledge & Respond
                      </button>
                    )}

                    <button
                      onClick={() => handleDispatchUnit(alert.id)}
                      style={{
                        padding: '12px 24px',
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      🚁 Dispatch Additional Unit
                    </button>

                    <button
                      onClick={() => setSelectedAlert(alert)}
                      style={{
                        padding: '12px 24px',
                        background: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <MapPin size={18} />
                      View on Map
                    </button>

                    <button
                      onClick={() => window.open(`tel:${alert.contact}`)}
                      style={{
                        padding: '12px 24px',
                        background: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Phone size={18} />
                      Call Officer
                    </button>

                    <button
                      onClick={() => handleResolve(alert.id)}
                      style={{
                        padding: '12px 24px',
                        background: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginLeft: 'auto'
                      }}
                    >
                      <CheckCircle size={18} />
                      Mark as Resolved
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Emergency Protocols */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          marginTop: '25px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ marginTop: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            📋 Emergency Response Protocols
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', fontSize: '14px' }}>
            <div style={{ padding: '15px', background: '#fef2f2', borderRadius: '8px', borderLeft: '4px solid #dc2626' }}>
              <strong>Critical:</strong> Immediate dispatch + Medical team + Backup units
            </div>
            <div style={{ padding: '15px', background: '#fff7ed', borderRadius: '8px', borderLeft: '4px solid #ea580c' }}>
              <strong>High:</strong> Priority dispatch + Nearest units respond
            </div>
            <div style={{ padding: '15px', background: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <strong>Medium:</strong> Standard response + Monitor situation
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default SOS;