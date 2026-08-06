import React, { useState } from 'react';
import { Calendar as CalendarIcon, Search, Clock, MapPin, Star, User } from 'lucide-react';
import clsx from 'clsx';

const DUMMY_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiologist', rating: 4.9, experience: '15 yrs', available: true },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Neurologist', rating: 4.8, experience: '12 yrs', available: true },
  { id: 3, name: 'Dr. Emily Chen', specialty: 'Pediatrician', rating: 4.9, experience: '8 yrs', available: false },
  { id: 4, name: 'Dr. Michael Brown', specialty: 'Orthopedics', rating: 4.7, experience: '20 yrs', available: true },
];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:45 PM', '04:30 PM'];

export default function AppointmentBooking() {
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const filteredDoctors = DUMMY_DOCTORS.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Book Appointment</h1>
        <p className="text-gray-500 dark:text-gray-400">Search doctors by specialty and book available slots.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search by name, specialty, or condition..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white shadow-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Doctor List */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300">Select Doctor</h2>
          <div className="space-y-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredDoctors.map(doctor => (
              <div 
                key={doctor.id}
                onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
                className={clsx(
                  "p-4 rounded-xl border transition-all cursor-pointer flex gap-4",
                  selectedDoctor === doctor.id 
                    ? "border-hospital-500 bg-hospital-50 dark:bg-hospital-900/20" 
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-hospital-300",
                  !doctor.available && "opacity-50 cursor-not-allowed grayscale"
                )}
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={24} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                    <div className="flex items-center text-sm font-medium text-amber-500">
                      <Star size={14} className="fill-current mr-1" />
                      {doctor.rating}
                    </div>
                  </div>
                  <p className="text-sm text-hospital-600 dark:text-hospital-400 font-medium">{doctor.specialty}</p>
                  <div className="mt-2 text-xs text-gray-500 flex gap-3">
                    <span className="flex items-center gap-1"><Clock size={12}/> {doctor.experience} Exp</span>
                    <span className="flex items-center gap-1"><MapPin size={12}/> Floor 3, Block A</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slot Selection */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm h-fit sticky top-20">
          {selectedDoctor ? (
            <>
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <CalendarIcon size={18} className="text-hospital-500"/> 
                Available Slots
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={clsx(
                      "py-2 px-3 rounded-lg border text-sm font-medium transition-all text-center",
                      selectedSlot === slot 
                        ? "bg-hospital-600 border-hospital-600 text-white shadow-md shadow-hospital-500/20" 
                        : "border-gray-200 dark:border-gray-700 hover:border-hospital-400 dark:text-gray-300 dark:hover:bg-gray-700"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              
              <button 
                disabled={!selectedSlot}
                className="w-full bg-hospital-600 hover:bg-hospital-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-hospital-500/20"
              >
                Confirm Booking
              </button>
            </>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400">
              <CalendarIcon size={48} className="mb-4 opacity-50" />
              <p>Select a doctor to view available slots</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
