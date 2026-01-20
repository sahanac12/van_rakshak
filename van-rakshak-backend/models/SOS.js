const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
  officerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
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
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'acknowledged', 'resolved'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['critical', 'high', 'medium'],
    default: 'critical'
  },
  notes: String,
  acknowledgedBy: String,
  acknowledgedAt: Date,
  resolvedAt: Date
});

module.exports = mongoose.model('SOS', sosSchema, 'sosalerts');