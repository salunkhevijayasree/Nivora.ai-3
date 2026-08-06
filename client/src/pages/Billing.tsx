import { CreditCard, FileText, CheckCircle2 } from 'lucide-react';

export default function Billing() {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bills & Payments</h1>
        <p className="text-gray-500">Manage your hospital bills and view payment history.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Current Outstanding</h2>
          <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">Unpaid</span>
        </div>
        
        <div className="text-4xl font-black text-gray-900 dark:text-white mb-6">₹1,450.00</div>
        
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
          <div className="flex justify-between"><span>Consultation (Dr. Smith)</span><span>₹1,000.00</span></div>
          <div className="flex justify-between"><span>Lab Tests (CBC)</span><span>₹450.00</span></div>
        </div>

        <button className="w-full bg-hospital-600 hover:bg-hospital-700 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
          <CreditCard size={20} /> Pay Now (UPI / NetBanking / Cards)
        </button>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mt-8 mb-4">Past Invoices</h3>
      <div className="space-y-3">
        {[1, 2].map(i => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-emerald-500 shadow-sm"><CheckCircle2 size={20}/></div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Invoice INV-00{i}</p>
                <p className="text-xs text-gray-500">Aug 0{i}, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-900 dark:text-white">₹1,200.00</span>
              <button className="text-hospital-600 hover:text-hospital-700 bg-hospital-50 dark:bg-hospital-900/20 p-2 rounded-lg"><FileText size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
