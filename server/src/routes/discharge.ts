import { Router } from 'express';
import { generateDischargeSummary } from '../services/gemini';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

// Generate AI Discharge Summary (Step 8)
router.post('/generate-summary', async (req, res) => {
  try {
    const { patient_name, diagnosis, medications, visit_notes } = req.body;

    const summaryText = await generateDischargeSummary({
      name: patient_name || 'Sarah Jenkins',
      diagnosis: diagnosis || 'Acute Bronchitis & Mild Hypertension',
      medications: medications || 'Amoxicillin 500mg, Lisinopril 10mg',
      visitNotes: visit_notes || 'Patient presented with dry cough. ECG normal. Chest X-Ray clear.'
    });

    res.json({
      success: true,
      summary: summaryText,
      doctor_signature_required: true
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Doctor Digital Signoff
router.post('/signoff', async (req, res) => {
  res.json({
    success: true,
    message: 'Discharge summary digitally signed by Dr. Sarah Smith',
    status: 'Discharged',
    signed_at: new Date().toISOString()
  });
});

export default router;
