import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Building2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [identifier, setIdentifier] = useState('puja.sharma@nivora.ai');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Puja Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login({
        name: activeTab === 'signup' ? name : 'Puja Sharma',
        email: identifier,
        patientCode: 'MED-29834',
        abhaId: '91-9876-5432-1098'
      });
      setIsLoading(false);
      navigate('/patient/hospitals');
    }, 800);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        name: 'Puja Sharma',
        email: 'puja.sharma@nivora.ai',
        patientCode: 'MED-29834',
        abhaId: '91-9876-5432-1098'
      });
      setIsLoading(false);
      navigate('/patient/hospitals');
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
        
        {/* Subtle Glow Backdrop */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-hospital-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-hospital-600 to-indigo-600 rounded-2xl text-white shadow-lg shadow-hospital-500/30 mb-1">
            <Activity size={30} />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
            NIVORA<span className="text-hospital-500">.AI</span>
          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            AI Powered Hospital Workflow & Patient Portal
          </p>
        </div>

        {/* Sign In / Sign Up Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl border border-gray-200 dark:border-gray-700/60 text-xs font-bold">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'signin'
                ? 'bg-white dark:bg-gray-800 text-hospital-600 dark:text-hospital-400 shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'signup'
                ? 'bg-white dark:bg-gray-800 text-hospital-600 dark:text-hospital-400 shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Demo Fast Login Banner */}
        <button
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-hospital-600 hover:from-emerald-700 hover:to-hospital-700 text-white p-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-between transition-all hover:scale-[1.02] active:scale-95 border border-white/20 group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <UserCheck size={18} />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">Instant Demo Login</span>
              <span className="block text-xs font-black">Sign In as Puja Sharma</span>
            </div>
          </div>

          <Sparkles size={16} className="text-amber-300 animate-pulse group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">or sign in manually</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Puja Sharma"
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {activeTab === 'signin' ? 'ABHA ID / Email / Mobile' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="puja.sharma@nivora.ai or 91-9876-5432-1098"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          {activeTab === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Password / Security PIN</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-hospital-600 hover:bg-hospital-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-hospital-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              <>
                {activeTab === 'signin' ? 'Sign In to Portal' : 'Register & Connect ABHA'} <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security Footer Info */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-500" /> ABHA & ABDM Compliant
          </span>
          <span className="flex items-center gap-1">
            <Building2 size={14} className="text-hospital-400" /> Partner Hospitals
          </span>
        </div>

      </div>
    </div>
  );
}
