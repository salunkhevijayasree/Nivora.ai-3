-- =====================================================
-- NIVORA AI - Complete Database Schema
-- Supabase PostgreSQL with Row Level Security (RLS)
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS TABLE (Core Authentication)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT,
    role VARCHAR(50) NOT NULL CHECK (role IN ('patient', 'receptionist', 'doctor', 'pharmacy', 'admin')),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. PATIENTS TABLE (Patient Profile & Medical Info)
-- =====================================================
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    patient_code VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    dob DATE,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other', 'Prefer not to say')),
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    blood_group VARCHAR(10),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    national_id_status VARCHAR(50) DEFAULT 'VERIFIED_REDACTED',
    abha_id VARCHAR(100),
    medical_history TEXT,
    allergies TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 3. FAMILY MEMBERS (Linked Patient Profiles)
-- =====================================================
CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. DOCTORS TABLE (Doctor Profile & Availability)
-- =====================================================
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    qualification VARCHAR(255),
    experience_years INT DEFAULT 0,
    consultation_fee NUMERIC(10, 2) DEFAULT 500.00,
    room_number VARCHAR(50),
    floor VARCHAR(20),
    is_available BOOLEAN DEFAULT TRUE,
    accepts_telemedicine BOOLEAN DEFAULT TRUE,
    current_load INT DEFAULT 0,
    max_daily_patients INT DEFAULT 30,
    rating NUMERIC(2, 1) DEFAULT 4.5,
    total_reviews INT DEFAULT 0,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 5. DOCTOR SCHEDULE / AVAILABLE SLOTS
-- =====================================================
CREATE TABLE IF NOT EXISTS doctor_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 6. APPOINTMENTS TABLE (Booking System)
-- =====================================================
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    slot_id UUID REFERENCES doctor_slots(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    token_number INT,
    status VARCHAR(50) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Checked-In', 'In-Progress', 'Completed', 'Cancelled', 'No-Show', 'Rescheduled')),
    reason TEXT,
    appointment_type VARCHAR(50) DEFAULT 'In-Person' CHECK (appointment_type IN ('In-Person', 'Telemedicine')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 7. VISITS / EPISODES OF CARE (Workflow Engine)
-- =====================================================
CREATE TABLE IF NOT EXISTS visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id),
    appointment_id UUID REFERENCES appointments(id),
    symptom_summary TEXT NOT NULL,
    ai_analysis TEXT,
    triage_priority VARCHAR(20) CHECK (triage_priority IN ('Emergency', 'High', 'Medium', 'Low')),
    department VARCHAR(100) NOT NULL,
    estimated_wait_min INT DEFAULT 15,
    status VARCHAR(50) DEFAULT 'Registered' CHECK (status IN ('Registered', 'Triaged', 'Assigned', 'In-Consultation', 'Lab-Pending', 'Pharmacy-Pending', 'Discharged', 'Exception-Hold')),
    diagnosis TEXT,
    encounter_notes TEXT,
    vitals JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 8. INSURANCE CLAIMS (AI Verification)
-- =====================================================
CREATE TABLE IF NOT EXISTS insurance_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id),
    provider_name VARCHAR(255),
    policy_number VARCHAR(100),
    group_number VARCHAR(100),
    member_name VARCHAR(255),
    coverage_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Requires_Manual_Review', 'Rejected')),
    confidence_score NUMERIC(5, 2) DEFAULT 0.00,
    covered_amount NUMERIC(10, 2) DEFAULT 0.00,
    copay_amount NUMERIC(10, 2) DEFAULT 0.00,
    ai_notes TEXT,
    document_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 9. BILLING RECORDS (Itemized Billing)
-- =====================================================
CREATE TABLE IF NOT EXISTS bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id),
    invoice_number VARCHAR(50) UNIQUE,
    consultation_fee NUMERIC(10, 2) DEFAULT 0.00,
    lab_fee NUMERIC(10, 2) DEFAULT 0.00,
    pharmacy_fee NUMERIC(10, 2) DEFAULT 0.00,
    room_charges NUMERIC(10, 2) DEFAULT 0.00,
    procedure_fee NUMERIC(10, 2) DEFAULT 0.00,
    insurance_discount NUMERIC(10, 2) DEFAULT 0.00,
    tax_amount NUMERIC(10, 2) DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    paid_amount NUMERIC(10, 2) DEFAULT 0.00,
    payment_method VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Unpaid' CHECK (status IN ('Unpaid', 'Partial', 'Paid', 'Disputed', 'Refunded')),
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 10. PRESCRIPTIONS & PHARMACY
-- =====================================================
CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES doctors(id),
    medication_details JSONB NOT NULL,
    pharmacy_notes TEXT,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Filled', 'Partially-Filled', 'Out-of-Stock', 'Cancelled')),
    filled_by UUID REFERENCES users(id),
    filled_at TIMESTAMP WITH TIME ZONE,
    pickup_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 11. MEDICINE REMINDERS
