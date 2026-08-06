import React, { useState } from 'react';
import { Map, Navigation2, Search } from 'lucide-react';

export default function HospitalMap() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hospital Navigation</h1>
        <p className="text-gray-500">Find departments, wards, and facilities easily.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search for 'Cardiology', 'Pharmacy', 'Restrooms'..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white shadow-sm"
        />
      </div>

      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
        <Map size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Interactive SVG Map will render here</p>
        
        <div className="absolute bottom-6 right-6">
          <button className="bg-hospital-600 text-white p-4 rounded-full shadow-lg hover:bg-hospital-700 hover:scale-105 transition-all">
            <Navigation2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
