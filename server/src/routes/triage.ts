import { Router } from 'express';
import { analyzeSymptoms } from '../services/gemini';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

// AI Symptom Triage (Step 2)
router.post('/analyze', async (req, res) => {
  try {
    const { symptoms, patient_id } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: 'Symptoms text or transcribed speech is required.' });
    }

    // Call Gemini 2.5 AI SDK Service
    const aiResult = await analyzeSymptoms(symptoms);

    // Record visit episode in database
    const visitData = {
      patient_id: patient_id || 'b0000001-0000-0000-0000-000000000001',
      symptom_summary: symptoms,
      triage_priority: aiResult.priority,
      department: aiResult.department,
      estimated_wait_min: aiResult.waitTimeMinutes,
      status: 'Triaged',
      ai_analysis: JSON.stringify(aiResult)
    };

    const { data: visit } = await supabaseAdmin
      .from('visits')
      .insert([visitData])
      .select()
      .single();

    res.json({
      success: true,
      triage: aiResult,
      visit: visit || visitData
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
