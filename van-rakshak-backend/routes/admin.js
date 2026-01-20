const express = require('express');
const router = express.Router();
const Officer = require('../models/Officer');
const SOS = require('../models/SOS');
const Incident = require('../models/Incident');
const Patrol = require('../models/Patrol');

// Get Dashboard Stats
router.get('/stats', async (req, res) => {
  try {
    const activeOfficers = await Officer.countDocuments({ status: 'active' });
    const activePatrols = await Patrol.countDocuments({ status: 'active' });
    const activeSOS = await SOS.countDocuments({ status: 'active' });
    const totalIncidents = await Incident.countDocuments();

    // Recent activity
    const recentIncidents = await Incident.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .populate('reportedBy', 'name badgeNumber');

    const recentSOS = await SOS.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .populate('officerId', 'name badgeNumber');

    res.json({
      success: true,
      stats: {
        activeOfficers,
        activePatrols,
        activeSOS,
        totalIncidents
      },
      recentActivity: {
        incidents: recentIncidents,
        sos: recentSOS
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get All Officers
router.get('/officers', async (req, res) => {
  try {
    const officers = await Officer.find().select('-password');
    res.json({
      success: true,
      officers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;