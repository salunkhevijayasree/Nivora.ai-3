import { Router } from 'express';

const router = Router();

// Get patient medical records
router.get('/', async (req, res) => {
  res.json({
    records: [
      { id: 1, title: 'Complete Blood Count (CBC)', date: '2026-08-01', type: 'Lab Report', doctor: 'Dr. James Wilson', file_url: '/reports/cbc.pdf' },
      { id: 2, title: 'Cardiology Consultation', date: '2026-07-28', type: 'Discharge Summary', doctor: 'Dr. Sarah Smith', file_url: '/summaries/cardio.pdf' },
      { id: 3, title: 'Chest X-Ray', date: '2026-07-25', type: 'Imaging', doctor: 'Dr. Alan Parker', file_url: '/scans/xray.dcom' },
      { id: 4, title: 'Prescription - Amoxicillin', date: '2026-07-20', type: 'Prescription', doctor: 'Dr. Emily Chen', file_url: '/rx/amox.pdf' }
    ]
  });
});

export default router;
