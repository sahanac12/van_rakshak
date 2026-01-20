import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, MapPin, Clock, AlertCircle } from 'lucide-react';

const Incidents = () => {
  const [incidents, setIncidents] = useState([
    { 
      id: "INC-001", 
      type: "Poaching", 
      location: "North Zone", 
      priority: "High", 
      status: "Open",
      reportedBy: "Officer 100234",
      reportedAt: "2026-01-19 08:30",
      description: "Suspicious activity detected near elephant corridor",
      coordinates: "12.9716°N, 77.5946°E",
      images: 2
    },
    { 
      id: "INC-002", 
      type: "Wildfire", 
      location: "Central Forest", 
      priority: "Critical", 
      status: "In Progress",
      reportedBy: "Officer 100456",
      reportedAt: "2026-01-19 09:15",
      description: "Small fire spreading near Zone C",
      coordinates: "12.9800°N, 77.6000°E",
      images: 5
    },
    { 
      id: "INC-003", 
      type: "Illegal Logging", 
      location: "South Sector", 
      priority: "Medium", 
      status: "Open",
      reportedBy: "Officer 100789",
      reportedAt: "2026-01-19 07:45",
      description: "Fresh tree cutting marks found",
      coordinates: "12.9500°N, 77.5800°E",
      images: 3
    },
    { 
      id: "INC-004", 
      type: "Wildlife Sighting", 
      location: "East Boundary", 
      priority: "Low", 
      status: "Resolved",
      reportedBy: "Officer 100321",
      reportedAt: "2026-01-18 16:20",
      description: "Tiger spotted near village border",
      coordinates: "12.9900°N, 77.6200°E",
      images: 1
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#f59e0b';
      case 'low': return '#16a34a';
      default: return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'open': return '#3b82f6';
      case 'in progress': return '#f59e0b';
      case 'resolved': return '#16a34a';
      case 'closed': return '#6b7280';
      default: return '#666';
    }
  };

  const handleStatusChange = (incidentId, newStatus) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId ? { ...inc, status: newStatus } : inc
    ));
  };

  const handleDeleteIncident = (incidentId) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      setIncidents(prev => prev.filter(inc => inc.id !== incidentId));
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ['ID', 'Type', 'Location', 'Priority', 'Status', 'Reported By', 'Reported At'],
      ...filteredIncidents.map(inc => [
        inc.id, inc.type, inc.location, inc.priority, inc.status, inc.reportedBy, inc.reportedAt
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incidents_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Filter and sort incidents
  let filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inc.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || inc.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || inc.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (sortBy === 'newest') {
    filteredIncidents.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));
  } else if (sortBy === 'oldest') {
    filteredIncidents.sort((a, b) => new Date(a.reportedAt) - new Date(b.reportedAt));
  } else if (sortBy === 'priority') {
    const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
    filteredIncidents.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  return (
    <Dashboard>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>📝 Incident Management</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleExportData}
              style={{ 
                padding: '10px 16px', 
                background: '#16a34a', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '500'
              }}
            >
              <Download size={16} /> Export
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              style={{ 
                padding: '10px 16px', 
                background: '#2563eb', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '500'
              }}
            >
              <Plus size={16} /> New Incident
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                <Search size={14} style={{ display: 'inline', marginRight: '5px' }} />
                Search
              </label>
              <input 
                type="text"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '6px', 
                  border: '1px solid #ddd',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                <Filter size={14} style={{ display: 'inline', marginRight: '5px' }} />
                Status
              </label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '6px', 
                  border: '1px solid #ddd',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '5px' }} />
                Priority
              </label>
              <select 
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '6px', 
                  border: '1px solid #ddd',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                Sort By
              </label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '6px', 
                  border: '1px solid #ddd',
                  cursor: 'pointer'
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">By Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
          Showing {filteredIncidents.length} of {incidents.length} incidents
        </div>

        {/* Incidents Table */}
        <div style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#e8f5e9', textAlign: 'left' }}>
                <th style={{ padding: '15px', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '15px', fontWeight: '600' }}>Type</th>
                <th style={{ padding: '15px', fontWeight: '600' }}>Location</th>
                <th style={{ padding: '15px', fontWeight: '600' }}>Priority</th>
                <th style={{ padding: '15px', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '15px', fontWeight: '600' }}>Reported</th>
                <th style={{ padding: '15px', fontWeight: '600', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map(inc => (
                <tr key={inc.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '15px', fontWeight: '600', color: '#2563eb' }}>{inc.id}</td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{inc.type}</span>
                      {inc.images > 0 && (
                        <span style={{ 
                          fontSize: '11px', 
                          background: '#f0f0f0', 
                          padding: '2px 6px', 
                          borderRadius: '4px' 
                        }}>
                          📷 {inc.images}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} color="#666" />
                      {inc.location}
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      color: getPriorityColor(inc.priority),
                      fontWeight: '600',
                      background: `${getPriorityColor(inc.priority)}15`,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '13px'
                    }}>
                      {inc.priority}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <select
                      value={inc.status}
                      onChange={(e) => handleStatusChange(inc.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: `2px solid ${getStatusColor(inc.status)}`,
                        background: `${getStatusColor(inc.status)}15`,
                        color: getStatusColor(inc.status),
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td style={{ padding: '15px', fontSize: '13px', color: '#666' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} />
                      {new Date(inc.reportedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => setSelectedIncident(inc)}
                        style={{
                          padding: '6px 10px',
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px'
                        }}
                        title="View Details"
                      >
                        <Eye size={14} /> View
                      </button>
                      <button
                        onClick={() => handleDeleteIncident(inc.id)}
                        style={{
                          padding: '6px 10px',
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px'
                        }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredIncidents.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
              No incidents found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedIncident && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ marginTop: 0, color: '#1a472a' }}>Incident Details: {selectedIncident.id}</h3>
            
            <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
              <div>
                <strong>Type:</strong> {selectedIncident.type}
              </div>
              <div>
                <strong>Location:</strong> {selectedIncident.location}
              </div>
              <div>
                <strong>Coordinates:</strong> {selectedIncident.coordinates}
              </div>
              <div>
                <strong>Priority:</strong> <span style={{ color: getPriorityColor(selectedIncident.priority), fontWeight: 'bold' }}>{selectedIncident.priority}</span>
              </div>
              <div>
                <strong>Status:</strong> <span style={{ color: getStatusColor(selectedIncident.status), fontWeight: 'bold' }}>{selectedIncident.status}</span>
              </div>
              <div>
                <strong>Reported By:</strong> {selectedIncident.reportedBy}
              </div>
              <div>
                <strong>Reported At:</strong> {selectedIncident.reportedAt}
              </div>
              <div>
                <strong>Description:</strong>
                <p style={{ marginTop: '5px', padding: '10px', background: '#f8fafc', borderRadius: '6px' }}>
                  {selectedIncident.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedIncident(null)}
              style={{
                padding: '10px 20px',
                background: '#1a472a',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                width: '100%',
                fontWeight: '600'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default Incidents;