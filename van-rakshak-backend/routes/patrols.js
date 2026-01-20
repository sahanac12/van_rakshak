const express = require('express');
const router = express.Router();
const Patrol = require('../models/Patrol');
const PatrolLocation = require('../models/PatrolLocation');

// Get All Patrols
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const patrols = await Patrol.find(filter)
      .populate('officerId', 'name badgeNumber station')
      .sort({ startTime: -1 });

    res.json({
      success: true,
      patrols
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Start Patrol (from mobile app)
router.post('/start', async (req, res) => {
  try {
    const { officerId, area } = req.body;

    const patrol = new Patrol({
      officerId,
      area,
      status: 'active',
      startTime: new Date()
    });

    await patrol.save();
    const populatedPatrol = await Patrol.findById(patrol._id)
      .populate('officerId', 'name badgeNumber');

    res.status(201).json({
      success: true,
      patrol: populatedPatrol
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Add GPS Location to Patrol
router.post('/:id/location', async (req, res) => {
  try {
    const { location, accuracy, speed } = req.body;
    const patrol = await Patrol.findById(req.params.id);

    if (!patrol) {
      return res.status(404).json({
        success: false,
        message: 'Patrol not found'
      });
    }

    // Save location waypoint
    const patrolLocation = new PatrolLocation({
      patrolId: patrol._id,
      officerId: patrol.officerId,
      location,
      accuracy,
      speed
    });

    await patrolLocation.save();

    // Update patrol route
    patrol.route.push({
      ...location,
      timestamp: new Date()
    });

    await patrol.save();

    res.json({
      success: true,
      location: patrolLocation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// End Patrol
router.patch('/:id/end', async (req, res) => {
  try {
    const { distance, notes } = req.body;

    const patrol = await Patrol.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        endTime: new Date(),
        distance,
        notes
      },
      { new: true }
    ).populate('officerId', 'name badgeNumber');

    res.json({
      success: true,
      patrol
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get Patrol Locations
router.get('/:id/locations', async (req, res) => {
  try {
    const locations = await PatrolLocation.find({ patrolId: req.params.id })
      .sort({ timestamp: 1 });

    res.json({
      success: true,
      locations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;