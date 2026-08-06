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
    name: 'Apollo Hospitals',
    tagline: 'Multi-Specialty, Super Speciality & Emergency Care',
    city: 'Hyderabad / Bengaluru',
    address: 'Road No. 72, Jubilee Hills / Central Campus',
    distanceKm: 1.2,
    rating: 4.9,
    reviewsCount: 1840,
    emergencyStatus: '24/7 Trauma & ER Active',
    availableBeds: 45,
    totalBeds: 550,
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Emergency', 'ICU'],
    phone: '+91-40-2360-7777',
    imageBg: 'from-blue-700 to-indigo-900',
    colorTheme: 'bg-blue-600'
  },
  {
    id: 'hosp-2',
    name: 'Yashoda Hospitals',
    tagline: 'Advanced Heart, Neuro & Organ Transplant Institute',
    city: 'Hyderabad',
    address: 'Raj Bhavan Road, Somajiguda',
    distanceKm: 2.5,
    rating: 4.8,
    reviewsCount: 1420,
    emergencyStatus: '24/7 Cardiac ER Active',
    availableBeds: 32,
    totalBeds: 450,
    specialties: ['Neurology', 'Cardiology', 'Orthopedics', 'Gastroenterology', 'ICU'],
    phone: '+91-40-4567-4567',
    imageBg: 'from-rose-600 to-red-900',
    colorTheme: 'bg-rose-600'
  },
  {
    id: 'hosp-3',
    name: 'SevenHills Hospital',
    tagline: 'Multi-Specialty Healthcare & Pediatric Emergency Center',
    city: 'Mumbai / Visakhapatnam',
    address: 'SevenHills Health City, Marol / Rockdale Layout',
    distanceKm: 3.8,
    rating: 4.7,
    reviewsCount: 960,
    emergencyStatus: '24/7 Emergency & ICU Active',
    availableBeds: 28,
    totalBeds: 300,
    specialties: ['Pediatrics', 'Obstetrics', 'General Surgery', 'ICU', 'Neonatology'],
    phone: '+91-22-6767-6767',
    imageBg: 'from-emerald-600 to-teal-900',
    colorTheme: 'bg-emerald-600'
  },
  {
    id: 'hosp-4',
    name: 'Care Hospitals',
    tagline: 'Institute of Medical Sciences & Critical Care',
    city: 'Hyderabad',
    address: 'Road No. 1, Banjara Hills',
    distanceKm: 4.6,
    rating: 4.8,
    reviewsCount: 1250,
    emergencyStatus: '24/7 Critical ER Active',
    availableBeds: 20,
    totalBeds: 350,
    specialties: ['Cardiology', 'Pulmonology', 'Nephrology', 'Dermatology', 'Urology'],
    phone: '+91-40-3041-8888',
    imageBg: 'from-purple-600 to-indigo-900',
    colorTheme: 'bg-purple-600'
  },
  {
    id: 'hosp-5',
    name: 'Medicure Hospitals',
    tagline: 'Super Specialty, Day Care Surgery & Trauma Center',
    city: 'Hyderabad / Bengaluru',
    address: 'Main Highway Road, Medicure Tower',
    distanceKm: 5.9,
    rating: 4.9,
    reviewsCount: 890,
    emergencyStatus: '24/7 Ambulance & ER Ready',
    availableBeds: 18,
    totalBeds: 220,
    specialties: ['Emergency', 'Orthopedics', 'ENT', 'Ophthalmology', 'Day Care Surgery'],
    phone: '+91-40-2222-9999',
    imageBg: 'from-amber-600 to-orange-900',
    colorTheme: 'bg-amber-600'
  }
];

interface HospitalContextType {
  selectedHospital: Hospital | null;
  setSelectedHospital: (hospital: Hospital | null) => void;
  hospitals: Hospital[];
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export function HospitalProvider({ children }: { children: ReactNode }) {
  // Default to first partner hospital (Apollo Hospitals)
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