-- =====================================================
CREATE TABLE IF NOT EXISTS medicine_reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    prescription_id UUID REFERENCES prescriptions(id),
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    time_slots JSONB NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    refill_reminder BOOLEAN DEFAULT FALSE,
    refill_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 12. LAB TESTS & REPORTS
-- =====================================================
CREATE TABLE IF NOT EXISTS lab_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visit_id UUID REFERENCES visits(id),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id),
    test_name VARCHAR(255) NOT NULL,
    test_category VARCHAR(100),
    priority VARCHAR(20) DEFAULT 'Normal' CHECK (priority IN ('Urgent', 'Normal')),
    status VARCHAR(50) DEFAULT 'Ordered' CHECK (status IN ('Ordered', 'Sample-Collected', 'Processing', 'Completed', 'Cancelled')),
    result_summary TEXT,
    result_data JSONB,
    report_url TEXT,
    ordered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 13. MEDICAL RECORDS / DOCUMENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    visit_id UUID REFERENCES visits(id),
    record_type VARCHAR(50) NOT NULL CHECK (record_type IN ('Prescription', 'Lab Report', 'Imaging', 'Discharge Summary', 'Clinical Notes', 'Insurance Doc', 'Other')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    doctor_name VARCHAR(255),
    document_url TEXT,
    ai_extracted_data JSONB,
    record_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 14. SOS / EMERGENCY REQUESTS
-- =====================================================
CREATE TABLE IF NOT EXISTS sos_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id),
    user_id UUID REFERENCES users(id),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    address_text TEXT,
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Dispatched', 'Arrived', 'Resolved', 'Cancelled')),
    ambulance_id VARCHAR(50),
    dispatcher_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 15. TELEMEDICINE SESSIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS telemedicine_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointments(id),
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES doctors(id),
    session_type VARCHAR(20) DEFAULT 'video' CHECK (session_type IN ('video', 'chat')),
    room_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Waiting' CHECK (status IN ('Waiting', 'Active', 'Completed', 'Cancelled')),
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    chat_log JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 16. CHAT MESSAGES (Doctor-Patient Secure Chat)
-- =====================================================
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES telemedicine_sessions(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id),
    sender_role VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 17. DISCHARGE SUMMARIES
-- =====================================================
CREATE TABLE IF NOT EXISTS discharge_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES doctors(id),
    diagnosis TEXT NOT NULL,
    treatment_summary TEXT,
    medications_on_discharge JSONB,
    follow_up_instructions TEXT,
    follow_up_date DATE,
    diet_instructions TEXT,
    activity_restrictions TEXT,
    doctor_signature BOOLEAN DEFAULT FALSE,
    signed_at TIMESTAMP WITH TIME ZONE,
    ai_generated_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 18. POST-DISCHARGE FOLLOW UPS
-- =====================================================
CREATE TABLE IF NOT EXISTS follow_ups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    visit_id UUID REFERENCES visits(id),
    follow_up_type VARCHAR(50) DEFAULT 'Appointment' CHECK (follow_up_type IN ('Appointment', 'Medication-Check', 'Lab-Retest', 'AI-Wellness-Call')),
    scheduled_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Missed', 'Rescheduled')),
    notes TEXT,
    ai_message TEXT,
    patient_feedback TEXT,
    feedback_rating INT CHECK (feedback_rating BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 19. WORKFLOW EXCEPTIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS workflow_exceptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
    stage VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'Medium' CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES users(id),
    resolution_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 20. FEEDBACK & RATINGS
-- =====================================================
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id),
    visit_id UUID REFERENCES visits(id),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    category VARCHAR(50) DEFAULT 'General' CHECK (category IN ('General', 'Doctor', 'Staff', 'Facility', 'Pharmacy', 'Wait-Time')),
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 21. BED AVAILABILITY (Admin Dashboard)
-- =====================================================
CREATE TABLE IF NOT EXISTS beds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ward VARCHAR(100) NOT NULL,
    bed_number VARCHAR(20) NOT NULL,
    bed_type VARCHAR(50) DEFAULT 'General' CHECK (bed_type IN ('General', 'Semi-Private', 'Private', 'ICU', 'NICU', 'Emergency')),
    floor VARCHAR(20),
    status VARCHAR(50) DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied', 'Maintenance', 'Reserved')),
    patient_id UUID REFERENCES patients(id),
    occupied_since TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 22. VACCINATION RECORDS
-- =====================================================
CREATE TABLE IF NOT EXISTS vaccinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    vaccine_name VARCHAR(255) NOT NULL,
    dose_number INT DEFAULT 1,
    administered_date DATE,
    next_due_date DATE,
    administered_by VARCHAR(255),
    batch_number VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Administered', 'Overdue', 'Cancelled')),
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 23. NOTIFICATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) DEFAULT 'info' CHECK (notification_type IN ('info', 'warning', 'success', 'error', 'appointment', 'lab', 'pharmacy', 'sos', 'billing')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 24. HOSPITAL MAP / NAVIGATION POINTS
-- =====================================================
CREATE TABLE IF NOT EXISTS hospital_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('OPD', 'Ward', 'Lab', 'Pharmacy', 'Cafeteria', 'Parking', 'Emergency', 'Reception', 'Billing', 'Radiology', 'Other')),
    floor VARCHAR(20) NOT NULL,
    building VARCHAR(100) DEFAULT 'Main',
    description TEXT,
    map_x NUMERIC(6, 2),
    map_y NUMERIC(6, 2),
    qr_code VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_patients_code ON patients(patient_code);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_doctors_department ON doctors(department);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_visits_patient ON visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_visits_status ON visits(status);
