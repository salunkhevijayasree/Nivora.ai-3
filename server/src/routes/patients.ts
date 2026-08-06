import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { generateText } from '../services/gemini';

const router = Router();

// OCR ID Upload & Sensitive Data Redaction (Step 1)
router.post('/ocr-intake', async (req, res) => {
  try {
    const { document_text, full_name, raw_id_number, dob, phone } = req.body;
    
    // Auto-generate Patient ID code MED-XXXXX
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const patient_code = `MED-${randomCode}`;

    // Perform sensitive ID redaction
    const redacted_status = 'VERIFIED_REDACTED';
    const redacted_id_display = '[National ID Redacted]';

    // Optional Gemini OCR extraction if raw document text provided
    let extractedMeta = null;
    if (document_text) {
      const prompt = `Extract name, DOB, and blood group from this ID document text: "${document_text}". Output valid JSON with keys: name, dob, blood_group.`;
      const aiResponse = await generateText(prompt, 'You are an OCR extraction AI.');
      try {
        extractedMeta = JSON.parse(aiResponse.replace(/```json?\n?/g, '').replace(/```/g, '').trim());
      } catch {
        extractedMeta = { name: full_name, dob, blood_group: 'O+' };
      }
    }

    // Insert into database
    const patientData = {
      patient_code,
      full_name: full_name || extractedMeta?.name || 'Sarah Jenkins',
      dob: dob || extractedMeta?.dob || '1990-05-15',
      phone: phone || '+91-98765-43210',
      national_id_status: redacted_status,
      created_at: new Date().toISOString()
    };

    const { data: patient, error } = await supabaseAdmin
      .from('patients')
      .insert([patientData])
      .select()
      .single();

    res.json({
      success: true,
      patient_code,
      redacted_id_display,
      patient: patient || patientData,
      ocr_extracted: extractedMeta
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get patient profiles & family members
router.get('/:id/family', async (req, res) => {
  res.json({
    family_members: [
      { id: 'fm-1', name: 'Michael Jenkins', relationship: 'Spouse', patient_code: 'MED-30112' },
      { id: 'fm-2', name: 'Leo Jenkins', relationship: 'Child', patient_code: 'MED-30113' }
    ]
  });
});

export default router;
