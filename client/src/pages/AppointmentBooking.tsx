import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Clock, 
  MapPin, 
  Star, 
  UserCheck, 
  CheckCircle2, 
  Award, 
  IndianRupee, 
  X, 
  Video, 
  Building2 
} from 'lucide-react';
import clsx from 'clsx';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  rating: number;
  reviews: number;
  experience: string;
  fee: number;
  location: string;
  available: boolean;
  avatarBg: string;
}

const DOCTORS: Doctor[] = [
  { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiology', qualification: 'MD, DM Cardiology', rating: 4.9, reviews: 234, experience: '15 yrs', fee: 800, location: 'OPD 304, 3rd Floor', available: true, avatarBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Neurology', qualification: 'MD, DM Neurology', rating: 4.8, reviews: 189, experience: '12 yrs', fee: 750, location: 'OPD 412, 4th Floor', available: true, avatarBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' },
  { id: 3, name: 'Dr. Emily Chen', specialty: 'Pediatrics', qualification: 'MD Pediatrics', rating: 4.9, reviews: 312, experience: '8 yrs', fee: 600, location: 'OPD 201, 2nd Floor', available: true, avatarBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  { id: 4, name: 'Dr. Michael Brown', specialty: 'Orthopedics', qualification: 'MS Orthopedics', rating: 4.7, reviews: 156, experience: '20 yrs', fee: 900, location: 'OPD 502, 5th Floor', available: true, avatarBg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
  { id: 5, name: 'Dr. Priya Sharma', specialty: 'Dermatology', qualification: 'MD Dermatology & Cosmetology', rating: 4.9, reviews: 275, experience: '10 yrs', fee: 700, location: 'OPD 108, 1st Floor', available: true, avatarBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' },
  { id: 6, name: 'Dr. Rajesh Gupta', specialty: 'Gastroenterology', qualification: 'MD, DM Gastroenterology', rating: 4.8, reviews: 198, experience: '14 yrs', fee: 850, location: 'OPD 310, 3rd Floor', available: true, avatarBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  { id: 7, name: 'Dr. Ananya Roy', specialty: 'Gynecology', qualification: 'MS Obstetrics & Gynecology', rating: 4.9, reviews: 340, experience: '11 yrs', fee: 750, location: 'OPD 205, 2nd Floor', available: true, avatarBg: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300' },
  { id: 8, name: 'Dr. Vikram Patel', specialty: 'Pulmonology', qualification: 'MD Pulmonary Medicine', rating: 4.7, reviews: 142, experience: '16 yrs', fee: 800, location: 'OPD 405, 4th Floor', available: true, avatarBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300' },
  { id: 9, name: 'Dr. Meera Iyer', specialty: 'Ophthalmology', qualification: 'MS Ophthalmology', rating: 4.8, reviews: 167, experience: '9 yrs', fee: 650, location: 'OPD 115, 1st Floor', available: true, avatarBg: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300' },
  { id: 10, name: 'Dr. Suresh Kumar', specialty: 'ENT', qualification: 'MS Otorhinolaryngology (ENT)', rating: 4.6, reviews: 118, experience: '13 yrs', fee: 700, location: 'OPD 212, 2nd Floor', available: true, avatarBg: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300' },
];

const SPECIALTIES = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Gastroenterology', 'Gynecology', 'Pulmonology', 'ENT'];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:45 PM', '04:30 PM'];

export default function AppointmentBooking() {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(DOCTORS[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<'in-person' | 'video'>('in-person');
  const [bookingSuccessModal, setBookingSuccessModal] = useState<any | null>(null);

  const filteredDoctors = DOCTORS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                          d.specialty.toLowerCase().includes(search.toLowerCase()) ||
                          d.qualification.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || d.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedSlot) return;

    const tokenNumber = Math.floor(35 + Math.random() * 20);
    setBookingSuccessModal({
      doctor: selectedDoctor,
      slot: selectedSlot,
      tokenNumber,
      type: consultationType,
      date: 'Aug 06, 2026'
    });
  };

  return (
    <div className="space-y-6 animate-in relative">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Doctor & Book Appointment</h1>
        <p className="text-gray-500 dark:text-gray-400">Browse specialist doctors, check qualifications, and select available slots.</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search by doctor name, specialty (e.g. Cardiology, Dermatology)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-hospital-500 outline-none transition-all shadow-sm font-medium"
        />
      </div>

      {/* Specialty Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {SPECIALTIES.map(spec => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedSpecialty === spec 
                ? 'bg-hospital-600 text-white shadow-md' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Main Grid: Doctor List + Booking Panel */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Doctor List Column (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
              Specialists ({filteredDoctors.length})
            </h2>
            <span className="text-xs text-gray-400">Click a doctor to book</span>
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredDoctors.map(doctor => (
              <div 
                key={doctor.id}
                onClick={() => { setSelectedDoctor(doctor); setSelectedSlot(null); }}
                className={clsx(
                  "p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start group",
                  selectedDoctor?.id === doctor.id 
                    ? "border-hospital-500 bg-hospital-50/80 dark:bg-hospital-900/20 shadow-md ring-1 ring-hospital-500" 
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-hospital-300 hover:shadow-sm"
                )}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${doctor.avatarBg}`}>
                  {doctor.name.split(' ')[1]?.[0]}{doctor.name.split(' ')[2]?.[0] || 'D'}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-hospital-600 transition-colors text-base">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md">
                      <Star size={12} className="fill-current mr-1" />
                      {doctor.rating} ({doctor.reviews})
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-hospital-600 dark:text-hospital-400">{doctor.specialty}</p>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1"><Award size={12}/> {doctor.qualification}</p>

                  <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 dark:border-gray-700/50">
                    <span className="flex items-center gap-1"><Clock size={12}/> {doctor.experience} Exp</span>
                    <span className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
                      <IndianRupee size={12} /> {doctor.fee}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400"><MapPin size={12}/> {doctor.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Slot Selection Column (5 cols) */}
        <div className="md:col-span-5">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm sticky top-20 space-y-5">
            {selectedDoctor ? (
              <>
                {/* Doctor Selected Banner */}
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${selectedDoctor.avatarBg}`}>
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{selectedDoctor.name}</h3>
                    <p className="text-xs text-hospital-600 dark:text-hospital-400 font-medium">{selectedDoctor.specialty} • ₹{selectedDoctor.fee}</p>
                    <p className="text-[11px] text-gray-400">{selectedDoctor.location}</p>
                  </div>
                </div>

                {/* Consultation Type Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Consultation Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setConsultationType('in-person')}
                      className={clsx(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all",
                        consultationType === 'in-person'
                          ? "border-hospital-500 bg-hospital-50 dark:bg-hospital-900/30 text-hospital-700 dark:text-hospital-300 font-bold"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                      )}
                    >
                      <Building2 size={16} /> In-Person OPD
                    </button>

                    <button
                      onClick={() => setConsultationType('video')}
                      className={clsx(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all",
                        consultationType === 'video'
                          ? "border-hospital-500 bg-hospital-50 dark:bg-hospital-900/30 text-hospital-700 dark:text-hospital-300 font-bold"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                      )}
                    >
                      <Video size={16} /> Video Consult
                    </button>
                  </div>
                </div>

                {/* Available Time Slots */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-xs">
                    <CalendarIcon size={14} className="text-hospital-500"/> 
                    Available Slots Today (Aug 06, 2026)
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={clsx(
                          "py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all text-center",
                          selectedSlot === slot 
                            ? "bg-hospital-600 border-hospital-600 text-white shadow-md shadow-hospital-600/20" 
                            : "border-gray-200 dark:border-gray-700 hover:border-hospital-400 dark:text-gray-300 dark:hover:bg-gray-700"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button 
                  disabled={!selectedSlot}
                  onClick={handleConfirmBooking}
                  className="w-full bg-hospital-600 hover:bg-hospital-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-hospital-600/20 text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} /> 
                  {selectedSlot ? `Confirm Booking (₹${selectedDoctor.fee})` : 'Select a Time Slot'}
                </button>
              </>
            ) : (
              <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-gray-400 text-center p-4">
                <UserCheck size={48} className="mb-4 opacity-40 text-hospital-500" />
                <p className="font-medium text-sm text-gray-600 dark:text-gray-300">Select a specialist doctor</p>
                <p className="text-xs text-gray-400 mt-1">Choose from the doctor list to check available slots & book.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* BOOKING CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-zoom relative">
            
            <button 
              onClick={() => setBookingSuccessModal(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2 pt-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Appointment Confirmed!</h3>
              <p className="text-xs text-gray-500">Your token has been generated successfully.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="text-gray-400 font-medium">Your Token Number</span>
                <span className="text-2xl font-black text-hospital-600 dark:text-hospital-400">#{bookingSuccessModal.tokenNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Doctor:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{bookingSuccessModal.doctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Specialty:</span>
                <span className="font-semibold text-hospital-600">{bookingSuccessModal.doctor.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Slot:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{bookingSuccessModal.date} at {bookingSuccessModal.slot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{bookingSuccessModal.doctor.location}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-bold text-sm">
                <span>Fee Amount:</span>
                <span className="text-emerald-600 dark:text-emerald-400">₹{bookingSuccessModal.doctor.fee}</span>
              </div>
            </div>

            <button 
              onClick={() => setBookingSuccessModal(null)}
              className="w-full bg-hospital-600 hover:bg-hospital-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-hospital-600/20 text-sm"
            >
              Done & View Live Queue
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
