import { UserCircle, Shield, Users, Settings, LogOut } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-6 animate-in">
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-hospital-100 text-hospital-600 dark:bg-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center shadow-inner">
          <UserCircle size={64} />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">RENU SHARMA</h1>
          <p className="text-gray-500 mb-2">Patient ID: MED-29834</p>
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-800">
            <Shield size={14} /> ABHA Linked: 91-xxxx-xxxx-4321
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4"><Users size={20} className="text-hospital-500"/> Family Profiles</h2>
          <div className="space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600"><UserCircle size={20}/></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Rajesh Sharma</p>
                  <p className="text-xs text-gray-500">Husband</p>
                </div>
              </div>
              <button className="text-hospital-600 text-sm font-medium">Switch</button>
            </div>
            <button className="w-full py-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 font-medium hover:border-hospital-400 hover:text-hospital-600 transition-colors">
              + Add Family Member
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4"><Settings size={20} className="text-gray-400"/> Settings</h2>
          <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg text-left text-gray-700 dark:text-gray-300 font-medium">
              Language Preferences <span className="text-hospital-500">English / हिन्दी</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg text-left text-gray-700 dark:text-gray-300 font-medium">
              Notification Settings
            </button>
            <button className="w-full flex items-center gap-2 p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-left text-red-600 font-medium transition-colors mt-4">
              <LogOut size={18}/> Sign Out
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
