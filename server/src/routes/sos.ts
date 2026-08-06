import { Router } from 'express';

const router = Router();

// Trigger One-Tap SOS Alert
router.post('/trigger', async (req, res) => {
  const { latitude, longitude, patient_id } = req.body;

  res.json({
    success: true,
    sos_id: `SOS-${Date.now()}`,
    status: 'Dispatched',
    ambulance_id: 'AMB-104',
    eta_minutes: 8,
    gps_coordinates: {
      latitude: latitude || 12.9716,
      longitude: longitude || 77.5946
    },
    message: 'Ambulance AMB-104 dispatched. High priority ER bed pre-booked.'
  });
});

export default router;
