-- =====================================================
-- NIVORA AI - Seed Data
-- Run AFTER schema.sql to populate demo data
-- =====================================================

-- =====================================================
-- USERS (5 roles)
-- =====================================================
INSERT INTO users (id, email, role, full_name) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'sarah.patient@nivora.ai', 'patient', 'Sarah Jenkins'),
  ('a0000001-0000-0000-0000-000000000002', 'michael.patient@nivora.ai', 'patient', 'Michael Chen'),
  ('a0000001-0000-0000-0000-000000000003', 'priya.receptionist@nivora.ai', 'receptionist', 'Priya Sharma'),
  ('a0000001-0000-0000-0000-000000000004', 'dr.smith@nivora.ai', 'doctor', 'Dr. Sarah Smith'),
  ('a0000001-0000-0000-0000-000000000005', 'dr.wilson@nivora.ai', 'doctor', 'Dr. James Wilson'),
  ('a0000001-0000-0000-0000-000000000006', 'dr.chen@nivora.ai', 'doctor', 'Dr. Emily Chen'),
  ('a0000001-0000-0000-0000-000000000007', 'dr.brown@nivora.ai', 'doctor', 'Dr. Michael Brown'),
  ('a0000001-0000-0000-0000-000000000008', 'pharmacy@nivora.ai', 'pharmacy', 'Ravi Kumar'),
  ('a0000001-0000-0000-0000-000000000009', 'admin@nivora.ai', 'admin', 'Admin User');

-- =====================================================
-- PATIENTS
-- =====================================================
INSERT INTO patients (id, user_id, patient_code, full_name, dob, gender, phone, email, blood_group, abha_id, medical_history, allergies) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'MED-29834', 'Sarah Jenkins', '1990-05-15', 'Female', '+91-98765-43210', 'sarah.patient@nivora.ai', 'O+', '91-xxxx-xxxx-4321', 'Mild asthma since childhood. Annual cardiac screening since 2024.', 'Penicillin, Sulfa drugs'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000002', 'MED-30112', 'Michael Chen', '1985-11-22', 'Male', '+91-87654-32109', 'michael.patient@nivora.ai', 'A+', NULL, 'Type-2 Diabetes diagnosed 2022. Hypertension managed with Lisinopril.', 'None');

-- =====================================================
-- FAMILY MEMBERS
-- =====================================================
INSERT INTO family_members (primary_user_id, patient_id, relationship) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000002', 'Spouse');

-- =====================================================
-- DOCTORS
-- =====================================================
INSERT INTO doctors (id, user_id, full_name, specialty, department, qualification, experience_years, consultation_fee, room_number, floor, is_available, rating, total_reviews) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000004', 'Dr. Sarah Smith', 'Cardiology', 'Cardiology', 'MD, DM Cardiology', 15, 800.00, '304', '3rd', TRUE, 4.9, 234),
  ('c0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000005', 'Dr. James Wilson', 'Neurology', 'Neurology', 'MD, DM Neurology', 12, 750.00, '412', '4th', TRUE, 4.8, 189),
  ('c0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000006', 'Dr. Emily Chen', 'Pediatrics', 'Pediatrics', 'MD Pediatrics', 8, 600.00, '201', '2nd', TRUE, 4.9, 312),
  ('c0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000007', 'Dr. Michael Brown', 'Orthopedics', 'Orthopedics', 'MS Orthopedics', 20, 900.00, '502', '5th', TRUE, 4.7, 156);

-- =====================================================
-- DOCTOR SLOTS (Next 3 days)
-- =====================================================
INSERT INTO doctor_slots (doctor_id, slot_date, slot_time, is_booked) VALUES
  -- Dr. Smith slots
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE, '09:00', FALSE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE, '10:30', FALSE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE, '11:15', FALSE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE, '14:00', TRUE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE, '14:30', TRUE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE, '15:45', FALSE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE, '16:30', FALSE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE + 1, '09:00', FALSE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE + 1, '10:30', FALSE),
  ('c0000001-0000-0000-0000-000000000001', CURRENT_DATE + 1, '14:00', FALSE),
  -- Dr. Wilson slots
  ('c0000001-0000-0000-0000-000000000002', CURRENT_DATE, '09:30', FALSE),
  ('c0000001-0000-0000-0000-000000000002', CURRENT_DATE, '11:00', FALSE),
  ('c0000001-0000-0000-0000-000000000002', CURRENT_DATE, '14:30', FALSE),
  -- Dr. Chen slots
  ('c0000001-0000-0000-0000-000000000003', CURRENT_DATE, '10:00', FALSE),
  ('c0000001-0000-0000-0000-000000000003', CURRENT_DATE, '11:30', FALSE),
  ('c0000001-0000-0000-0000-000000000003', CURRENT_DATE, '15:00', FALSE),
  -- Dr. Brown slots
  ('c0000001-0000-0000-0000-000000000004', CURRENT_DATE, '09:00', FALSE),
  ('c0000001-0000-0000-0000-000000000004', CURRENT_DATE, '11:00', FALSE),
  ('c0000001-0000-0000-0000-000000000004', CURRENT_DATE, '14:00', FALSE);

