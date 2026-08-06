import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Microscope, 
  Stethoscope, 
  Clock, 
  ShieldCheck, 
  X, 
  Printer, 
  CheckCircle2, 
  Activity, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface RecordItem {
  id: number;
  title: string;
  date: string;
  type: string;
  doctor: string;
  icon: any;
  color: string;
  bg: string;
}

const RECORDS: RecordItem[] = [
  { id: 1, title: 'Complete Blood Count (CBC)', date: '2026-08-01', type: 'Lab Report', doctor: 'Dr. James Wilson', icon: Microscope, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  { id: 2, title: 'Cardiology Consultation', date: '2026-07-28', type: 'Discharge Summary', doctor: 'Dr. Sarah Smith', icon: Stethoscope, color: 'text-hospital-500', bg: 'bg-hospital-50 dark:bg-hospital-900/20' },
  { id: 3, title: 'Chest X-Ray', date: '2026-07-25', type: 'Imaging', doctor: 'Dr. Alan Parker', icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { id: 4, title: 'Prescription - Amoxicillin', date: '2026-07-20', type: 'Prescription', doctor: 'Dr. Emily Chen', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
];

export default function MedicalRecords() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredRecords = RECORDS.filter(r => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Prescriptions') return r.type === 'Prescription';
    if (activeTab === 'Lab Reports') return r.type === 'Lab Report';
    if (activeTab === 'Imaging') return r.type === 'Imaging';
    if (activeTab === 'Discharge Summaries') return r.type === 'Discharge Summary';
    return true;
  });

  const handleDownload = (e: React.MouseEvent, record: RecordItem) => {
    e.stopPropagation();
    setToastMessage(`Downloading ${record.title} PDF report...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce text-sm">
          <Download size={18} className="text-hospital-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Records</h1>
          <p className="text-gray-500">Access your prescriptions, lab reports, and imaging safely.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 text-sm font-medium">
          <ShieldCheck size={16} /> Secured by ABHA
        </div>
      </div>

      {/* Category Tabs */}
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

      {/* Record List */}
      <div className="grid gap-4">
        {filteredRecords.map(record => (
          <div 
            key={record.id} 
            onClick={() => setSelectedRecord(record)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all group cursor-pointer active:scale-[0.99]"
          >
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
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedRecord(record); }}
                className="p-2 text-gray-400 hover:text-hospital-600 hover:bg-hospital-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="View Document"
              >
                <Eye size={20} />
              </button>
              <button 
                onClick={(e) => handleDownload(e, record)}
                className="p-2 text-gray-400 hover:text-hospital-600 hover:bg-hospital-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* DETAILED SAMPLE REPORT MODALS */}
      {/* ========================================================================= */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative space-y-6 animate-zoom">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${selectedRecord.bg} ${selectedRecord.color}`}>
                  <selectedRecord.icon size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedRecord.title}</h2>
                  <p className="text-xs text-gray-500">{selectedRecord.type} • {selectedRecord.date}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Patient & Hospital Header Banner */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-gray-400 font-medium block">Patient Name</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">RENU SHARMA</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block">Patient ID</span>
                <span className="font-semibold text-hospital-600 dark:text-hospital-400">MED-29834</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block">Doctor In Charge</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedRecord.doctor}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block">ABHA ID</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">91-xxxx-4321</span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 1. CBC LAB REPORT CONTENT */}
            {/* ========================================================= */}
            {selectedRecord.id === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span>TEST PARAMETER</span>
                  <span>RESULT</span>
                  <span>REFERENCE RANGE</span>
                  <span>STATUS</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  {[
                    { name: 'Hemoglobin (Hb)', val: '13.8 g/dL', ref: '12.0 - 15.5', ok: true },
                    { name: 'Red Blood Cells (RBC)', val: '4.6 M/µL', ref: '4.0 - 5.2', ok: true },
                    { name: 'White Blood Cells (WBC)', val: '7,400 /µL', ref: '4,500 - 11,000', ok: true },
                    { name: 'Platelet Count', val: '260,000 /µL', ref: '150,000 - 450,000', ok: true },
                    { name: 'Hematocrit (PCV)', val: '41.2 %', ref: '37.0 - 48.0', ok: true },
                    { name: 'Neutrophils', val: '62 %', ref: '40 - 70', ok: true },
                    { name: 'Lymphocytes', val: '28 %', ref: '20 - 40', ok: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800/50">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{item.val}</span>
                      <span className="text-xs text-gray-400">{item.ref}</span>
                      <span className="text-emerald-500 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 size={14} /> Normal
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 p-3 rounded-xl text-xs text-teal-800 dark:text-teal-300">
                  <strong>Pathologist Impression:</strong> Complete blood count indicates normal cell counts and hemoglobin concentration. No evidence of anemia or acute infection.
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 2. CARDIOLOGY CONSULTATION CONTENT */}
            {/* ========================================================= */}
            {selectedRecord.id === 2 && (
              <div className="space-y-4 text-sm">
                <div className="bg-hospital-50 dark:bg-hospital-900/20 border border-hospital-200 dark:border-hospital-800 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold text-hospital-800 dark:text-hospital-300 flex items-center gap-2">
                    <Activity size={16} /> Clinical Summary & ECG Findings
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    Patient presented for routine cardiac evaluation. Complains of mild non-specific chest tight feeling after exertion. No shortness of breath or dizziness reported.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                    <span className="text-gray-400 block font-medium">Blood Pressure</span>
                    <span className="text-base font-bold text-gray-900 dark:text-white">128 / 82 mmHg</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                    <span className="text-gray-400 block font-medium">Heart Rate</span>
                    <span className="text-base font-bold text-gray-900 dark:text-white">74 bpm (Regular)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">2D Echocardiogram Result:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Left Ventricular Ejection Fraction (LVEF): <strong>62% (Preserved)</strong></li>
                    <li>No regional wall motion abnormalities observed.</li>
                    <li>Aortic and Mitral valves show normal leaflet motion.</li>
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                  <strong>Advice:</strong> Continue low-salt Mediterranean diet. Daily moderate walking 30 mins. Follow up in 6 months.
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 3. CHEST X-RAY CONTENT */}
            {/* ========================================================= */}
            {selectedRecord.id === 3 && (
              <div className="space-y-4">
                {/* Simulated Radiograph Image */}
                <div className="bg-black rounded-2xl h-48 relative overflow-hidden flex items-center justify-center border border-gray-700 shadow-inner group">
                  <div className="text-center space-y-2">
                    <Eye size={40} className="mx-auto text-gray-500 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-gray-400 font-mono">CHEST PA VIEW — DIGITAL RADIOGRAPH #XRY-8821</p>
                    <span className="inline-block bg-emerald-900/80 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-700 font-mono">DIGITAL DICOM VERIFIED</span>
                  </div>
                  {/* Subtle Ribcage Graphic Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
                </div>

                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Radiological Findings:</h4>
                  <p><strong>Lungs:</strong> Both lung fields are clear. No focal consolidation, pleural effusion, or pneumothorax.</p>
                  <p><strong>Heart & Mediastinum:</strong> Cardiothoracic ratio is normal (&lt; 0.5). Mediastinal contours are unremarkable.</p>
                  <p><strong>Bones:</strong> Visualized ribcage and clavicles show no bony abnormality.</p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-3 rounded-xl text-xs text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                  <FileCheck size={16} />
                  <span><strong>Impression:</strong> Normal Posteroanterior (PA) Chest Radiograph.</span>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 4. PRESCRIPTION CONTENT */}
            {/* ========================================================= */}
            {selectedRecord.id === 4 && (
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                  <span className="text-xs font-mono text-gray-400">Rx No: RX-992014</span>
                  <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 text-xs px-2.5 py-0.5 rounded-full font-semibold">Active Prescription</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-4 rounded-2xl space-y-1">
                    <h4 className="font-bold text-purple-900 dark:text-purple-200">1. Amoxicillin 500mg Capsule</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Dosage: 1 capsule twice daily (after breakfast & dinner) for 7 days</p>
                    <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">Quantity: 14 Capsules • Finish entire antibiotic course</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl space-y-1">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">2. Paracetamol 500mg Tablet</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Dosage: 1 tablet as needed for fever or mild body ache (Max 3/day)</p>
                    <p className="text-[11px] text-gray-500 font-medium">Quantity: 10 Tablets • Take after meals</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><AlertCircle size={14}/> Refill available at Nivora Pharmacy</span>
                  <span className="font-serif italic font-semibold text-gray-800 dark:text-gray-200">Dr. Emily Chen (E-Signed)</span>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Printer size={16} /> Print Report
              </button>
              <button 
                onClick={(e) => { handleDownload(e, selectedRecord); }}
                className="px-5 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-hospital-600/20"
              >
                <Download size={16} /> Download PDF
              </button>
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
}
