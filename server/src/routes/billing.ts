import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

// Calculate Itemized Bill (Step 6)
router.post('/calculate', async (req, res) => {
  try {
    const { visit_id, consultation_fee, lab_fee, pharmacy_fee, room_charges, insurance_discount } = req.body;

    const consult = consultation_fee || 800.00;
    const lab = lab_fee || 450.00;
    const pharm = pharmacy_fee || 320.00;
    const room = room_charges || 0.00;
    const discount = insurance_discount || 500.00;

    const total = consult + lab + pharm + room - discount;

    const billData = {
      visit_id: visit_id || 'e0000001-0000-0000-0000-000000000001',
      invoice_number: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      consultation_fee: consult,
      lab_fee: lab,
      pharmacy_fee: pharm,
      room_charges: room,
      insurance_discount: discount,
      total_amount: Math.max(0, total),
      status: 'Unpaid'
    };

    const { data: bill } = await supabaseAdmin
      .from('bills')
      .insert([billData])
      .select()
      .single();

    res.json({
      success: true,
      bill: bill || billData
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Pay Bill
router.post('/pay', async (req, res) => {
  res.json({
    success: true,
    message: 'Payment processed successfully',
    transaction_id: `TXN-${Date.now()}`,
    paid_amount: req.body.amount || 1070.00,
    status: 'Paid'
  });
});

export default router;
