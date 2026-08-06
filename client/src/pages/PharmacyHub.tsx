import { useState } from 'react';
import { 
  Pill, 
  AlertCircle, 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  Search, 
  Plus, 
  X, 
  Truck, 
  Building2, 
  BellRing,
  ShieldCheck
} from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  category: string;
  instructions: string;
  timing: string;
  pillsLeft: number;
  totalPills: number;
  refillNeeded: boolean;
  price: number;
  doctor: string;
  color: string;
  iconBg: string;
}

const MEDICINES: Medicine[] = [
  { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotic', instructions: '1 capsule after breakfast & dinner', timing: '8:00 AM & 8:00 PM', pillsLeft: 10, totalPills: 14, refillNeeded: false, price: 12.50, doctor: 'Dr. Emily Chen', color: 'text-purple-500', iconBg: 'bg-purple-50 dark:bg-purple-900/20' },
  { id: 2, name: 'Lisinopril 10mg', category: 'Blood Pressure', instructions: '1 tablet in the morning with water', timing: '8:00 AM Daily', pillsLeft: 3, totalPills: 30, refillNeeded: true, price: 18.00, doctor: 'Dr. Sarah Smith', color: 'text-amber-500', iconBg: 'bg-amber-50 dark:bg-amber-900/20' },
  { id: 3, name: 'Metformin 500mg', category: 'Diabetes Care', instructions: '1 tablet with meals twice daily', timing: '9:00 AM & 7:00 PM', pillsLeft: 4, totalPills: 60, refillNeeded: true, price: 22.00, doctor: 'Dr. James Wilson', color: 'text-blue-500', iconBg: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 4, name: 'Atorvastatin 20mg', category: 'Cholesterol Care', instructions: '1 tablet at bedtime', timing: '9:30 PM Daily', pillsLeft: 22, totalPills: 30, refillNeeded: false, price: 15.00, doctor: 'Dr. Sarah Smith', color: 'text-indigo-500', iconBg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { id: 5, name: 'Omeprazole 20mg', category: 'Gastric Care', instructions: '1 capsule 30 mins before breakfast', timing: '7:30 AM Daily', pillsLeft: 18, totalPills: 28, refillNeeded: false, price: 14.20, doctor: 'Dr. Emily Chen', color: 'text-teal-500', iconBg: 'bg-teal-50 dark:bg-teal-900/20' },
  { id: 6, name: 'Montelukast 10mg', category: 'Asthma & Allergy', instructions: '1 tablet in the evening', timing: '7:00 PM Daily', pillsLeft: 5, totalPills: 30, refillNeeded: true, price: 19.50, doctor: 'Dr. James Wilson', color: 'text-rose-500', iconBg: 'bg-rose-50 dark:bg-rose-900/20' },
  { id: 7, name: 'Vitamin D3 60,000 IU', category: 'Supplements', instructions: '1 capsule weekly with warm milk', timing: 'Sundays at 9:00 AM', pillsLeft: 6, totalPills: 8, refillNeeded: false, price: 9.00, doctor: 'Dr. Sarah Smith', color: 'text-emerald-500', iconBg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 8, name: 'Paracetamol 650mg', category: 'Pain Relief', instructions: '1 tablet as needed for body pain (Max 3/day)', timing: 'As Needed', pillsLeft: 12, totalPills: 15, refillNeeded: false, price: 6.50, doctor: 'Dr. Emily Chen', color: 'text-cyan-500', iconBg: 'bg-cyan-50 dark:bg-cyan-900/20' },
];

export default function PharmacyHub() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [takenToday, setTakenToday] = useState<Record<number, boolean>>({ 1: true, 5: true });

  const filteredMeds = MEDICINES.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(search.toLowerCase()) || 
                          med.category.toLowerCase().includes(search.toLowerCase());
    if (activeFilter === 'Refill Needed') return matchesSearch && med.refillNeeded;
    if (activeFilter === 'Active') return matchesSearch && !med.refillNeeded;
    return matchesSearch;
  });

  const toggleTaken = (id: number) => {
    setTakenToday(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmRefillOrder = () => {
    if (!selectedMed) return;
    setToastMessage(`Refill order for ${selectedMed.name} confirmed! (${deliveryType === 'pickup' ? 'Hospital Pickup' : 'Home Delivery'})`);
    setSelectedMed(null);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in relative">

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce text-sm border border-gray-700">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medicines & Pharmacy</h1>
          <p className="text-gray-500">Track prescriptions, set dosage alerts, and order instant refills.</p>
        </div>

        <button 
          onClick={() => setSelectedMed(MEDICINES[1])}
          className="bg-hospital-600 hover:bg-hospital-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-hospital-600/20 flex items-center gap-2 w-fit"
        >
          <Plus size={18} /> Quick Refill Order
        </button>
      </div>

      {/* Daily Dosage Schedule Widget */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <BellRing size={20} className="animate-pulse text-purple-200" /> 
            Today's Dose Schedule
          </h2>
          <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">Aug 06, 2026</span>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { id: 5, time: '7:30 AM', name: 'Omeprazole 20mg', slot: 'Morning' },
            { id: 1, time: '8:00 AM', name: 'Amoxicillin 500mg', slot: 'Morning' },
            { id: 2, time: '8:00 AM', name: 'Lisinopril 10mg', slot: 'Morning' },
          ].map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleTaken(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                takenToday[item.id]
                  ? 'bg-white/20 border-white/40 backdrop-blur-sm'
                  : 'bg-black/20 border-white/10 hover:bg-black/30'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-200 block">{item.time} • {item.slot}</span>
                <span className="font-semibold text-sm block">{item.name}</span>
              </div>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                takenToday[item.id] ? 'bg-emerald-400 text-gray-900' : 'border-2 border-white/40'
              }`}>
                {takenToday[item.id] && <CheckCircle2 size={18} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search medicine or condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          {['All', 'Active', 'Refill Needed'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === filter 
                  ? 'bg-hospital-600 text-white shadow-sm' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid gap-4">
        {filteredMeds.map(med => (
          <div 
            key={med.id} 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
          >
            {/* Left Info */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${med.iconBg} ${med.color}`}>
                <Pill size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-hospital-600 transition-colors">{med.name}</h3>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {med.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{med.instructions}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                  <span className="flex items-center gap-1"><Clock size={13}/> {med.timing}</span>
                  <span>•</span>
                  <span>Prescribed by {med.doctor}</span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                {med.refillNeeded ? (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                    <AlertCircle size={14}/> Low Stock ({med.pillsLeft} left)
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck size={14}/> In Stock ({med.pillsLeft} left)
                  </span>
                )}
              </div>

              <button 
                onClick={() => setSelectedMed(med)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
                  med.refillNeeded 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' 
                    : 'bg-hospital-600 hover:bg-hospital-700 text-white shadow-hospital-600/20'
                }`}
              >
                <ShoppingCart size={15} /> 
                {med.refillNeeded ? 'Refill Now ($' + med.price.toFixed(2) + ')' : 'Order Refill'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* REFILL CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {selectedMed && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-zoom">
            
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingCart className="text-hospital-600" size={20} /> Order Medicine Refill
              </h3>
              <button 
                onClick={() => setSelectedMed(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Selected Medicine Info */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white text-base">{selectedMed.name}</h4>
              <p className="text-xs text-gray-500">{selectedMed.category} • {selectedMed.instructions}</p>
              <div className="flex justify-between items-center pt-2 text-xs">
                <span className="text-gray-400">Prescribing Doctor:</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{selectedMed.doctor}</span>
              </div>
            </div>

            {/* Delivery Option Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Fulfillment Option</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-3 rounded-2xl border text-xs font-medium flex flex-col items-center gap-2 transition-all ${
                    deliveryType === 'pickup'
                      ? 'border-hospital-500 bg-hospital-50 dark:bg-hospital-900/30 text-hospital-700 dark:text-hospital-300 font-bold'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <Building2 size={20} /> Hospital Pickup (Free)
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-3 rounded-2xl border text-xs font-medium flex flex-col items-center gap-2 transition-all ${
                    deliveryType === 'delivery'
                      ? 'border-hospital-500 bg-hospital-50 dark:bg-hospital-900/30 text-hospital-700 dark:text-hospital-300 font-bold'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <Truck size={20} /> Home Delivery (+$2.50)
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-1.5 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-3">
              <div className="flex justify-between">
                <span>Medicine Cost ({selectedMed.totalPills} pills):</span>
                <span className="font-semibold text-gray-900 dark:text-white">${selectedMed.price.toFixed(2)}</span>
              </div>
              {deliveryType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Home Delivery Charge:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">$2.50</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                <span>Total Amount:</span>
                <span className="text-hospital-600 dark:text-hospital-400">
                  ${(selectedMed.price + (deliveryType === 'delivery' ? 2.50 : 0)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <button 
              onClick={confirmRefillOrder}
              className="w-full bg-hospital-600 hover:bg-hospital-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-hospital-600/20 flex items-center justify-center gap-2 text-sm"
            >
              <CheckCircle2 size={18} /> Confirm Refill Order
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
