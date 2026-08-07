import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Search, 
  PhoneCall, 
  Bed, 
  ChevronRight, 
  CheckCircle2,
  Navigation,
  Bot
} from 'lucide-react';
import { useHospital, type Hospital } from '../context/HospitalContext';

const FILTER_TAGS = ['All', 'Near Me (<3 km)', 'Cardiology', 'Neurology', 'Pediatrics', '24/7 ER Active'];

export default function HospitalSelector() {
  const navigate = useNavigate();
  const { hospitals, selectedHospital, setSelectedHospital } = useHospital();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const filteredHospitals = hospitals.filter(hosp => {
    const matchesSearch = hosp.name.toLowerCase().includes(search.toLowerCase()) ||
                          hosp.address.toLowerCase().includes(search.toLowerCase()) ||
                          hosp.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));

    if (activeTag === 'Near Me (<3 km)') return matchesSearch && hosp.distanceKm <= 3.0;
    if (activeTag === '24/7 ER Active') return matchesSearch && hosp.emergencyStatus.includes('24/7');
    if (activeTag !== 'All') return matchesSearch && hosp.specialties.includes(activeTag);

    return matchesSearch;
  });

  const handleSelectHospital = (hosp: Hospital) => {
    setSelectedHospital(hosp);
    navigate('/patient');
  };

  return (
    <div className="space-y-6 animate-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-hospital-700 via-hospital-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden space-y-3">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
            <Bot size={14} className="text-hospital-300" /> NIVORA AI
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            AI Powered Hospital Workflow Automation
          </h1>

          <p className="text-hospital-100 max-w-xl text-sm font-medium leading-relaxed pt-1">
            "Personalized Guidance for Every Patient"
          </p>
        </div>

        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search partner hospital (Apollo, Yashoda, SevenHills, Care, Medicure)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-700 bg-slate-800 text-white text-sm focus:ring-2 focus:ring-hospital-500 outline-none transition-all placeholder-slate-400 shadow-sm font-medium"
        />
      </div>

      {/* Filter Tags */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {FILTER_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTag === tag 
                ? 'bg-hospital-600 text-white shadow-md' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredHospitals.map(hosp => {
          const isSelected = selectedHospital?.id === hosp.id;
          return (
            <div 
              key={hosp.id}
              onClick={() => handleSelectHospital(hosp)}
              className={`bg-white dark:bg-gray-800 border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between ${
                isSelected 
                  ? 'border-hospital-500 ring-2 ring-hospital-500/50' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-hospital-300'
              }`}
            >
              <div>
                {/* Card Header Banner */}
                <div className={`bg-gradient-to-r ${hosp.imageBg} p-5 text-white relative`}>
                  <div className="flex justify-between items-start mb-2">
                    {/* Distance Badge */}
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/30">
                      <Navigation size={12} className="text-amber-300 fill-amber-300" /> {hosp.distanceKm} km away from your location
                    </span>
                    <div className="flex items-center gap-1 bg-amber-400 text-gray-900 px-2.5 py-0.5 rounded-full text-xs font-black shadow-sm">
                      <Star size={13} className="fill-current" />
                      {hosp.rating} ({hosp.reviewsCount})
                    </div>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform mt-2">{hosp.name}</h3>
                  <p className="text-xs text-white/80 mt-1">{hosp.tagline}</p>
                </div>

                {/* Card Body Details */}
                <div className="p-5 space-y-4 text-xs">
                  <div className="space-y-1.5 text-gray-600 dark:text-gray-300">
                    <p className="flex items-start gap-2">
                      <MapPin size={16} className="text-hospital-600 dark:text-hospital-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{hosp.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <PhoneCall size={16} className="text-emerald-500 shrink-0" />
                      <span className="font-mono text-gray-800 dark:text-gray-200">{hosp.emergencyStatus} ({hosp.phone})</span>
                    </p>
                  </div>

                  {/* Bed & ICU Status */}
                  <div className="bg-gray-50 dark:bg-gray-900/60 p-3 rounded-2xl border border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                      <Bed size={16} className="text-hospital-600" /> Live ICU & Bed Status
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full text-xs border border-emerald-200 dark:border-emerald-800">
                      {hosp.availableBeds} / {hosp.totalBeds} Beds Open
                    </span>
                  </div>

                  {/* Specialties Pills */}
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Departments & Specialties</span>
                    <div className="flex flex-wrap gap-1.5">
                      {hosp.specialties.map(spec => (
                        <span key={spec} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[11px] font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action Button */}
              <div className="p-5 pt-0">
                <button className={`w-full py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  isSelected 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20' 
                    : 'bg-hospital-600 hover:bg-hospital-700 text-white shadow-lg shadow-hospital-600/20'
                }`}>
                  {isSelected ? (
                    <>
                      <CheckCircle2 size={16} /> Currently Selected — Enter Portal
                    </>
                  ) : (
                    <>
                      Select & Enter Hospital Portal <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
