import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Hospital {
  id: string;
  name: string;
  tagline: string;
  city: string;
  address: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  emergencyStatus: string;
  availableBeds: number;
  totalBeds: number;
  specialties: string[];
  phone: string;
  imageBg: string;
  colorTheme: string;
}

export const HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Nivora Super Specialty Hospital',
    tagline: 'Central Multi-Specialty & Emergency Care',
    city: 'Bengaluru',
    address: '#45 MG Road, Central Campus, Bengaluru',
    distanceKm: 1.2,
    rating: 4.9,
    reviewsCount: 1420,
    emergencyStatus: '24/7 Trauma Active',
    availableBeds: 38,
    totalBeds: 500,
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Emergency', 'ICU'],
    phone: '+91-80-1234-5678',
    imageBg: 'from-blue-600 to-indigo-800',
    colorTheme: 'bg-blue-600'
  },
  {
    id: 'hosp-2',
    name: 'Nivora Health City & Cardiac Center',
    tagline: 'Advanced Heart, Vascular & Organ Transplant Unit',
    city: 'Bengaluru',
    address: 'ITPL Main Road, Whitefield, Bengaluru',
    distanceKm: 4.5,
    rating: 4.8,
    reviewsCount: 980,
    emergencyStatus: '24/7 Cardiac ER Active',
    availableBeds: 24,
    totalBeds: 350,
    specialties: ['Cardiology', 'Cardiac Surgery', 'Vascular', 'ICU'],
    phone: '+91-80-8888-1122',
    imageBg: 'from-rose-600 to-red-800',
    colorTheme: 'bg-rose-600'
  },
  {
    id: 'hosp-3',
    name: "Nivora Medicare & Children's Hospital",
    tagline: 'Pediatric Care, Neonatal ICU & Family Health',
    city: 'Bengaluru',
    address: '100ft Road, Indiranagar, Bengaluru',
    distanceKm: 2.8,
    rating: 4.9,
    reviewsCount: 1150,
    emergencyStatus: 'Pediatric ER Active',
    availableBeds: 18,
    totalBeds: 200,
    specialties: ['Pediatrics', 'Neonatology', 'Obstetrics', 'Immunization'],
    phone: '+91-80-7777-3344',
    imageBg: 'from-emerald-600 to-teal-800',
    colorTheme: 'bg-emerald-600'
  },
  {
    id: 'hosp-4',
    name: 'Nivora Neuro & Ortho Institute',
    tagline: 'Spine, Brain, Joint Replacement & Rehabilitation',
    city: 'Bengaluru',
    address: '80ft Road, Koramangala 4th Block, Bengaluru',
    distanceKm: 3.1,
    rating: 4.7,
    reviewsCount: 840,
    emergencyStatus: 'Spine & Trauma Center',
    availableBeds: 15,
    totalBeds: 250,
    specialties: ['Neurology', 'Neurosurgery', 'Orthopedics', 'Physiotherapy'],
    phone: '+91-80-6666-4455',
    imageBg: 'from-purple-600 to-indigo-900',
    colorTheme: 'bg-purple-600'
  },
  {
    id: 'hosp-5',
    name: 'Nivora Oncology & Cancer Institute',
    tagline: 'Comprehensive Cancer Diagnostics & Chemotherapy Care',
    city: 'Bengaluru',
    address: 'Electronic City Phase 1, Bengaluru',
    distanceKm: 8.0,
    rating: 4.9,
    reviewsCount: 760,
    emergencyStatus: 'Onco Emergency Ready',
    availableBeds: 29,
    totalBeds: 400,
    specialties: ['Oncology', 'Hematology', 'Radiation', 'Robotic Surgery'],
    phone: '+91-80-5555-6677',
    imageBg: 'from-amber-600 to-orange-800',
    colorTheme: 'bg-amber-600'
  },
  {
    id: 'hosp-6',
    name: 'Apollo-Nivora Multi-Specialty Care',
    tagline: 'Day Care Surgery, Gastro & Skin Care Hub',
    city: 'Bengaluru',
    address: '27th Main Road, HSR Layout, Bengaluru',
    distanceKm: 5.2,
    rating: 4.8,
    reviewsCount: 620,
    emergencyStatus: '24/7 Outpatient & ER',
    availableBeds: 12,
    totalBeds: 180,
    specialties: ['Dermatology', 'Gastroenterology', 'ENT', 'Ophthalmology'],
    phone: '+91-80-4444-8899',
    imageBg: 'from-cyan-600 to-blue-800',
    colorTheme: 'bg-cyan-600'
  }
];

interface HospitalContextType {
  selectedHospital: Hospital | null;
  setSelectedHospital: (hospital: Hospital | null) => void;
  hospitals: Hospital[];
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export function HospitalProvider({ children }: { children: ReactNode }) {
  // Default to first hospital (Nivora Super Specialty) if none selected
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(HOSPITALS[0]);

  return (
    <HospitalContext.Provider value={{ selectedHospital, setSelectedHospital, hospitals: HOSPITALS }}>
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
}
