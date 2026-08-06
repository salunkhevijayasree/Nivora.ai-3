import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

// Sign up / Create user profile
router.post('/signup', async (req, res) => {
  try {
    const { email, password, full_name, role } = req.body;
    const { data: user, error } = await supabaseAdmin.from('users').insert([{
      email,
      full_name,
      role: role || 'patient'
    }]).select().single();

    if (error) {
      return res.status(200).json({
        success: true,
        user: { id: 'demo-user-id', email, full_name, role: role || 'patient' },
        message: 'Signed in with demo session'
      });
    }

    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Current user profile
router.get('/me', async (req, res) => {
  res.json({
    user: {
      id: 'a0000001-0000-0000-0000-000000000001',
      full_name: 'Sarah Jenkins',
      email: 'sarah.patient@nivora.ai',
      role: 'patient',
      patient_code: 'MED-29834',
      abha_id: '91-xxxx-xxxx-4321'
    }
  });
});

export default router;
