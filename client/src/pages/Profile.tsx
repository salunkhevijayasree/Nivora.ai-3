import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  Plus, 
  X, 
  HeartHandshake, 
  UserCheck 
} from 'lucide-react';
import { useAuth, type FamilyMember } from '../context/AuthContext';

export default function Profile() {
  const { logout, activeProfile, familyMembers, setActiveProfile, addFamilyMember } = useAuth();
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Family Member Form State
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('Spouse');
  const [newAge, setNewAge] = useState('');

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchProfile = (member: FamilyMember) => {
    setActiveProfile(member);
    setToastMessage(`Active profile switched to ${member.name} (${member.relation})`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newAge) return;

    addFamilyMember({
      name: newName,
      relation: newRelation,
      age: parseInt(newAge)
    });

    setShowAddModal(false);
    setNewName('');
    setNewAge('');
    setToastMessage(`Added ${newName} to family profiles successfully!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in relative">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-zoom border border-emerald-400">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Profile & ABHA Account</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage patient demographics, ABHA card ID, and family profiles.</p>
      </div>

      {/* Primary Patient Card */}
      <div className="bg-gradient-to-r from-hospital-700 via-hospital-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border-2 border-white/30 text-3xl font-bold shrink-0">
            {activeProfile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-3 py-0.5 rounded-full text-xs font-bold">
                {activeProfile.relation}
              </span>
              <span className="bg-white/15 text-white px-2.5 py-0.5 rounded-full text-xs font-medium">
                {activeProfile.age} Years Old
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">{activeProfile.name}</h2>
            <p className="text-xs text-hospital-200 font-mono">Patient Code: <strong className="text-white">{activeProfile.patientCode}</strong></p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-xs space-y-1.5 w-full md:w-auto shrink-0 relative z-10">
          <span className="text-hospital-200 block font-medium">ABHA Card ID (ABDM Connected)</span>
          <span className="font-mono text-sm font-bold block text-white">{activeProfile.abhaId}</span>
          <span className="text-[11px] text-emerald-300 flex items-center gap-1 font-semibold pt-1">
            <Shield size={13} /> Verified Digital Health Record
          </span>
        </div>

        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Family Member Profiles (8 Cols) */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="text-hospital-600" size={20} /> Family Profiles ({familyMembers.length})
              </h2>
              <p className="text-xs text-gray-400">Click any family member to switch active patient portal</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-hospital-600 hover:bg-hospital-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Plus size={16} /> Add Member
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {familyMembers.map(member => {
              const isSelected = activeProfile.id === member.id;
              return (
                <div 
                  key={member.id}
                  onClick={() => handleSwitchProfile(member)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected 
                      ? 'bg-hospital-50 dark:bg-hospital-950/40 border-hospital-500 ring-2 ring-hospital-500/40 shadow-md' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-hospital-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                      isSelected ? 'bg-hospital-600' : 'bg-gray-400 dark:bg-gray-700'
                    }`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">{member.name}</span>
                        {member.isPrimary && (
                          <span className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded">Primary</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.relation} • {member.age} yrs</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{member.patientCode}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="bg-hospital-600 text-white p-1.5 rounded-full shadow-sm">
                      <UserCheck size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Account Details & Settings (4 Cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings size={18} className="text-hospital-600" /> Active Account Settings
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700/60">
                <span className="text-gray-500">Active Patient</span>
                <span className="font-bold text-gray-900 dark:text-white">{activeProfile.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700/60">
                <span className="text-gray-500">Relation</span>
                <span className="font-semibold text-hospital-600 dark:text-hospital-400">{activeProfile.relation}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700/60">
                <span className="text-gray-500">Mobile Phone</span>
                <span className="font-mono text-gray-800 dark:text-gray-200">+91 98765 43210</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700/60">
                <span className="text-gray-500">ABHA Health Locker</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"><Shield size={12}/> Connected</span>
              </div>
            </div>

            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 font-bold transition-colors text-xs border border-red-200 dark:border-red-900/40 cursor-pointer"
            >
              <LogOut size={16}/> Sign Out of Nivora AI
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ADD FAMILY MEMBER MODAL */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddMember} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-zoom relative">
            
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <HeartHandshake className="text-hospital-600" size={20} /> Add Family Member Profile
              </h3>
              <button 
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Full Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-hospital-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Relationship</label>
                  <select 
                    value={newRelation}
                    onChange={(e) => setNewRelation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-hospital-500"
                  >
                    <option value="Spouse">Spouse (Husband/Wife)</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Age (Years)</label>
                  <input 
                    type="number"
                    required
                    placeholder="e.g. 45"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-hospital-500"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-hospital-600 hover:bg-hospital-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-hospital-600/20 text-sm flex items-center justify-center gap-2 pt-2"
            >
              <CheckCircle2 size={18} /> Link & Create Profile
            </button>

          </form>
        </div>
      )}

    </div>
  );
}
