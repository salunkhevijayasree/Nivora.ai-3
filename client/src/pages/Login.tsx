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
  Phone,
  CheckCircle2,
  X,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [identifier, setIdentifier] = useState('puja.sharma@nivora.ai');
  const [password, setPassword] = useState('Puja@123');
  const [validPassword, setValidPassword] = useState('Puja@123');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('Puja Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone'>('email');
  const [recoveryInput, setRecoveryInput] = useState('puja.sharma@nivora.ai');
  const [forgotStep, setForgotStep] = useState<'input' | 'otp' | 'reset'>('input');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Validation rule: Is sign in button enabled?
  const isFormValid = identifier.trim().length > 3 && password.trim().length >= 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Strict Password Validation for Sign In
    if (activeTab === 'signin') {
      const validEmail = 'puja.sharma@nivora.ai';
      const validAbha = '91-9876-5432-1098';
      const validPhone = '9876543210';

      const matchesUser = 
        identifier.toLowerCase().trim() === validEmail ||
        identifier.trim() === validAbha ||
        identifier.replace(/\D/g, '').includes(validPhone);

      if (!matchesUser) {
        setErrorMsg('❌ User account not found. Please check your Email / ABHA ID and try again.');
        return;
      }

      if (password !== validPassword) {
        setErrorMsg('❌ Authentication Failed: Incorrect password. Please try again.');
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
    setSuccessMsg(null);
    setIdentifier('puja.sharma@nivora.ai');
    setPassword(validPassword);
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

  // Handle Forgot Password OTP Request
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!recoveryInput.trim()) {
      setModalError('Please enter a valid Email ID or Mobile Phone Number.');
      return;
    }

    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setForgotStep('otp');
      setOtpCode('482019');
    }, 800);
  };

  // Handle OTP Verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (otpCode.trim().length !== 6) {
      setModalError('Please enter the 6-digit OTP code sent to your ' + (recoveryMethod === 'email' ? 'email' : 'phone number') + '.');
      return;
    }

    setForgotStep('reset');
  };

  // Handle Final Password Reset
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (newPassword.length < 6) {
      setModalError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalError('Passwords do not match! Please check and try again.');
      return;
    }

    // Update Valid Password
    setValidPassword(newPassword);
    setPassword(newPassword);
    setShowForgotModal(false);
    setSuccessMsg('✅ Password reset successfully! You can now sign in with your new password.');
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
            onClick={() => { setActiveTab('signin'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'signin'
                ? 'bg-white dark:bg-gray-800 text-hospital-600 dark:text-hospital-400 shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'signup'
                ? 'bg-white dark:bg-gray-800 text-hospital-600 dark:text-hospital-400 shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Success Alert Box */}
        {successMsg && (
          <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 rounded-2xl p-3.5 text-xs font-semibold flex items-start gap-2.5 animate-in slide-in-from-top-2">
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMsg}</span>
          </div>
        )}

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
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-hospital-500 outline-none transition-all font-medium"
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
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-hospital-500 outline-none transition-all font-medium"
              />
            </div>
          )}

          {/* Password Field Header with Forgot Password Button */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Password / Security PIN</label>
              {activeTab === 'signin' && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(true);
                    setForgotStep('input');
                    setModalError(null);
                    setRecoveryInput(identifier || 'puja.sharma@nivora.ai');
                  }}
                  className="text-xs font-bold text-hospital-600 dark:text-hospital-400 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMsg(null); }}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-hospital-500 outline-none transition-all font-mono"
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

      {/* ========================================================================= */}
      {/* FORGOT PASSWORD & RECOVERY MODAL */}
      {/* ========================================================================= */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-zoom relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-hospital-100 dark:bg-hospital-900/40 text-hospital-600 dark:text-hospital-400 flex items-center justify-center font-bold">
                  <KeyRound size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">Reset Account Password</h3>
                  <p className="text-[11px] text-gray-400">Recovery linked with Email ID & Mobile Number</p>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Error Alert */}
            {modalError && (
              <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 text-red-700 dark:text-red-300 rounded-2xl p-3 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* STEP 1: Choose Recovery Method (Email or Phone) */}
            {forgotStep === 'input' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Choose Verification Channel</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRecoveryMethod('email');
                        setRecoveryInput('puja.sharma@nivora.ai');
                      }}
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        recoveryMethod === 'email'
                          ? 'bg-hospital-50 dark:bg-hospital-900/40 border-hospital-500 text-hospital-600 dark:text-hospital-300 shadow-sm'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Mail size={16} /> Email ID
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRecoveryMethod('phone');
                        setRecoveryInput('+91 98765 43210');
                      }}
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        recoveryMethod === 'phone'
                          ? 'bg-hospital-50 dark:bg-hospital-900/40 border-hospital-500 text-hospital-600 dark:text-hospital-300 shadow-sm'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Phone size={16} /> Mobile SMS
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    {recoveryMethod === 'email' ? 'Registered Email Address' : 'Registered Mobile Phone Number'}
                  </label>
                  <div className="relative">
                    {recoveryMethod === 'email' ? (
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    ) : (
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    )}
                    <input
                      type={recoveryMethod === 'email' ? 'email' : 'text'}
                      required
                      value={recoveryInput}
                      onChange={(e) => setRecoveryInput(e.target.value)}
                      placeholder={recoveryMethod === 'email' ? 'e.g. puja.sharma@nivora.ai' : 'e.g. +91 98765 43210'}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className="w-full py-3.5 bg-hospital-600 hover:bg-hospital-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-hospital-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSendingOtp ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw size={14} className="animate-spin" /> Sending 6-Digit OTP...
                    </span>
                  ) : (
                    <>
                      Send 6-Digit Verification OTP <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: Enter 6-Digit OTP Code */}
            {forgotStep === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="bg-hospital-50 dark:bg-hospital-950/40 p-3.5 rounded-2xl border border-hospital-200 dark:border-hospital-800 text-xs text-hospital-800 dark:text-hospital-300">
                  <span>6-Digit OTP Code dispatched to <strong>{recoveryInput}</strong>.</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Enter 6-Digit OTP</label>
                    <button
                      type="button"
                      onClick={() => setOtpCode('482019')}
                      className="text-[11px] font-bold text-hospital-600 dark:text-hospital-400 hover:underline"
                    >
                      Auto Fill OTP (482019)
                    </button>
                  </div>

                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="4 8 2 0 1 9"
                    className="w-full py-3 text-center tracking-[0.4em] font-mono font-bold text-base bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-hospital-600 hover:bg-hospital-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-hospital-600/20 transition-all flex items-center justify-center gap-2"
                >
                  Verify OTP & Proceed <ArrowRight size={16} />
                </button>
              </form>
            )}

            {/* STEP 3: Enter New Password */}
            {forgotStep === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} /> Confirm & Save New Password
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
