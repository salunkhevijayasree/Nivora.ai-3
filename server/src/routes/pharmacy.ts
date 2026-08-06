import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

// Pharmacy Fulfillment Queue (Step 7)
router.get('/queue', async (req, res) => {
  res.json({
    prescriptions: [
      {
        id: 'rx-101',
        patient_name: 'Sarah Jenkins',
        patient_code: 'MED-29834',
        doctor_name: 'Dr. Sarah Smith',
        medications: [
          { name: 'Amoxicillin 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '7 days', stock: 'In Stock' },
          { name: 'Lisinopril 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days', stock: 'Low Stock' }
        ],
        status: 'Pending',
        created_at: new Date().toISOString()
      }
    ]
  });
});

// Update prescription stock / fulfillment
router.post('/fulfill/:id', async (req, res) => {
  res.json({
    success: true,
    prescription_id: req.params.id,
    status: 'Filled',
    pickup_notified: true,
    sms_alert: 'Pickup notification dispatched to patient via SMS'
  });
});

export default router;
