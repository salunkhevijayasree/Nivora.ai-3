import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PatientHome from './pages/PatientHome';
import HospitalSelector from './pages/HospitalSelector';
import AppointmentBooking from './pages/AppointmentBooking';
import LiveQueueTracker from './pages/LiveQueueTracker';
import MedicalRecords from './pages/MedicalRecords';
import PharmacyHub from './pages/PharmacyHub';
import EmergencySOS from './pages/EmergencySOS';
import Billing from './pages/Billing';
import HospitalMap from './pages/HospitalMap';
import Telemedicine from './pages/Telemedicine';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AIChatbotWidget from './components/ai/AIChatbotWidget';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { HospitalProvider } from './context/HospitalContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/patient/hospitals" : "/login"} replace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HospitalProvider>
          <Router>
            <div className="min-h-screen bg-slate-900 text-slate-100 font-sans transition-colors duration-200 pb-20 md:pb-0 relative">
              <Navbar />
              <main className="max-w-5xl mx-auto p-4 pt-6">
                <Routes>
                  {/* Public Authentication Screen */}
                  <Route path="/login" element={<Login />} />

                  {/* Default Root Redirect */}
                  <Route path="/" element={<RootRedirect />} />
                  
                  {/* 1st Interface: Multi-Hospital Selection (Protected) */}
                  <Route 
                    path="/patient/hospitals" 
                    element={
                      <ProtectedRoute>
                        <HospitalSelector />
                      </ProtectedRoute>
                    } 
                  />

                  {/* 2nd Interface: Selected Hospital Quick Access Portal (Protected) */}
                  <Route 
                    path="/patient" 
                    element={
                      <ProtectedRoute>
                        <PatientHome />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Hospital Services Routes (Protected) */}
                  <Route path="/patient/appointments" element={<ProtectedRoute><AppointmentBooking /></ProtectedRoute>} />
                  <Route path="/patient/queue" element={<ProtectedRoute><LiveQueueTracker /></ProtectedRoute>} />
                  <Route path="/patient/records" element={<ProtectedRoute><MedicalRecords /></ProtectedRoute>} />
                  <Route path="/patient/pharmacy" element={<ProtectedRoute><PharmacyHub /></ProtectedRoute>} />
                  <Route path="/patient/sos" element={<ProtectedRoute><EmergencySOS /></ProtectedRoute>} />
                  <Route path="/patient/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
                  <Route path="/patient/map" element={<ProtectedRoute><HospitalMap /></ProtectedRoute>} />
                  <Route path="/patient/telemedicine" element={<ProtectedRoute><Telemedicine /></ProtectedRoute>} />
                  <Route path="/patient/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Routes>
              </main>

              {/* Global AI Chatbot Assistant Widget */}
              <AIChatbotWidget />
            </div>
          </Router>
        </HospitalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
