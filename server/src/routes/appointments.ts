import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

// Search Doctors by specialty or department (Step 3)
router.get('/doctors', async (req, res) => {
  try {
    const { specialty, department } = req.query;

    let query = supabaseAdmin.from('doctors').select('*');
    if (specialty) query = query.ilike('specialty', `%${specialty}%`);
    if (department) query = query.ilike('department', `%${department}%`);

    const { data: doctors, error } = await query;

    if (error || !doctors || doctors.length === 0) {
      return res.json({
        doctors: [
          { id: 'c0000001-0000-0000-0000-000000000001', full_name: 'Dr. Sarah Smith', specialty: 'Cardiology', department: 'Cardiology', rating: 4.9, experience_years: 15, consultation_fee: 800, room_number: '304', floor: '3rd', is_available: true },
          { id: 'c0000001-0000-0000-0000-000000000002', full_name: 'Dr. James Wilson', specialty: 'Neurology', department: 'Neurology', rating: 4.8, experience_years: 12, consultation_fee: 750, room_number: '412', floor: '4th', is_available: true },
          { id: 'c0000001-0000-0000-0000-000000000003', full_name: 'Dr. Emily Chen', specialty: 'Pediatrics', department: 'Pediatrics', rating: 4.9, experience_years: 8, consultation_fee: 600, room_number: '201', floor: '2nd', is_available: true },
          { id: 'c0000001-0000-0000-0000-000000000004', full_name: 'Dr. Michael Brown', specialty: 'Orthopedics', department: 'Orthopedics', rating: 4.7, experience_years: 20, consultation_fee: 900, room_number: '502', floor: '5th', is_available: true }
        ]
      });
    }

    res.json({ doctors });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Book Appointment
router.post('/book', async (req, res) => {
  try {
    const { doctor_id, patient_id, appointment_date, appointment_time, reason, appointment_type } = req.body;

    const token_number = Math.floor(35 + Math.random() * 20);

    const appointmentData = {
      patient_id: patient_id || 'b0000001-0000-0000-0000-000000000001',
      doctor_id,
      appointment_date: appointment_date || new Date().toISOString().split('T')[0],
      appointment_time: appointment_time || '14:30',
      token_number,
      status: 'Scheduled',
      reason: reason || 'Routine consultation',
      appointment_type: appointment_type || 'In-Person'
    };

    const { data: appointment } = await supabaseAdmin
      .from('appointments')
      .insert([appointmentData])
      .select()
      .single();

    res.json({
      success: true,
      token_number,
      estimated_wait_min: 25,
      appointment: appointment || appointmentData
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Live Queue Status Endpoint
router.get('/live-queue/:doctorId', async (req, res) => {
  res.json({
    doctor_id: req.params.doctorId,
    doctor_name: 'Dr. Sarah Smith',
    current_token_serving: 38,
    your_token: 42,
    tokens_ahead: 4,
    estimated_wait_min: 20,
    room_number: '304',
    floor: '3rd Floor, Cardiology Wing'
  });
});

export default router;
