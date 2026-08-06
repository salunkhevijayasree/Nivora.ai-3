import { useState } from 'react';
import { FileText, Download, Eye, Microscope, Stethoscope, Clock, ShieldCheck } from 'lucide-react';

const RECORDS = [
  { id: 1, title: 'Complete Blood Count (CBC)', date: '2026-08-01', type: 'Lab Report', doctor: 'Dr. James Wilson', icon: Microscope, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  { id: 2, title: 'Cardiology Consultation', date: '2026-07-28', type: 'Discharge Summary', doctor: 'Dr. Sarah Smith', icon: Stethoscope, color: 'text-hospital-500', bg: 'bg-hospital-50 dark:bg-hospital-900/20' },
  { id: 3, title: 'Chest X-Ray', date: '2026-07-25', type: 'Imaging', doctor: 'Dr. Alan Parker', icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { id: 4, title: 'Prescription - Amoxicillin', date: '2026-07-20', type: 'Prescription', doctor: 'Dr. Emily Chen', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
];

export default function MedicalRecords() {
  const [activeTab, setActiveTab] = useState('All');
  
  return (
    <div className="space-y-6 animate-in">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Records</h1>
          <p className="text-gray-500">Access your prescriptions, lab reports, and imaging safely.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 text-sm font-medium">
          <ShieldCheck size={16} /> Secured by ABHA
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {['All', 'Prescriptions', 'Lab Reports', 'Imaging', 'Discharge Summaries'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab 
                ? 'bg-hospital-600 text-white shadow-md' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {RECORDS.map(record => (
          <div key={record.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
            
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${record.bg} ${record.color}`}>
                <record.icon size={24} />
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-hospital-600 transition-colors">{record.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Clock size={14}/> {record.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{record.doctor}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:block text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mr-2">
                {record.type}
              </span>
              <button className="p-2 text-gray-400 hover:text-hospital-600 hover:bg-hospital-50 rounded-lg transition-colors">
                <Eye size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-hospital-600 hover:bg-hospital-50 rounded-lg transition-colors">
                <Download size={20} />
              </button>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}
