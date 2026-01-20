const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  badgeNumber: {
    type: String,
    required: true,
    unique: true
  },
  station: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on-leave'],
    default: 'active'
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    timestamp: Date
  },
  deviceToken: String, // For push notifications
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Officer', officerSchema, 'officers');