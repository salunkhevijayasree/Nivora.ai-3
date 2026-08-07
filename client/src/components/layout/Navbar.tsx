import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Bell, UserCircle, Activity, Bot, Sparkles, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenAIChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chatbot'));
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login';

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-gray-900/80 border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-hospital-600 p-2 rounded-xl text-white group-hover:scale-105 transition-transform shadow-lg shadow-hospital-500/30">
            <Activity size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            NIVORA<span className="text-hospital-500">.AI</span>
          </span>
        </Link>

        {/* Right Upper-Hand Actions */}
        <div className="flex items-center gap-3">
          
          {/* Upper-Right Hand AI Chatbot Button */}
          {!isAuthPage && (
            <button
              onClick={handleOpenAIChat}
              className="flex items-center gap-1.5 bg-gradient-to-r from-hospital-600 to-indigo-600 hover:from-hospital-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md shadow-hospital-600/20 transition-all hover:scale-105 active:scale-95 border border-white/20"
              title="Open NIVORA AI Assistant"
            >
              <Bot size={15} className="text-hospital-200 animate-pulse" />
              <span className="hidden sm:inline-block">Ask NIVORA AI</span>
              <Sparkles size={13} className="text-amber-300" />
            </button>
          )}

          {!isAuthPage && (
            <button className="p-2 rounded-full hover:bg-gray-800 relative text-gray-300 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-900"></span>
            </button>
          )}
          
          <div className="p-2 rounded-full text-hospital-400 bg-gray-800/80 border border-gray-700/60" title="Dark Mode Active">
            <Moon size={18} />
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 border-l border-gray-800">
              <Link to="/patient/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-hospital-400 border border-hospital-500/40">
                  <UserCircle size={22} />
                </div>
                <span className="text-xs font-bold text-gray-200 hidden sm:block">
                  {user?.name || 'Puja Sharma'}
                </span>
              </Link>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1 transition-all ml-1"
                title="Sign Out of Nivora AI"
              >
                <LogOut size={16} />
                <span className="hidden md:inline-block">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-hospital-600 hover:bg-hospital-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all ml-2"
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </Link>
          )}

        </div>

      </div>
    </header>
  );
}
