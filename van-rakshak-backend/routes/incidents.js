const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// Get All Incidents
router.get('/', async (req, res) => {
  try {
    const { status, type, severity } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (severity) filter.severity = severity;

    const incidents = await Incident.find(filter)
      .populate('reportedBy', 'name badgeNumber')
      .sort({ timestamp: -1 });

    res.json({
      success: true,
      incidents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create Incident (from mobile app)
router.post('/', async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    
    const populatedIncident = await Incident.findById(incident._id)
      .populate('reportedBy', 'name badgeNumber');

    res.status(201).json({
      success: true,
      incident: populatedIncident
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update Incident
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes, severity } = req.body;
    const update = {};

    if (status) update.status = status;
    if (notes) update.notes = notes;
    if (severity) update.severity = severity;
    if (status === 'resolved') update.resolvedAt = new Date();

    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    ).populate('reportedBy', 'name badgeNumber');

    res.json({
      success: true,
      incident
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete Incident
router.delete('/:id', async (req, res) => {
  try {
    await Incident.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Incident deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;