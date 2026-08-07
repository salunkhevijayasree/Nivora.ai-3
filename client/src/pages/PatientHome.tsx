import { useNavigate } from 'react-router-dom';
import { 
  CalendarPlus, 
  Users, 
  FileText, 
  Pill, 
  PhoneCall, 
  CreditCard, 
  Map, 
  HeartHandshake, 
  Building2, 
  MapPin, 
  RefreshCw, 
  ShieldCheck, 
  Bed,
  Navigation,
  Bot
} from 'lucide-react';
import clsx from 'clsx';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';

const gridItems = [
  { id: 'find-book-doctor', title: 'Find Doctor & Book', icon: CalendarPlus, color: 'bg-blue-600', route: '/patient/appointments' },
  { id: 'live-queue', title: 'Live Queue Status', icon: Users, color: 'bg-indigo-600', route: '/patient/queue' },
  { id: 'medical-lab-records', title: 'Medical & Lab Reports', icon: FileText, color: 'bg-emerald-600', route: '/patient/records' },
  { id: 'medicines', title: 'Medicines & Refills', icon: Pill, color: 'bg-purple-600', route: '/patient/pharmacy' },
  { id: 'emergency-sos', title: 'Emergency SOS', icon: PhoneCall, color: 'bg-red-600', route: '/patient/sos', pulse: true },
  { id: 'bills-payments', title: 'Bills & Payments', icon: CreditCard, color: 'bg-amber-600', route: '/patient/billing' },
  { id: 'hospital-map', title: 'Hospital Map', icon: Map, color: 'bg-cyan-600', route: '/patient/map' },
  { id: 'health-tips', title: 'Daily Health Tips', icon: HeartHandshake, color: 'bg-rose-600', route: '/patient/telemedicine' },
];

export default function PatientHome() {
  const navigate = useNavigate();
  const { selectedHospital } = useHospital();
  const { activeProfile } = useAuth();

  return (
    <div className="space-y-6 animate-in">

      {/* Selected Hospital Context Bar */}
      {selectedHospital ? (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 ${selectedHospital.colorTheme}`}>
              <Building2 size={22} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-hospital-400">Selected Partner Hospital</span>
                <span className="text-[10px] font-bold bg-amber-900/40 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Navigation size={10} className="fill-current" /> {selectedHospital.distanceKm} km away from location
                </span>
                <span className="text-[10px] font-bold bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Bed size={10} /> {selectedHospital.availableBeds} Beds Open
                </span>
              </div>
              <h2 className="font-extrabold text-white text-base mt-0.5">{selectedHospital.name}</h2>
              <p className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                <MapPin size={12} className="text-hospital-400" /> {selectedHospital.address}
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/patient/hospitals')}
            className="px-4 py-2 rounded-xl border border-slate-600 bg-slate-700/80 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 transition-all w-full sm:w-auto justify-center shrink-0 shadow-sm cursor-pointer"
          >
            <RefreshCw size={14} className="text-hospital-400" /> Switch Hospital
          </button>
        </div>
      ) : (
        <div className="bg-amber-950/60 border border-amber-700/60 p-4 rounded-2xl flex items-center justify-between text-amber-200">
          <span className="text-xs font-semibold">No partner hospital selected. Please select a hospital to view doctors & live queue.</span>
          <button onClick={() => navigate('/patient/hospitals')} className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md cursor-pointer">Select Hospital</button>
        </div>
      )}
      
      {/* Dynamic Active Patient Welcome Banner */}
      <div className="bg-gradient-to-r from-hospital-600 via-hospital-700 to-indigo-900 rounded-3xl p-6 text-white shadow-xl shadow-hospital-900/30 relative overflow-hidden space-y-3 border border-hospital-500/30">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-semibold text-white">
              <Bot size={13} className="text-hospital-300" /> Powered by NIVORA AI Engine
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/25 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-bold text-emerald-200 border border-emerald-400/30">
              <ShieldCheck size={13} /> {activeProfile.name} ({activeProfile.relation}) • ABHA: {activeProfile.abhaId}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1 text-white">Welcome back, {activeProfile.name}! 👋</h1>
          <p className="text-hospital-100 max-w-md text-xs sm:text-sm leading-relaxed font-medium">
            Encounter active for <strong className="text-white font-bold">{activeProfile.name}</strong> ({activeProfile.patientCode}) at <strong className="text-white font-bold">{selectedHospital ? selectedHospital.name : 'Apollo Hospitals'}</strong>. Upcoming Cardiology check-up today at 2:30 PM (Token #42).
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      </div>

      {/* Quick Action Grid Header - High Contrast Text */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Hospital Services</h2>
          <p className="text-xs text-slate-300 font-medium">Services scoped to <span className="text-hospital-400 font-bold">{selectedHospital ? selectedHospital.name : 'selected hospital'}</span> for <span className="text-white font-bold">{activeProfile.name}</span></p>
        </div>
        <button 
          onClick={() => navigate('/patient/hospitals')}
          className="text-xs text-hospital-400 font-bold hover:underline hover:text-hospital-300 cursor-pointer"
        >
          View All Partner Hospitals &rarr;
        </button>
      </div>

      {/* Grid Cards - High-Contrast Dark Cards with Bright White Text */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
        {gridItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.route)}
            className="flex flex-col items-center justify-center p-5 bg-slate-800/90 border border-slate-700/80 hover:border-hospital-500 rounded-2xl hover:shadow-xl hover:shadow-hospital-500/10 transition-all active:scale-95 group text-center h-full cursor-pointer backdrop-blur-md"
          >
            <div className={clsx(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-3 transition-transform group-hover:scale-110 shadow-md",
              item.color,
              item.pulse && "animate-pulse shadow-red-500/50 shadow-lg"
            )}>
              <item.icon size={24} />
            </div>
            <span className="text-sm font-extrabold text-white group-hover:text-hospital-300 transition-colors leading-tight">
              {item.title}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
}