-- =====================================================
-- APPOINTMENTS (Active demo data)
-- =====================================================
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, token_number, status, reason, appointment_type) VALUES
  ('d0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', CURRENT_DATE, '14:30', 42, 'Scheduled', 'Routine cardiac check-up, follow-up from last month', 'In-Person'),
  ('d0000001-0000-0000-0000-000000000002', 'b0000001-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000002', CURRENT_DATE + 1, '09:30', 5, 'Scheduled', 'Recurring headaches, dizziness', 'Telemedicine');

-- =====================================================
-- VISITS (Active workflow demo)
-- =====================================================
INSERT INTO visits (id, patient_id, doctor_id, appointment_id, symptom_summary, triage_priority, department, estimated_wait_min, status, vitals) VALUES
  ('e0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', 'd0000001-0000-0000-0000-000000000001', 'Mild chest discomfort after physical activity, occasional palpitations for the past week.', 'Medium', 'Cardiology', 25, 'Assigned', '{"bp": "130/85", "pulse": 78, "temp": "98.4°F", "spo2": 97}');

-- =====================================================
-- INSURANCE CLAIMS
-- =====================================================
INSERT INTO insurance_claims (visit_id, patient_id, provider_name, policy_number, member_name, coverage_type, status, confidence_score, covered_amount, copay_amount) VALUES
  ('e0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'Star Health Insurance', 'SH-2026-889432', 'Sarah Jenkins', 'Comprehensive Health', 'Approved', 92.50, 5000.00, 200.00);

-- =====================================================
-- BILLS
-- =====================================================
INSERT INTO bills (visit_id, patient_id, invoice_number, consultation_fee, lab_fee, pharmacy_fee, insurance_discount, total_amount, status) VALUES
  ('e0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'INV-001', 800.00, 450.00, 320.00, 500.00, 1070.00, 'Unpaid');

-- =====================================================
-- PRESCRIPTIONS
-- =====================================================
INSERT INTO prescriptions (visit_id, patient_id, doctor_id, medication_details, status) VALUES
  ('e0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', 
   '[{"name": "Amoxicillin 500mg", "dosage": "1 tablet", "frequency": "Twice daily after meals", "duration": "7 days", "stock": "In Stock"}, {"name": "Lisinopril 10mg", "dosage": "1 tablet", "frequency": "Once in the morning", "duration": "30 days", "stock": "Low Stock"}]'::jsonb, 
   'Pending');

-- =====================================================
-- MEDICINE REMINDERS
-- =====================================================
INSERT INTO medicine_reminders (patient_id, medicine_name, dosage, frequency, time_slots, start_date, end_date, is_active, refill_reminder, refill_date) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'Amoxicillin 500mg', '1 tablet', 'Twice daily', '["08:00","20:00"]'::jsonb, CURRENT_DATE, CURRENT_DATE + 7, TRUE, FALSE, NULL),
  ('b0000001-0000-0000-0000-000000000001', 'Lisinopril 10mg', '1 tablet', 'Once daily', '["08:00"]'::jsonb, CURRENT_DATE, CURRENT_DATE + 30, TRUE, TRUE, CURRENT_DATE + 25);

-- =====================================================
-- LAB TESTS
-- =====================================================
INSERT INTO lab_tests (patient_id, doctor_id, visit_id, test_name, test_category, priority, status, result_summary) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000001', 'Complete Blood Count (CBC)', 'Hematology', 'Normal', 'Completed', 'All values within normal range. WBC: 7,200/µL, RBC: 4.8M/µL, Hemoglobin: 13.5 g/dL.'),
  ('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000001', 'Lipid Panel', 'Biochemistry', 'Normal', 'Processing', NULL);

-- =====================================================
-- MEDICAL RECORDS
-- =====================================================
INSERT INTO medical_records (patient_id, visit_id, record_type, title, description, doctor_name, record_date) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000001', 'Lab Report', 'Complete Blood Count (CBC)', 'Routine blood test — all values normal.', 'Dr. Sarah Smith', CURRENT_DATE - 5),
  ('b0000001-0000-0000-0000-000000000001', NULL, 'Imaging', 'Chest X-Ray', 'Lung fields clear, no cardiomegaly.', 'Dr. Alan Parker', CURRENT_DATE - 12),
  ('b0000001-0000-0000-0000-000000000001', NULL, 'Prescription', 'Prescription - Amoxicillin', 'Post-consultation prescription for mild infection.', 'Dr. Emily Chen', CURRENT_DATE - 17),
  ('b0000001-0000-0000-0000-000000000001', NULL, 'Discharge Summary', 'Cardiology Consultation Summary', 'Routine cardiac follow-up. ECG normal. Continue current medication.', 'Dr. Sarah Smith', CURRENT_DATE - 9);

-- =====================================================
-- BEDS (Hospital Capacity)
-- =====================================================
INSERT INTO beds (ward, bed_number, bed_type, floor, status) VALUES
  ('General Ward A', 'A-101', 'General', '1st', 'Available'),
  ('General Ward A', 'A-102', 'General', '1st', 'Occupied'),
  ('General Ward A', 'A-103', 'General', '1st', 'Available'),
  ('General Ward B', 'B-201', 'Semi-Private', '2nd', 'Occupied'),
  ('General Ward B', 'B-202', 'Semi-Private', '2nd', 'Available'),
  ('Private Wing', 'P-301', 'Private', '3rd', 'Available'),
  ('Private Wing', 'P-302', 'Private', '3rd', 'Maintenance'),
  ('ICU', 'ICU-01', 'ICU', '4th', 'Occupied'),
  ('ICU', 'ICU-02', 'ICU', '4th', 'Available'),
  ('ICU', 'ICU-03', 'ICU', '4th', 'Occupied'),
  ('Emergency', 'ER-01', 'Emergency', 'Ground', 'Available'),
  ('Emergency', 'ER-02', 'Emergency', 'Ground', 'Occupied');

-- =====================================================
-- VACCINATIONS
-- =====================================================
INSERT INTO vaccinations (patient_id, vaccine_name, dose_number, administered_date, next_due_date, status) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'COVID-19 Booster (Covishield)', 3, CURRENT_DATE - 90, NULL, 'Administered'),
  ('b0000001-0000-0000-0000-000000000001', 'Influenza (Seasonal)', 1, NULL, CURRENT_DATE + 15, 'Scheduled');

