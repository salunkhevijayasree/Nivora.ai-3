import { useState } from 'react';
import { 
  Search, 
  Navigation, 
  MapPin, 
  Building2, 
  Activity, 
  Compass, 
  Layers
} from 'lucide-react';
import clsx from 'clsx';
import { useHospital } from '../context/HospitalContext';

interface Room {
  id: string;
  roomNo: string;
  name: string;
  category: 'opd' | 'emergency' | 'diagnostics' | 'surgery' | 'reception';
  doctor?: string;
  description: string;
  floor: number;
  badgeColor: string;
}

const FLOORS = [
  { level: 0, name: 'Ground Floor (GF)', subtitle: 'Reception, Emergency & Diagnostics' },
  { level: 1, name: '1st Floor (1F)', subtitle: 'Dermatology, Eye & Pathology Lab' },
  { level: 2, name: '2nd Floor (2F)', subtitle: 'Pediatrics, Gynecology & ENT' },
  { level: 3, name: '3rd Floor (3F)', subtitle: 'Cardiology & Gastroenterology' },
  { level: 4, name: '4th Floor (4F)', subtitle: 'Neurology, Pulmonology & ICU' },
  { level: 5, name: '5th Floor (5F)', subtitle: 'Operation Theatres (OT) & Orthopedics' },
];