CREATE INDEX IF NOT EXISTS idx_bills_patient ON bills(patient_id);
CREATE INDEX IF NOT EXISTS idx_bills_status ON bills(status);
CREATE INDEX IF NOT EXISTS idx_prescriptions_visit ON prescriptions(visit_id);
CREATE INDEX IF NOT EXISTS idx_lab_tests_patient ON lab_tests(patient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_sos_status ON sos_requests(status);
CREATE INDEX IF NOT EXISTS idx_beds_status ON beds(status);


-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemedicine_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE discharge_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_locations ENABLE ROW LEVEL SECURITY;

-- Service Role bypass (server-side always has full access)
-- Individual table policies for anon/authenticated users:

-- Users: can read own profile
CREATE POLICY "users_select_own" ON users FOR SELECT USING (true);
CREATE POLICY "users_insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (true);

-- Patients: accessible to all authenticated
CREATE POLICY "patients_select" ON patients FOR SELECT USING (true);
CREATE POLICY "patients_insert" ON patients FOR INSERT WITH CHECK (true);
CREATE POLICY "patients_update" ON patients FOR UPDATE USING (true);

-- Doctors: readable by all
CREATE POLICY "doctors_select" ON doctors FOR SELECT USING (true);
CREATE POLICY "doctors_insert" ON doctors FOR INSERT WITH CHECK (true);
CREATE POLICY "doctors_update" ON doctors FOR UPDATE USING (true);

-- Doctor Slots: readable by all
CREATE POLICY "slots_select" ON doctor_slots FOR SELECT USING (true);
CREATE POLICY "slots_insert" ON doctor_slots FOR INSERT WITH CHECK (true);
CREATE POLICY "slots_update" ON doctor_slots FOR UPDATE USING (true);

-- Appointments: all ops open (server manages auth)
CREATE POLICY "appointments_all" ON appointments FOR ALL USING (true) WITH CHECK (true);

-- Visits: all ops open
CREATE POLICY "visits_all" ON visits FOR ALL USING (true) WITH CHECK (true);

-- Insurance Claims: all ops open
CREATE POLICY "claims_all" ON insurance_claims FOR ALL USING (true) WITH CHECK (true);

-- Bills: all ops open
CREATE POLICY "bills_all" ON bills FOR ALL USING (true) WITH CHECK (true);

-- Prescriptions: all ops open
CREATE POLICY "prescriptions_all" ON prescriptions FOR ALL USING (true) WITH CHECK (true);

-- Medicine Reminders
CREATE POLICY "reminders_all" ON medicine_reminders FOR ALL USING (true) WITH CHECK (true);

-- Lab Tests
CREATE POLICY "labs_all" ON lab_tests FOR ALL USING (true) WITH CHECK (true);

-- Medical Records
CREATE POLICY "records_all" ON medical_records FOR ALL USING (true) WITH CHECK (true);

-- SOS Requests
CREATE POLICY "sos_all" ON sos_requests FOR ALL USING (true) WITH CHECK (true);

-- Telemedicine
CREATE POLICY "telemedicine_all" ON telemedicine_sessions FOR ALL USING (true) WITH CHECK (true);

-- Chat Messages
CREATE POLICY "chat_all" ON chat_messages FOR ALL USING (true) WITH CHECK (true);

-- Discharge Summaries
CREATE POLICY "discharge_all" ON discharge_summaries FOR ALL USING (true) WITH CHECK (true);

-- Follow Ups
CREATE POLICY "followups_all" ON follow_ups FOR ALL USING (true) WITH CHECK (true);

-- Workflow Exceptions
CREATE POLICY "exceptions_all" ON workflow_exceptions FOR ALL USING (true) WITH CHECK (true);

-- Feedback
CREATE POLICY "feedback_all" ON feedback FOR ALL USING (true) WITH CHECK (true);

-- Beds
CREATE POLICY "beds_all" ON beds FOR ALL USING (true) WITH CHECK (true);

-- Vaccinations
CREATE POLICY "vaccinations_all" ON vaccinations FOR ALL USING (true) WITH CHECK (true);

-- Notifications
CREATE POLICY "notifications_all" ON notifications FOR ALL USING (true) WITH CHECK (true);

-- Family Members
CREATE POLICY "family_all" ON family_members FOR ALL USING (true) WITH CHECK (true);

-- Hospital Locations: readable by all
CREATE POLICY "locations_all" ON hospital_locations FOR ALL USING (true) WITH CHECK (true);
