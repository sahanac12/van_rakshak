import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Play, Pause, MapPin, User, Clock, Route, Battery, Signal } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Patrols = () => {
  const [activeOfficers, setActiveOfficers] = useState([
    { 
      id: 1, 
      name: "Officer Rajesh Kumar", 
      badgeId: "100449",
      lat: 12.9716, 
      lng: 77.5946, 
      status: "On Duty",
      zone: "North Sector",
      patrolStart: "08:30 AM",
      lastUpdate: "2 mins ago",
      battery: 85,
      signalStrength: 4,
      routePoints: [
        [12.9716, 77.5946],
        [12.9730, 77.5960],
        [12.9745, 77.5975]
      ]
    },
    { 
      id: 2, 
      name: "Officer Amit Sharma", 
      badgeId: "100587",
      lat: 12.9800, 
      lng: 77.6000, 
      status: "Patrolling",
      zone: "Central Forest",
      patrolStart: "07:00 AM",
      lastUpdate: "5 mins ago",
      battery: 62,
      signalStrength: 3,
      routePoints: [
        [12.9800, 77.6000],
        [12.9815, 77.6015],
        [12.9830, 77.6030]
      ]
    },
    { 
      id: 3, 
      name: "Officer Priya Singh", 
      badgeId: "100231",
      lat: 12.9650, 
      lng: 77.5900, 
      status: "Break",
      zone: "South Sector",
      patrolStart: "06:30 AM",
      lastUpdate: "15 mins ago",
      battery: 45,
      signalStrength: 2,
      routePoints: [
        [12.9650, 77.5900],
        [12.9665, 77.5915]
      ]
    }
  ]);

  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [mapView, setMapView] = useState('standard');

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'on duty': return '#16a34a';
      case 'patrolling': return '#2563eb';
      case 'break': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#666';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 60) return '#16a34a';
    if (battery > 30) return '#f59e0b';
    return '#dc2626';
  };

  const getSignalBars = (strength) => {
    return '📶'.repeat(strength) + '📵'.repeat(4 - strength);
  };

  return (
    <Dashboard>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>🛰️ Live Patrol Monitoring</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={showRoutes} 
                onChange={(e) => setShowRoutes(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              Show Routes
            </label>
            <select 
              value={mapView}
              onChange={(e) => setMapView(e.target.value)}
              style={{ 
                padding: '8px 12px', 
                borderRadius: '6px', 
                border: '1px solid #ddd',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="standard">Standard View</option>
              <option value="satellite">Satellite View</option>
              <option value="terrain">Terrain View</option>
            </select>
          </div>
        </div>

        {/* Officers Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px' }}>
          {/* Officers List */}
          <div style={{ 
            background: 'white', 
            borderRadius: '10px', 
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '15px', fontSize: '16px' }}>
              Active Officers ({activeOfficers.length})
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeOfficers.map(officer => (
                <div 
                  key={officer.id}
                  onClick={() => setSelectedOfficer(officer)}
                  style={{ 
                    padding: '15px',
                    border: selectedOfficer?.id === officer.id ? '2px solid #2563eb' : '2px solid #f0f0f0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedOfficer?.id === officer.id ? '#eff6ff' : 'white'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>
                        {officer.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Badge: {officer.badgeId}
                      </div>
                    </div>
                    <span style={{ 
                      fontSize: '11px',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      background: getStatusColor(officer.status),
                      color: 'white',
                      fontWeight: '600'
                    }}>
                      {officer.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#666', display: 'grid', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={12} />
                      {officer.zone}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={12} />
                      Started: {officer.patrolStart} • Updated: {officer.lastUpdate}
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginTop: '10px',
                    paddingTop: '10px',
                    borderTop: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                      <Battery size={14} color={getBatteryColor(officer.battery)} />
                      <span style={{ color: getBatteryColor(officer.battery), fontWeight: '600' }}>
                        {officer.battery}%
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                      <Signal size={14} />
                      <span>{getSignalBars(officer.signalStrength)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ 
            background: 'white', 
            borderRadius: '10px', 
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            height: '600px',
            position: 'relative'
          }}>
            <MapContainer 
              center={[12.9716, 77.5946]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer 
                url={
                  mapView === 'satellite' 
                    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    : mapView === 'terrain'
                    ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
              />
              
              {activeOfficers.map(officer => (
                <React.Fragment key={officer.id}>
                  <Marker 
                    position={[officer.lat, officer.lng]}
                    eventHandlers={{
                      click: () => setSelectedOfficer(officer)
                    }}
                  >
                    <Popup>
                      <div style={{ minWidth: '200px' }}>
                        <strong>{officer.name}</strong><br/>
                        Badge: {officer.badgeId}<br/>
                        Status: <span style={{ color: getStatusColor(officer.status), fontWeight: 'bold' }}>{officer.status}</span><br/>
                        Zone: {officer.zone}<br/>
                        Battery: {officer.battery}%
                      </div>
                    </Popup>
                  </Marker>
                  
                  {showRoutes && (
                    <Polyline 
                      positions={officer.routePoints}
                      color={getStatusColor(officer.status)}
                      weight={3}
                      opacity={0.6}
                    />
                  )}
                </React.Fragment>
              ))}
            </MapContainer>

            {/* Map Legend */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              background: 'white',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              fontSize: '12px',
              zIndex: 1000
            }}>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Legend</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#16a34a' }}></div>
                  On Duty
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2563eb' }}></div>
                  Patrolling
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                  Break
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Officer Details */}
        {selectedOfficer && (
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '10px', 
            marginTop: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '15px' }}>
              Officer Details: {selectedOfficer.name}
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Current Location</div>
                <div style={{ fontWeight: '600' }}>
                  {selectedOfficer.lat.toFixed(4)}°N, {selectedOfficer.lng.toFixed(4)}°E
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Patrol Duration</div>
                <div style={{ fontWeight: '600' }}>
                  Started at {selectedOfficer.patrolStart}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Route Progress</div>
                <div style={{ fontWeight: '600' }}>
                  {selectedOfficer.routePoints.length} checkpoints covered
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Device Status</div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ fontWeight: '600', color: getBatteryColor(selectedOfficer.battery) }}>
                    🔋 {selectedOfficer.battery}%
                  </span>
                  <span style={{ fontWeight: '600' }}>
                    📶 {selectedOfficer.signalStrength}/4
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button style={{
                padding: '8px 16px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                Send Message
              </button>
              <button style={{
                padding: '8px 16px',
                background: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                View History
              </button>
              <button style={{
                padding: '8px 16px',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                Request Update
              </button>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Patrols;