const ROOMS_DATA: Room[] = [
  // Ground Floor
  { id: 'g1', roomNo: 'GF-01', name: 'Main Reception & Helpdesk', category: 'reception', description: 'Patient Token Counter, Registration & Admission Desk', floor: 0, badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
  { id: 'g2', roomNo: 'GF-ER', name: '24/7 Emergency & Trauma Bay', category: 'emergency', description: 'Immediate Critical Care, Triage & Ambulance Entrance', floor: 0, badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
  { id: 'g3', roomNo: 'GF-08', name: 'Ultrasound & Sonography Room', category: 'diagnostics', description: '3D/4D Color Doppler, Pelvic & Abdominal Scans', floor: 0, badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  { id: 'g4', roomNo: 'GF-10', name: 'Digital X-Ray & MRI Scanner', category: 'diagnostics', description: 'High Resolution Radiography & 3T MRI Diagnostics', floor: 0, badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300' },
  { id: 'g5', roomNo: 'GF-Pharma', name: 'Central Pharmacy & Billing', category: 'reception', description: '24/7 Medicine Dispensary & Outpatient Billing', floor: 0, badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' },

  // 1st Floor
  { id: 'f1-1', roomNo: 'OPD 108', name: 'Dermatology & Skin Clinic', category: 'opd', doctor: 'Dr. Priya Sharma', description: 'Skin Consultation, Laser & Cosmetology Unit', floor: 1, badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  { id: 'f1-2', roomNo: 'OPD 115', name: 'Ophthalmology (Eye Clinic)', category: 'opd', doctor: 'Dr. Meera Iyer', description: 'Vision Testing, Retina & Cataract Diagnostics', floor: 1, badgeColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300' },
  { id: 'f1-3', roomNo: 'Lab-101', name: 'Central Path Lab & Blood Collection', category: 'diagnostics', description: 'CBC, Lipid Profile, Thyroid & Urine Analysis', floor: 1, badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },

  // 2nd Floor
  { id: 'f2-1', roomNo: 'OPD 201', name: 'Pediatrics & Child Care OPD', category: 'opd', doctor: 'Dr. Emily Chen', description: 'Child Health, Immunization & Neonatal Checkups', floor: 2, badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  { id: 'f2-2', roomNo: 'OPD 205', name: 'Gynecology & Maternity Clinic', category: 'opd', doctor: 'Dr. Ananya Roy', description: 'Antenatal Care, Ultrasound Monitoring & OB-GYN', floor: 2, badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300' },
  { id: 'f2-3', roomNo: 'OPD 212', name: 'ENT Clinic (Ear, Nose, Throat)', category: 'opd', doctor: 'Dr. Suresh Kumar', description: 'Audiometry, Endoscopy & Sinus Treatment', floor: 2, badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },

  // 3rd Floor
  { id: 'f3-1', roomNo: 'OPD 304', name: 'Cardiology Consultation Room', category: 'opd', doctor: 'Dr. Sarah Smith', description: 'ECG, Echo, TMT & Coronary Heart Checkups', floor: 3, badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' },
  { id: 'f3-2', roomNo: 'OPD 310', name: 'Gastroenterology Clinic', category: 'opd', doctor: 'Dr. Rajesh Gupta', description: 'Endoscopy, Liver & Digestive Health Unit', floor: 3, badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  { id: 'f3-3', roomNo: 'CCU-3', name: 'Cardiac Care Unit (CCU)', category: 'emergency', description: '24/7 Intensive Coronary Monitoring Ward', floor: 3, badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },

  // 4th Floor
  { id: 'f4-1', roomNo: 'OPD 412', name: 'Neurology Consultation Room', category: 'opd', doctor: 'Dr. James Wilson', description: 'EEG, Stroke Care, Brain & Nerve Evaluation', floor: 4, badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' },
  { id: 'f4-2', roomNo: 'OPD 405', name: 'Pulmonology (Chest Clinic)', category: 'opd', doctor: 'Dr. Vikram Patel', description: 'Spirometry, Asthma & Lung Function Test', floor: 4, badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300' },
  { id: 'f4-3', roomNo: 'ICU-Main', name: 'Intensive Care Unit (ICU)', category: 'emergency', description: '24/7 Ventilator Support & Critical Patient Bay', floor: 4, badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },

  // 5th Floor
  { id: 'f5-1', roomNo: 'OT Complex', name: 'Operation Theatre (OT 1 to OT 6)', category: 'surgery', description: 'Modular Robotic & Cardiac Surgery Theatres', floor: 5, badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
  { id: 'f5-2', roomNo: 'OPD 502', name: 'Orthopedics & Joint Clinic', category: 'opd', doctor: 'Dr. Michael Brown', description: 'Bone Fracture, Joint Replacement & Trauma', floor: 5, badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
];

export default function HospitalMap() {
  const { selectedHospital } = useHospital();
  const [activeFloor, setActiveFloor] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(ROOMS_DATA[0]);

  const floorRooms = ROOMS_DATA.filter(r => r.floor === activeFloor);

  const searchResults = search.trim() ? ROOMS_DATA.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.roomNo.toLowerCase().includes(search.toLowerCase()) ||
    (r.doctor && r.doctor.toLowerCase().includes(search.toLowerCase())) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const handleSelectSearchedRoom = (room: Room) => {
    setActiveFloor(room.floor);
    setSelectedRoom(room);
  };

  return (
    <div className="space-y-6 animate-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Compass className="text-hospital-600 animate-spin-slow" size={26} /> 
            Hospital Floor Map & Navigation
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            Interactive room directory for {selectedHospital ? selectedHospital.name : 'Apollo Hospitals'}. Find doctors, OPDs, Ultrasound, OT & Emergency rooms.
          </p>
        </div>

        <div className="bg-hospital-50 dark:bg-hospital-900/30 text-hospital-700 dark:text-hospital-300 px-3.5 py-1.5 rounded-full text-xs font-bold border border-hospital-200 dark:border-hospital-800 flex items-center gap-2 w-fit">
          <Building2 size={16} /> Campus: {selectedHospital ? selectedHospital.name : 'Apollo Hospitals'}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search for room (e.g. 'Ultrasound', 'Operation Theatre', 'Cardiology', 'Dr. Sarah Smith', 'OPD 304')..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-hospital-500 outline-none transition-all dark:text-white shadow-sm"
        />

        {/* Realtime Search Results Overlay Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-30 max-h-60 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {searchResults.map(room => (
              <div 
                key={room.id}
                onClick={() => { handleSelectSearchedRoom(room); setSearch(''); }}
                className="p-3 rounded-xl hover:bg-hospital-50 dark:hover:bg-gray-700/60 cursor-pointer flex items-center justify-between transition-colors text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-hospital-600 bg-hospital-100 dark:bg-hospital-900/40 px-2 py-0.5 rounded-md">
                    {room.roomNo}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{room.name}</p>
                    <p className="text-gray-400 text-[11px]">{room.doctor ? `Doctor: ${room.doctor}` : room.description}</p>
                  </div>
                </div>
                <span className="font-semibold text-hospital-600 dark:text-hospital-400">
                  Floor {room.floor}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Floor Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {FLOORS.map(floor => (
          <button
            key={floor.level}
            onClick={() => { setActiveFloor(floor.level); setSelectedRoom(null); }}
            className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeFloor === floor.level 
                ? 'bg-hospital-600 text-white shadow-md shadow-hospital-600/20' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            <Layers size={15} /> {floor.name}
          </button>
        ))}
      </div>

      {/* Active Floor Banner */}
      <div className="bg-gradient-to-r from-hospital-700 to-indigo-800 p-4 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-md">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-hospital-200">Active Floor Blueprint</span>
          <h2 className="text-lg font-bold">{FLOORS[activeFloor].name}</h2>
          <p className="text-xs text-hospital-100">{FLOORS[activeFloor].subtitle}</p>
        </div>

        <div className="flex gap-2 text-[11px] font-semibold text-white/90">
          <span className="bg-white/15 px-2.5 py-1 rounded-full border border-white/20">📍 You Are Here: Lift Lobby {activeFloor}F</span>
        </div>
      </div>

      {/* Interactive Blueprint Map Grid + Room Detail Panel */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Visual Map Blueprint Rooms Grid (7 cols) */}
        <div className="md:col-span-7 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <MapPin size={18} className="text-hospital-600" /> Floor Rooms Layout
            </h3>
            <span className="text-xs text-gray-400">{floorRooms.length} Locations Available</span>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {floorRooms.map(room => {
              const isSelected = selectedRoom?.id === room.id;
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={clsx(
                    "p-4 rounded-2xl border transition-all cursor-pointer space-y-2 group relative overflow-hidden",
                    isSelected 
                      ? "border-hospital-500 bg-hospital-50/70 dark:bg-hospital-900/30 ring-2 ring-hospital-500/50 shadow-md" 
                      : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/40 hover:border-hospital-300 hover:bg-white dark:hover:bg-gray-800"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-gray-900 text-white shadow-sm">
                      {room.roomNo}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${room.badgeColor}`}>
                      {room.category.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-hospital-600 transition-colors">
                      {room.name}
                    </h4>
                    {room.doctor && (
                      <p className="text-xs font-semibold text-hospital-600 dark:text-hospital-400 pt-0.5">
                        👨‍⚕️ {room.doctor}
                      </p>
                    )}
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                      {room.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Room Detail & Navigation Guide (5 cols) */}
        <div className="md:col-span-5">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm sticky top-20 space-y-5">
            {selectedRoom ? (
              <>
                <div className="border-b border-gray-100 dark:border-gray-700 pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-black px-3 py-1 rounded-xl bg-hospital-600 text-white shadow-md shadow-hospital-600/20">
                      Room {selectedRoom.roomNo}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedRoom.badgeColor}`}>
                      Floor {selectedRoom.floor}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-1">
                    {selectedRoom.name}
                  </h3>

                  {selectedRoom.doctor && (
                    <p className="text-xs font-bold text-hospital-600 dark:text-hospital-400 bg-hospital-50 dark:bg-hospital-900/30 px-3 py-1.5 rounded-xl border border-hospital-200 dark:border-hospital-800 w-fit">
                      Doctor in Charge: {selectedRoom.doctor}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">Room Facility Overview</span>
                  <p className="leading-relaxed bg-gray-50 dark:bg-gray-900/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                    {selectedRoom.description}
                  </p>
                </div>

                {/* Turn-by-Turn Navigation Guide */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Navigation size={15} className="text-hospital-600" /> Step-by-Step Wayfinding Guide
                  </span>
                  
                  <div className="bg-gradient-to-r from-hospital-50 to-indigo-50 dark:from-gray-900/60 dark:to-gray-800/60 p-3.5 rounded-2xl border border-hospital-100 dark:border-hospital-900/50 space-y-2">
                    <p className="text-gray-700 dark:text-gray-300">
                      1️⃣ Take <strong>Elevator B</strong> to <strong>Floor {selectedRoom.floor}</strong>.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      2️⃣ Turn right from the lift lobby and follow the <strong>{selectedRoom.category === 'opd' ? 'Blue OPD Corridor' : 'Red Emergency Corridor'}</strong>.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      3️⃣ Room <strong>{selectedRoom.roomNo}</strong> is on your left next to Waiting Area {selectedRoom.floor}A.
                    </p>
                  </div>
                </div>

                {/* Direct Action Button */}
                <a
                  href="/patient/appointments"
                  className="w-full bg-hospital-600 hover:bg-hospital-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-hospital-600/20 text-xs flex items-center justify-center gap-2"
                >
                  <Activity size={16} /> Book Appointment in Room {selectedRoom.roomNo}
                </a>
              </>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 text-center p-4">
                <Compass size={48} className="mb-4 opacity-40 text-hospital-500 animate-spin-slow" />
                <p className="font-medium text-sm text-gray-600 dark:text-gray-300">Select a room on the floor layout</p>
                <p className="text-xs text-gray-400 mt-1">Click any room card or search to view turn-by-turn navigation instructions.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
