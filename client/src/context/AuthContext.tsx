import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  relation: string;
  age: number;
  patientCode: string;
  abhaId: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
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

  useEffect(() => {
    localStorage.setItem('nivora_authenticated', isAuthenticated ? 'true' : 'false');
    if (user) {
      localStorage.setItem('nivora_user', JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  const login = (userData?: Partial<UserProfile>) => {
    const updatedUser = { ...DEFAULT_USER, ...userData };
    setUser(updatedUser);
    setIsAuthenticated(true);
    localStorage.setItem('nivora_authenticated', 'true');
    localStorage.setItem('nivora_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nivora_authenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
