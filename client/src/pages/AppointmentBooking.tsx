import { useState } from 'react';
import { 
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
  Building2,
  Sun,
  Sunrise,
  Moon
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

const VISITING_DATES = [
  { label: 'Today', date: 'Aug 07', day: 'Fri' },
  { label: 'Tomorrow', date: 'Aug 08', day: 'Sat' },
  { label: 'Day After', date: 'Aug 09', day: 'Sun' },
];

const TIME_SLOTS_DATA = [
  { time: '09:00 AM', session: 'Morning', icon: Sunrise, color: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 hover:border-emerald-400', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' },
  { time: '10:30 AM', session: 'Morning', icon: Sunrise, color: 'bg-teal-950/70 border-teal-500/50 text-teal-300 hover:border-teal-400', badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/30' },
  { time: '11:45 AM', session: 'Morning', icon: Sunrise, color: 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 hover:border-cyan-400', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' },
  { time: '02:15 PM', session: 'Afternoon', icon: Sun, color: 'bg-amber-950/70 border-amber-500/50 text-amber-300 hover:border-amber-400', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  { time: '03:45 PM', session: 'Afternoon', icon: Sun, color: 'bg-orange-950/70 border-orange-500/50 text-orange-300 hover:border-orange-400', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-400/30' },
  { time: '05:30 PM', session: 'Evening', icon: Moon, color: 'bg-indigo-950/70 border-indigo-500/50 text-indigo-300 hover:border-indigo-400', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30' },
  { time: '06:45 PM', session: 'Evening', icon: Moon, color: 'bg-purple-950/70 border-purple-500/50 text-purple-300 hover:border-purple-400', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30' },
  { time: '07:30 PM', session: 'Evening', icon: Moon, color: 'bg-rose-950/70 border-rose-500/50 text-rose-300 hover:border-rose-400', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30' },
];

export default function AppointmentBooking() {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(DOCTORS[0]);
  const [selectedDate, setSelectedDate] = useState('Today - Aug 07');
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

    const tokenNumber = Math.floor(15 + Math.random() * 50);

    setBookingSuccessModal({
      doctor: selectedDoctor,
      slot: selectedSlot,
      date: selectedDate,
      type: consultationType,
      tokenNumber,
      bookingId: `NIV-${Math.floor(100000 + Math.random() * 900000)}`
    });
  };

  return (
    <div className="space-y-6 animate-in">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Doctor & Book Appointment</h1>
        <p className="text-gray-500 dark:text-gray-400">Browse specialist doctors, check qualifications, select visiting time slots, and receive instant OPD tokens.</p>
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
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedSpecialty === spec 
                ? 'bg-hospital-600 text-white shadow-md' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Two-Column Booking Layout */}
      <div className="grid md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Doctor Selection Cards (7 Cols) */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
              Specialists ({filteredDoctors.length})
            </h2>
            <span className="text-xs text-gray-400">Click a doctor to select slot</span>
          </div>

          <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1 custom-scrollbar">
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
                  {doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-hospital-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                      <Star size={12} className="fill-current" /> {doctor.rating} ({doctor.reviews})
                    </span>
                  </div>

                  <p className="text-xs font-medium text-hospital-600 dark:text-hospital-400">{doctor.specialty} • {doctor.qualification}</p>
                  
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                    <span className="flex items-center gap-1"><Award size={12} className="text-gray-400"/> Exp: {doctor.experience}</span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400"><IndianRupee size={12}/> ₹{doctor.fee} OPD Fee</span>
                  </div>

                  <p className="text-[11px] text-gray-400 flex items-center gap-1 pt-0.5">
                    <MapPin size={11} className="text-hospital-400" /> {doctor.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Time Slot & Visiting Time Box (5 Cols) */}
        <div className="md:col-span-5 space-y-4 sticky top-20">
          <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-3xl p-5 shadow-xl space-y-4">
            
            {selectedDoctor ? (
              <>
                {/* Doctor Selected Banner */}
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700/60 pb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${selectedDoctor.avatarBg}`}>
                    {selectedDoctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Selected Doctor</span>
                    <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">{selectedDoctor.name}</h3>
                    <p className="text-[11px] text-hospital-600 dark:text-hospital-400 font-medium">{selectedDoctor.specialty}</p>
                  </div>
                </div>

                {/* Visiting Date Selector Pills */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                    <span>Visiting Date</span>
                    <span className="text-[11px] text-hospital-400 font-medium">{selectedDate}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {VISITING_DATES.map(v => {
                      const fullDate = `${v.label} - ${v.date}`;
                      const isSel = selectedDate === fullDate;
                      return (
                        <button
                          key={v.label}
                          type="button"
                          onClick={() => setSelectedDate(fullDate)}
                          className={`p-2 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                            isSel 
                              ? 'bg-hospital-600 text-white border-hospital-500 shadow-md'
                              : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-hospital-400'
                          }`}
                        >
                          <span className="block text-[10px] opacity-80">{v.day}</span>
                          <span>{v.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Consultation Type Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Consultation Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setConsultationType('in-person')}
                      className={clsx(
                        "py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                        consultationType === 'in-person'
                          ? "border-hospital-500 bg-hospital-50 dark:bg-hospital-900/40 text-hospital-600 dark:text-hospital-300 shadow-sm"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900"
                      )}
                    >
                      <Building2 size={15} /> In-Person OPD
                    </button>

                    <button
                      onClick={() => setConsultationType('video')}
                      className={clsx(
                        "py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                        consultationType === 'video'
                          ? "border-hospital-500 bg-hospital-50 dark:bg-hospital-900/40 text-hospital-600 dark:text-hospital-300 shadow-sm"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900"
                      )}
                    >
                      <Video size={15} /> Video Consult
                    </button>
                  </div>
                </div>

                {/* Colorful Available Visiting Time Slot Boxes */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5 text-xs">
                      <Clock size={15} className="text-hospital-400"/> Select Visiting Time Slot
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      8 Slots Open
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                    {TIME_SLOTS_DATA.map((item) => {
                      const isSelected = selectedSlot === item.time;
                      const IconComp = item.icon;

                      return (
                        <button
                          key={item.time}
                          type="button"
                          onClick={() => setSelectedSlot(item.time)}
                          className={clsx(
                            "p-3 rounded-2xl border transition-all text-left flex flex-col justify-between gap-1.5 cursor-pointer relative overflow-hidden group",
                            isSelected
                              ? "bg-gradient-to-r from-hospital-600 via-hospital-500 to-indigo-600 border-2 border-cyan-300 text-white font-extrabold shadow-xl shadow-hospital-600/40 ring-2 ring-cyan-400/40 scale-[1.02]"
                              : item.color
                          )}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-mono text-xs font-black tracking-wide flex items-center gap-1">
                              <IconComp size={13} className={isSelected ? 'text-cyan-200' : 'text-white/70'} />
                              {item.time}
                            </span>
                            <span className={clsx(
                              "text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border uppercase tracking-wider shrink-0",
                              isSelected 
                                ? "bg-white text-hospital-700 border-white font-black shadow-sm animate-pulse" 
                                : item.badgeColor
                            )}>
                              {isSelected ? 'Selected ✓' : item.session}
                            </span>
                          </div>

                          <span className={clsx(
                            "text-[10px] font-semibold block",
                            isSelected ? "text-cyan-100" : "text-white/80"
                          )}>
                            {isSelected ? 'Visiting Slot Confirmed' : `OPD ${item.session} Session`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button 
                  disabled={!selectedSlot}
                  onClick={handleConfirmBooking}
                  className="w-full bg-hospital-600 hover:bg-hospital-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:border disabled:border-slate-700 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-hospital-600/20 text-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <CheckCircle2 size={18} /> 
                  {selectedSlot ? `Confirm Visiting Slot (${selectedSlot}) • ₹${selectedDoctor.fee}` : 'Select a Time Slot Above'}
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
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

              <span className="inline-block bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                OPD Token Confirmed & Registered
              </span>

              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                Appointment Booked!
              </h3>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Booking ID: <strong className="font-mono text-hospital-600 dark:text-hospital-400">{bookingSuccessModal.bookingId}</strong>
              </p>
            </div>

            {/* Token Badge */}
            <div className="bg-gradient-to-r from-hospital-600 to-indigo-600 text-white rounded-2xl p-4 text-center space-y-1 shadow-lg shadow-hospital-600/20">
              <span className="text-[10px] uppercase font-bold tracking-widest text-hospital-200">Your OPD Token Number</span>
              <div className="text-4xl font-black tracking-wider">#{bookingSuccessModal.tokenNumber}</div>
              <span className="text-[11px] text-emerald-200 font-medium block">Show this token at OPD Counter upon arrival</span>
            </div>

            {/* Appointment Details */}
            <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 text-xs space-y-2.5 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500">Doctor</span>
                <span className="font-bold text-gray-900 dark:text-white">{bookingSuccessModal.doctor.name}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500">Specialty</span>
                <span className="font-semibold text-hospital-600 dark:text-hospital-400">{bookingSuccessModal.doctor.specialty}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500">Visiting Date & Time</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{bookingSuccessModal.date} • {bookingSuccessModal.slot}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500">Consultation Type</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 capitalize">{bookingSuccessModal.type}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">OPD Location</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{bookingSuccessModal.doctor.location}</span>
              </div>
            </div>

            <button
              onClick={() => setBookingSuccessModal(null)}
              className="w-full py-3 bg-hospital-600 hover:bg-hospital-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
            >
              Done & Save Digital Pass
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
