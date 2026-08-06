import React from 'react';
import { Pill, AlertCircle, ShoppingCart } from 'lucide-react';

const MEDICINES = [
  { id: 1, name: 'Amoxicillin 500mg', instructions: '1 pill after breakfast & dinner', stock: 'In Stock', refill: false, color: 'text-purple-500' },
  { id: 2, name: 'Lisinopril 10mg', instructions: '1 pill in the morning', stock: 'Low Stock', refill: true, color: 'text-amber-500' },
];

export default function PharmacyHub() {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medicines & Pharmacy</h1>
        <p className="text-gray-500">Track your prescriptions, set reminders, and order refills.</p>
      </div>
      
      <div className="grid gap-4">
        {MEDICINES.map(med => (
          <div key={med.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 ${med.color}`}>
                <Pill size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{med.name}</h3>
                <p className="text-sm text-gray-500">{med.instructions}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end gap-2">
              {med.refill ? (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 flex items-center gap-1 w-fit">
                  <AlertCircle size={14}/> Refill Needed
                </span>
              ) : (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 w-fit">
                  Active
                </span>
              )}
              <button className="bg-hospital-600 hover:bg-hospital-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={16} /> Order Refill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
