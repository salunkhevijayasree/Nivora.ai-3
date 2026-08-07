import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  age: number;
  patientCode: string;
  abhaId: string;
  isPrimary?: boolean;
}

export interface UserProfile {
  name: string;
  relation: string;
  age: number;
  patientCode: string;
  abhaId: string;
  email: string;
}

export const INITIAL_FAMILY: FamilyMember[] = [
  { id: 1, name: 'Puja Sharma', relation: 'Self (Primary)', age: 34, patientCode: 'MED-29834', abhaId: '91-9876-5432-1098', isPrimary: true },
  { id: 2, name: 'William Sharma', relation: 'Husband', age: 37, patientCode: 'MED-30112', abhaId: '91-8765-4321-0987' },
  { id: 3, name: 'Ram Prakash Sharma', relation: 'Father', age: 68, patientCode: 'MED-10492', abhaId: '91-7654-3210-9876' },
  { id: 4, name: 'Sunita Sharma', relation: 'Mother', age: 64, patientCode: 'MED-10493', abhaId: '91-6543-2109-8765' },
  { id: 5, name: 'Aarav Sharma', relation: 'Son', age: 12, patientCode: 'MED-44910', abhaId: '91-5432-1098-7654' },
  { id: 6, name: 'Ananya Sharma', relation: 'Daughter', age: 8, patientCode: 'MED-44911', abhaId: '91-4321-0987-6543' },
];

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  activeProfile: FamilyMember;
  familyMembers: FamilyMember[];
  setActiveProfile: (member: FamilyMember) => void;
  addFamilyMember: (memberData: { name: string; relation: string; age: number }) => void;
  login: (userData?: Partial<UserProfile>) => void;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: 'Puja Sharma',
  relation: 'Self (Primary)',
  age: 34,
  patientCode: 'MED-29834',
  abhaId: '91-9876-5432-1098',
  email: 'puja.sharma@nivora.ai'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nivora_authenticated') === 'true';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('nivora_user');
    return savedUser ? JSON.parse(savedUser) : DEFAULT_USER;
  });

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    const savedFamily = localStorage.getItem('nivora_family');
    return savedFamily ? JSON.parse(savedFamily) : INITIAL_FAMILY;
  });

  const [activeProfile, setActiveProfileState] = useState<FamilyMember>(() => {
    const savedActive = localStorage.getItem('nivora_active_profile');
    return savedActive ? JSON.parse(savedActive) : INITIAL_FAMILY[0];
  });

  useEffect(() => {
    localStorage.setItem('nivora_authenticated', isAuthenticated ? 'true' : 'false');
    if (user) {
      localStorage.setItem('nivora_user', JSON.stringify(user));
    }
    localStorage.setItem('nivora_family', JSON.stringify(familyMembers));
    localStorage.setItem('nivora_active_profile', JSON.stringify(activeProfile));
  }, [isAuthenticated, user, familyMembers, activeProfile]);

  const setActiveProfile = (member: FamilyMember) => {
    setActiveProfileState(member);
    localStorage.setItem('nivora_active_profile', JSON.stringify(member));
  };

  const addFamilyMember = (memberData: { name: string; relation: string; age: number }) => {
    const newMember: FamilyMember = {
      id: Date.now(),
      name: memberData.name,
      relation: memberData.relation,
      age: memberData.age,
      patientCode: `MED-${Math.floor(10000 + Math.random() * 90000)}`,
      abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    const updatedList = [...familyMembers, newMember];
    setFamilyMembers(updatedList);
    setActiveProfileState(newMember);
  };

  const login = (userData?: Partial<UserProfile>) => {
    const updatedUser = { ...DEFAULT_USER, ...userData };
    setUser(updatedUser);
    setIsAuthenticated(true);
    setActiveProfileState(INITIAL_FAMILY[0]);
    localStorage.setItem('nivora_authenticated', 'true');
    localStorage.setItem('nivora_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nivora_authenticated');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      activeProfile, 
      familyMembers, 
      setActiveProfile, 
      addFamilyMember, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
