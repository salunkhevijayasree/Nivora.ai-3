import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PatientHome from './pages/PatientHome';
import AppointmentBooking from './pages/AppointmentBooking';
import LiveQueueTracker from './pages/LiveQueueTracker';
import MedicalRecords from './pages/MedicalRecords';
import PharmacyHub from './pages/PharmacyHub';
import EmergencySOS from './pages/EmergencySOS';
import Billing from './pages/Billing';
import HospitalMap from './pages/HospitalMap';
import Telemedicine from './pages/Telemedicine';
import Profile from './pages/Profile';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 pb-20 md:pb-0">
          <Navbar />
          <main className="max-w-5xl mx-auto p-4 pt-6">
            <Routes>
              <Route path="/" element={<Navigate to="/patient" replace />} />
              
              {/* Patient Core Routes */}
              <Route path="/patient" element={<PatientHome />} />
              <Route path="/patient/appointments" element={<AppointmentBooking />} />
              <Route path="/patient/queue" element={<LiveQueueTracker />} />
              <Route path="/patient/records" element={<MedicalRecords />} />
              <Route path="/patient/pharmacy" element={<PharmacyHub />} />
              <Route path="/patient/sos" element={<EmergencySOS />} />
              <Route path="/patient/billing" element={<Billing />} />
              <Route path="/patient/map" element={<HospitalMap />} />
              <Route path="/patient/telemedicine" element={<Telemedicine />} />
              <Route path="/patient/profile" element={<Profile />} />

              {/* Add other role routes (Doctor, Receptionist, Admin) later */}
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
