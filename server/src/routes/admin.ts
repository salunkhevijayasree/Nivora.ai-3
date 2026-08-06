import { Router } from 'express';

const router = Router();

// Executive Predictive Analytics Dashboard
router.get('/analytics', async (req, res) => {
  res.json({
    bed_occupancy: {
      total_beds: 150,
      occupied: 112,
      available: 38,
      occupancy_rate: '74.6%',
      by_ward: [
        { ward: 'General Ward A', occupied: 18, total: 20 },
        { ward: 'General Ward B', occupied: 15, total: 20 },
        { ward: 'ICU', occupied: 5, total: 6 },
        { ward: 'Private Wing', occupied: 12, total: 15 },
        { ward: 'Emergency', occupied: 4, total: 10 }
      ]
    },
    inflow_prediction_24h: {
      predicted_patients: 145,
      peak_hours: '10:00 AM - 01:00 PM',
      emergency_expected: 18
    },
    staff_workload: [
      { department: 'Cardiology', active_patients: 34, doctor_count: 5, load: 'High' },
      { department: 'Neurology', active_patients: 22, doctor_count: 4, load: 'Medium' },
      { department: 'Pediatrics', active_patients: 41, doctor_count: 6, load: 'High' },
      { department: 'Orthopedics', active_patients: 15, doctor_count: 3, load: 'Optimal' }
    ],
    financial_overview: {
      daily_revenue: 48500.00,
      pending_insurance_claims: 12400.00,
      collection_rate: '91.2%'
    }
  });
});

export default router;
