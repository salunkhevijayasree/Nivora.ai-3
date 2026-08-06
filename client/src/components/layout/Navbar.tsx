import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Bell, UserCircle, Activity, Building2, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useHospital } from '../../context/HospitalContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { selectedHospital } = useHospital();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-hospital-600 p-2 rounded-xl text-white group-hover:scale-105 transition-transform shadow-lg shadow-hospital-500/30">
            <Activity size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            NIVORA<span className="text-hospital-600">.AI</span>
          </span>
        </Link>

        {/* Selected Hospital Selector Pill */}
        <button
          onClick={() => navigate('/patient/hospitals')}
          className="flex items-center gap-2 bg-hospital-50 dark:bg-hospital-900/30 hover:bg-hospital-100 border border-hospital-200 dark:border-hospital-800 text-hospital-800 dark:text-hospital-300 px-3 py-1.5 rounded-full text-xs font-semibold transition-all max-w-[240px] sm:max-w-xs truncate shadow-sm group"
          title="Click to switch selected hospital campus"
        >
          <Building2 size={15} className="text-hospital-600 dark:text-hospital-400 shrink-0" />
          <span className="truncate">{selectedHospital ? selectedHospital.name : 'Select Hospital'}</span>
          <ChevronDown size={14} className="text-hospital-500 group-hover:translate-y-0.5 transition-transform shrink-0" />
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative text-gray-600 dark:text-gray-300 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/patient/profile" className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-hospital-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-hospital-600 dark:text-hospital-400">
              <UserCircle size={24} />
            </div>
            <span className="text-sm font-medium hidden sm:block">Patient Portal</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
