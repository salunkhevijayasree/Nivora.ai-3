import { Router } from 'express';
import { verifyInsurance } from '../services/gemini';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

// AI Insurance Verification (Step 5)
router.post('/verify', async (req, res) => {
  try {
    const { document_text, visit_id, provider_name, policy_number } = req.body;

    const aiVerification = await verifyInsurance(
      document_text || `Insurance policy for ${provider_name || 'Star Health'} policy #${policy_number || 'SH-889432'} covers outpatient consultations, diagnostic lab tests, and cardiology care.`
    );

    const claimData = {
      visit_id: visit_id || 'e0000001-0000-0000-0000-000000000001',
      provider_name: provider_name || 'Star Health Insurance',
      policy_number: policy_number || 'SH-2026-889432',
      status: aiVerification.status,
      confidence_score: aiVerification.confidenceScore,
      covered_amount: aiVerification.coveredAmount || 5000.00,
      ai_notes: aiVerification.notes
    };

    const { data: claim } = await supabaseAdmin
      .from('insurance_claims')
      .insert([claimData])
      .select()
      .single();

    res.json({
      success: true,
      claim: claim || claimData,
      verification: aiVerification
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
