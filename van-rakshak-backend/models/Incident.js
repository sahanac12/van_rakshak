const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['fire', 'poaching', 'illegal-logging', 'wildlife-injury', 'encroachment', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: String
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['reported', 'investigating', 'resolved', 'false-alarm'],
    default: 'reported'
  },
  images: [String], // URLs to uploaded images
  timestamp: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date,
  notes: String
});

module.exports = mongoose.model('Incident', incidentSchema, 'incidents');