-- =====================================================
-- HOSPITAL LOCATIONS (Map Data)
-- =====================================================
INSERT INTO hospital_locations (name, category, floor, description, map_x, map_y) VALUES
  ('Main Reception', 'Reception', 'Ground', 'Hospital entry and patient registration', 50.00, 80.00),
  ('Emergency Room', 'Emergency', 'Ground', '24/7 emergency care and trauma center', 80.00, 80.00),
  ('Billing Counter', 'Billing', 'Ground', 'Bill payments and insurance desk', 30.00, 70.00),
  ('Main Pharmacy', 'Pharmacy', 'Ground', 'Prescription fulfillment and OTC medicines', 70.00, 60.00),
  ('OPD - Cardiology', 'OPD', '3rd', 'Outpatient cardiology consultations', 40.00, 30.00),
  ('OPD - Neurology', 'OPD', '4th', 'Outpatient neurology consultations', 40.00, 30.00),
  ('OPD - Pediatrics', 'OPD', '2nd', 'Outpatient pediatrics consultations', 40.00, 30.00),
  ('OPD - Orthopedics', 'OPD', '5th', 'Outpatient orthopedic consultations', 40.00, 30.00),
  ('Pathology Lab', 'Lab', '1st', 'Blood tests, CBC, biochemistry, cultures', 60.00, 40.00),
  ('Radiology (X-Ray & MRI)', 'Radiology', '1st', 'Imaging services: X-Ray, CT, MRI', 60.00, 50.00),
  ('General Ward A', 'Ward', '1st', 'General admission ward — 20 beds', 20.00, 40.00),
  ('ICU', 'Ward', '4th', 'Intensive Care Unit — 6 beds', 20.00, 30.00),
  ('Cafeteria', 'Cafeteria', '2nd', 'Hospital cafeteria and canteen', 80.00, 20.00),
  ('Visitor Parking', 'Parking', 'Basement', 'Underground parking — 200 spots', 50.00, 95.00);

-- =====================================================
-- NOTIFICATIONS (Demo)
-- =====================================================
INSERT INTO notifications (user_id, title, message, notification_type, is_read) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Appointment Confirmed', 'Your appointment with Dr. Sarah Smith is scheduled for today at 2:30 PM. Token #42.', 'appointment', FALSE),
  ('a0000001-0000-0000-0000-000000000001', 'Lab Results Ready', 'Your CBC test results are now available. Tap to view.', 'lab', FALSE),
  ('a0000001-0000-0000-0000-000000000001', 'Medicine Reminder', 'Time to take Amoxicillin 500mg — 1 tablet after dinner.', 'pharmacy', TRUE);
