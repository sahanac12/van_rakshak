import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, ArrowRight } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Admin Portal',
      description: 'Access administrative dashboard for forest patrol management, incident tracking, and emergency response coordination.',
      icon: <Shield size={64} />,
      color: '#1a472a',
      gradient: 'linear-gradient(135deg, #1a472a 0%, #2e7d32 100%)',
      path: '/admin/login',
      features: [
        'Live Patrol Monitoring',
        'Incident Management',
        'SOS Emergency Alerts',
        'Analytics & Insights'
      ]
    },
    {
      title: 'Community Portal',
      description: 'Community members can report forest incidents, wildlife sightings, and receive alerts about forest activities.',
      icon: <Users size={64} />,
      color: '#2563eb',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
      path: '/community',
      features: [
        'Report Incidents',
        'Wildlife Alerts',
        'Forest Updates',
        'Community Chat'
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            color: 'white', 
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🌳 Van Rakshak
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.9)', 
            margin: 0,
            fontWeight: '300'
          }}>
            Forest Protection & Community Engagement Platform
          </p>
          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, #16a34a, #2563eb)',
            margin: '20px auto 0',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Role Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {roles.map((role, index) => (
            <div
              key={index}
              onClick={() => {
                if (role.path === '/community') {
                  // Opens community app in new tab
                  window.open('http://localhost:3001', '_blank');
                } else {
                  navigate(role.path);
                }
              }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
              }}
            >
              {/* Gradient Bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: role.gradient
              }}></div>

              {/* Icon */}
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                background: role.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginBottom: '25px',
                boxShadow: `0 10px 30px ${role.color}40`
              }}>
                {role.icon}
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: '28px',
                color: '#1a1a1a',
                margin: '0 0 15px 0',
                fontWeight: 'bold'
              }}>
                {role.title}
              </h2>

              {/* Description */}
              <p style={{
                fontSize: '15px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '25px'
              }}>
                {role.description}
              </p>

              {/* Features */}
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ 
                  fontSize: '14px', 
                  color: '#999', 
                  marginBottom: '15px',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  letterSpacing: '1px'
                }}>
                  Key Features
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {role.features.map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: '#555'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: role.color
                      }}></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button style={{
                width: '100%',
                padding: '15px',
                background: role.gradient,
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s'
              }}>
                Access {role.title.split(' ')[0]}
                <ArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '14px'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            Contributing to SDG 11 - Sustainable Communities and Environmental Protection
          </p>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>
            Secure • Real-time • Community-driven
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;