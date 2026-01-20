const express = require('express');
const router = express.Router();
const SOS = require('../models/SOS');

// Get All SOS Alerts
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const sosAlerts = await SOS.find(filter)
      .populate('officerId', 'name badgeNumber phone')
      .sort({ timestamp: -1 });

    res.json({
      success: true,
      alerts: sosAlerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create SOS Alert (from mobile app)
router.post('/', async (req, res) => {
  try {
    const { officerId, location, notes } = req.body;

    const sos = new SOS({
      officerId,
      location,
      notes,
      priority: 'critical',
      status: 'active'
    });

    await sos.save();
    const populatedSOS = await SOS.findById(sos._id).populate('officerId', 'name badgeNumber');

    res.status(201).json({
      success: true,
      alert: populatedSOS
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update SOS Status
router.patch('/:id', async (req, res) => {
  try {
    const { status, acknowledgedBy, notes } = req.body;
    const update = { status, notes };

    if (status === 'acknowledged') {
      update.acknowledgedBy = acknowledgedBy;
      update.acknowledgedAt = new Date();
    } else if (status === 'resolved') {
      update.resolvedAt = new Date();
    }

    const sos = await SOS.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    ).populate('officerId', 'name badgeNumber');

    res.json({
      success: true,
      alert: sos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;