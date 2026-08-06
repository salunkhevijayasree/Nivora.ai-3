import { useNavigate } from 'react-router-dom';
import { 
  CalendarPlus, 
  Search, 
  FileText, 
  Microscope, 
  Pill, 
  PhoneCall, 
  CreditCard, 
  Map, 
  Stethoscope, 
  UserCircle 
} from 'lucide-react';
import clsx from 'clsx';

const gridItems = [
  { id: 'book-appointment', title: 'Book Appointment', icon: CalendarPlus, color: 'bg-blue-500', route: '/patient/appointments' },
  { id: 'find-doctor', title: 'Find Doctor', icon: Search, color: 'bg-indigo-500', route: '/patient/appointments' },
  { id: 'medical-records', title: 'My Medical Records', icon: FileText, color: 'bg-emerald-500', route: '/patient/records' },
  { id: 'lab-reports', title: 'Lab Reports', icon: Microscope, color: 'bg-teal-500', route: '/patient/records' },
  { id: 'medicines', title: 'Medicines', icon: Pill, color: 'bg-purple-500', route: '/patient/pharmacy' },
  { id: 'emergency-sos', title: 'Emergency SOS', icon: PhoneCall, color: 'bg-red-500', route: '/patient/sos', pulse: true },
  { id: 'bills-payments', title: 'Bills & Payments', icon: CreditCard, color: 'bg-amber-500', route: '/patient/billing' },
  { id: 'hospital-map', title: 'Hospital Map', icon: Map, color: 'bg-cyan-500', route: '/patient/map' },
  { id: 'health-tips', title: 'Health Tips', icon: Stethoscope, color: 'bg-rose-500', route: '/patient/telemedicine' }, // AI / Telemed
  { id: 'profile', title: 'Profile', icon: UserCircle, color: 'bg-slate-500', route: '/patient/profile' },
];

export default function PatientHome() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-hospital-600 to-hospital-800 rounded-2xl p-6 text-white shadow-xl shadow-hospital-900/20 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
          <p className="text-hospital-100 max-w-md">Your upcoming appointment with Dr. Smith is today at 2:30 PM. Token #42.</p>
          <div className="mt-4 flex gap-3">
            <button 
              onClick={() => navigate('/patient/queue')}
              className="bg-white text-hospital-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm"
            >
              Track Live Queue
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
      </div>

      {/* Quick Action 10-Grid */}
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
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
