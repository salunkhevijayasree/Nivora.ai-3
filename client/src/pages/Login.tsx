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
  Building2,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [identifier, setIdentifier] = useState('puja.sharma@nivora.ai');
  const [password, setPassword] = useState('Puja@123');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('Puja Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Validation rule: Is button enabled?
  const isFormValid = identifier.trim().length > 3 && password.trim().length >= 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Strict Password Validation for Sign In
    if (activeTab === 'signin') {
      const validEmail = 'puja.sharma@nivora.ai';
      const validAbha = '91-9876-5432-1098';
      const validPhone = '9876543210';
      const correctPassword = 'Puja@123';

      const matchesUser = 
        identifier.toLowerCase().trim() === validEmail ||
        identifier.trim() === validAbha ||
        identifier.replace(/\D/g, '').includes(validPhone);

      if (!matchesUser) {
        setErrorMsg('❌ User not found. Please check your Email / ABHA ID or click Instant Demo Login.');
        return;
      }

      if (password !== correctPassword) {
        setErrorMsg('❌ Authentication Failed: Incorrect password entered! Correct Password is "Puja@123".');
        return;
      }
    }

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
    }, 600);
  };

  const handleDemoLogin = () => {
    setErrorMsg(null);
    setIdentifier('puja.sharma@nivora.ai');
    setPassword('Puja@123');
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
      <div className="w-full max-w-md bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden backdrop-blur-xl">
        
        {/* Glow Backdrop */}
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
            onClick={() => { setActiveTab('signin'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'signin'
                ? 'bg-white dark:bg-gray-800 text-hospital-600 dark:text-hospital-400 shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'signup'
                ? 'bg-white dark:bg-gray-800 text-hospital-600 dark:text-hospital-400 shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Demo Credentials Hint Badge */}
        <div className="bg-hospital-50 dark:bg-hospital-950/40 border border-hospital-200 dark:border-hospital-800/80 rounded-2xl p-3 text-xs text-hospital-800 dark:text-hospital-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound size={16} className="text-hospital-500 shrink-0" />
            <div>
              <span className="font-bold block">Demo Password Credentials</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">Password: <strong className="text-hospital-600 dark:text-hospital-400 font-mono">Puja@123</strong></span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { setIdentifier('puja.sharma@nivora.ai'); setPassword('Puja@123'); setErrorMsg(null); }}
            className="text-[11px] font-bold text-hospital-600 dark:text-hospital-400 hover:underline bg-white dark:bg-gray-800 px-2.5 py-1 rounded-lg border border-hospital-300 dark:border-hospital-700 shrink-0"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 text-red-700 dark:text-red-300 rounded-2xl p-3.5 text-xs font-semibold flex items-start gap-2.5 animate-in slide-in-from-top-2">
            <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* Demo Fast Login Banner */}
        <button
          type="button"
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

        <div className="flex items-center gap-3 my-1">
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
                onChange={(e) => { setIdentifier(e.target.value); setErrorMsg(null); }}
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

          {/* Password Field with Eye Toggle (Show / Hide Password) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Password / Security PIN</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMsg(null); }}
                placeholder="Enter password (Puja@123)"
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button - Disabled if invalid or empty */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full py-3.5 bg-hospital-600 hover:bg-hospital-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-hospital-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Verifying Credentials...
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
