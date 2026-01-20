const mongoose = require('mongoose');

const patrolLocationSchema = new mongoose.Schema({
  patrolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patrol',
    required: true
  },
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
  accuracy: Number, // GPS accuracy in meters
  speed: Number, // Speed in km/h
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PatrolLocation', patrolLocationSchema, 'patrollocations');