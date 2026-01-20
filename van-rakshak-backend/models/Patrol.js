const mongoose = require('mongoose');

const patrolSchema = new mongoose.Schema({
  officerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: Date,
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  },
  distance: {
    type: Number, // in kilometers
    default: 0
  },
  route: [{
    latitude: Number,
    longitude: Number,
    timestamp: Date
  }],
  notes: String,
  area: String // Forest area/sector name
});

module.exports = mongoose.model('Patrol', patrolSchema, 'patrols');