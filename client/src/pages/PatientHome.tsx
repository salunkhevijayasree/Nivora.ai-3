import { useNavigate } from 'react-router-dom';
import { 
  CalendarPlus, 
  Users, 
  FileText, 
  Pill, 
  PhoneCall, 
  CreditCard, 
  Map, 
  Stethoscope, 
  Building2, 
  MapPin, 
  RefreshCw, 
  ShieldCheck, 
  Bed 
} from 'lucide-react';
import clsx from 'clsx';
import { useHospital } from '../context/HospitalContext';

const gridItems = [
  { id: 'find-book-doctor', title: 'Find Doctor & Book', icon: CalendarPlus, color: 'bg-blue-600', route: '/patient/appointments' },
  { id: 'live-queue', title: 'Live Queue Status', icon: Users, color: 'bg-indigo-600', route: '/patient/queue' },
  { id: 'medical-lab-records', title: 'Medical & Lab Reports', icon: FileText, color: 'bg-emerald-600', route: '/patient/records' },
  { id: 'medicines', title: 'Medicines & Refills', icon: Pill, color: 'bg-purple-600', route: '/patient/pharmacy' },
  { id: 'emergency-sos', title: 'Emergency SOS', icon: PhoneCall, color: 'bg-red-600', route: '/patient/sos', pulse: true },
  { id: 'bills-payments', title: 'Bills & Payments', icon: CreditCard, color: 'bg-amber-600', route: '/patient/billing' },
  { id: 'hospital-map', title: 'Hospital Map', icon: Map, color: 'bg-cyan-600', route: '/patient/map' },
  { id: 'health-tips', title: 'Health Tips & AI', icon: Stethoscope, color: 'bg-rose-600', route: '/patient/telemedicine' },
];

export default function PatientHome() {
  const navigate = useNavigate();
  const { selectedHospital } = useHospital();

  return (
    <div className="space-y-6 animate-in">

      {/* Selected Hospital Context Bar */}
      {selectedHospital ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${selectedHospital.colorTheme}`}>
              <Building2 size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-hospital-600 dark:text-hospital-400">Active Hospital Campus</span>
                <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Bed size={10} /> {selectedHospital.availableBeds} Beds Open
                </span>
              </div>
              <h2 className="font-bold text-gray-900 dark:text-white text-sm">{selectedHospital.name}</h2>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin size={12}/> {selectedHospital.address}
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/patient/hospitals')}
            className="px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1.5 transition-all w-full sm:w-auto justify-center shrink-0"
          >
            <RefreshCw size={13} className="text-hospital-600" /> Switch Hospital
          </button>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-2xl flex items-center justify-between">
          <span className="text-xs text-amber-800 dark:text-amber-300 font-medium">No hospital campus selected. Please select a hospital to view doctors & live queue.</span>
          <button onClick={() => navigate('/patient/hospitals')} className="bg-amber-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold">Select Hospital</button>
        </div>
      )}
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-hospital-600 to-hospital-800 rounded-3xl p-6 text-white shadow-xl shadow-hospital-900/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-medium mb-3 text-hospital-100">
            <ShieldCheck size={14} /> ABHA Patient Portal • Renu Sharma
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, Renu Sharma! 👋</h1>
          <p className="text-hospital-100 max-w-md text-xs sm:text-sm">
            Encounter active at {selectedHospital ? selectedHospital.name : 'Nivora Super Specialty'}. Upcoming Cardiology check-up today at 2:30 PM (Token #42).
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      </div>

      {/* Quick Action Grid */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Hospital Services</h2>
        <span className="text-xs text-gray-400">Scoped to selected hospital</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
        {gridItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.route)}
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-md transition-all active:scale-95 group text-center h-full"
          >
            <div className={clsx(
              "w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 transition-transform group-hover:scale-110 shadow-sm",
              item.color,
              item.pulse && "animate-pulse shadow-red-500/50 shadow-lg"
            )}>
              <item.icon size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-tight">
              {item.title}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
}
