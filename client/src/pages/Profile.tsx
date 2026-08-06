import { useState } from 'react';
import { 
  UserCircle, 
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

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  age: number;
  patientCode: string;
  abhaId: string;
  isPrimary?: boolean;
}

const INITIAL_FAMILY: FamilyMember[] = [
  { id: 1, name: 'Puja Sharma', relation: 'Self (Primary)', age: 34, patientCode: 'MED-29834', abhaId: '91-9876-5432-1098', isPrimary: true },
  { id: 2, name: 'William Sharma', relation: 'Husband', age: 37, patientCode: 'MED-30112', abhaId: '91-8765-4321-0987' },
  { id: 3, name: 'Ram Prakash Sharma', relation: 'Father', age: 68, patientCode: 'MED-10492', abhaId: '91-7654-3210-9876' },
  { id: 4, name: 'Sunita Sharma', relation: 'Mother', age: 64, patientCode: 'MED-10493', abhaId: '91-6543-2109-8765' },
  { id: 5, name: 'Aarav Sharma', relation: 'Son', age: 12, patientCode: 'MED-44910', abhaId: '91-5432-1098-7654' },
  { id: 6, name: 'Ananya Sharma', relation: 'Daughter', age: 8, patientCode: 'MED-44911', abhaId: '91-4321-0987-6543' },
];

export default function Profile() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(INITIAL_FAMILY);
  const [activeProfile, setActiveProfile] = useState<FamilyMember>(INITIAL_FAMILY[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Family Member Form State
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('Spouse');
  const [newAge, setNewAge] = useState('');

  const handleSwitchProfile = (member: FamilyMember) => {
    setActiveProfile(member);
    setToastMessage(`Switched active profile to ${member.name} (${member.relation})`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newAge) return;

    const newMember: FamilyMember = {
      id: Date.now(),
      name: newName,
      relation: newRelation,
      age: parseInt(newAge),
      patientCode: `MED-${Math.floor(10000 + Math.random() * 90000)}`,
      abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setFamilyMembers(prev => [...prev, newMember]);
    setShowAddModal(false);
    setNewName('');
    setNewAge('');
    setToastMessage(`Added ${newMember.name} to family profiles successfully!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in relative">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce text-sm border border-gray-700">
          <UserCheck size={18} className="text-hospital-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="w-24 h-24 bg-hospital-100 text-hospital-600 dark:bg-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center shadow-inner shrink-0">
          <UserCircle size={64} />
        </div>

        <div className="text-center md:text-left flex-1 space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {activeProfile.name}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-hospital-50 text-hospital-600 dark:bg-hospital-900/30 dark:text-hospital-300 w-fit mx-auto sm:mx-0">
              {activeProfile.relation}
            </span>
          </div>

          <p className="text-sm text-gray-500">Patient ID: <strong className="text-gray-800 dark:text-gray-200 font-mono">{activeProfile.patientCode}</strong> • Age: {activeProfile.age} yrs</p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
              <Shield size={14} /> ABHA Linked: {activeProfile.abhaId}
            </div>
            <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
              <CheckCircle2 size={13} /> Active Encounter
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Family Members List (7 cols) */}
        <div className="md:col-span-7 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-base">
                <Users size={20} className="text-hospital-600"/> Family Profiles ({familyMembers.length})
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Switch profiles to book or view records for family members.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-hospital-50 dark:bg-hospital-900/30 text-hospital-600 dark:text-hospital-400 hover:bg-hospital-100 p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <Plus size={16} /> Add Member
            </button>
          </div>

          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div 
                key={member.id}
                onClick={() => handleSwitchProfile(member)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeProfile.id === member.id
                    ? 'border-hospital-500 bg-hospital-50/70 dark:bg-hospital-900/30 shadow-sm ring-1 ring-hospital-500'
                    : 'border-gray-100 dark:border-gray-700/60 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    activeProfile.id === member.id ? 'bg-hospital-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {member.name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                      {member.name}
                      {member.isPrimary && (
                        <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold">Account Holder</span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500">{member.relation} • Age: {member.age} yrs • <span className="font-mono text-gray-400">{member.patientCode}</span></p>
                  </div>
                </div>

                <button className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeProfile.id === member.id
                    ? 'bg-hospital-600 text-white'
                    : 'text-hospital-600 hover:bg-hospital-50 dark:hover:bg-gray-700'
                }`}>
                  {activeProfile.id === member.id ? 'Active' : 'Switch'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings & Quick Links (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-base border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings size={20} className="text-gray-400"/> Account Settings
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium text-gray-700 dark:text-gray-300">Registered Phone</span>
                <span className="font-mono text-gray-900 dark:text-white font-bold">+91-98765-43210</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium text-gray-700 dark:text-gray-300">Primary Language</span>
                <span className="font-bold text-hospital-600">English / हिन्दी</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium text-gray-700 dark:text-gray-300">ABHA Health Locker</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"><Shield size={12}/> Connected</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-red-600 font-bold transition-colors text-xs border border-red-100 dark:border-red-900/30">
              <LogOut size={16}/> Sign Out
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
                <HeartHandshake className="text-hospital-600" size={20} /> Add Family Member
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
                    <option value="Spouse">Spouse</option>
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
