import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
  additionalData?: Record<string, any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<string, User> = {
  'patient@demo.com': {
    id: 'p1',
    email: 'patient@demo.com',
    name: 'John Patient',
    role: 'patient',
    phone: '+1234567890',
    healthId: 'HID-2024-001234',
    createdAt: new Date(),
  },
  'doctor@demo.com': {
    id: 'd1',
    email: 'doctor@demo.com',
    name: 'Dr. Sarah Smith',
    role: 'doctor',
    phone: '+1234567891',
    createdAt: new Date(),
  },
  'pharmacy@demo.com': {
    id: 'ph1',
    email: 'pharmacy@demo.com',
    name: 'MediCare Pharmacy',
    role: 'pharmacy',
    phone: '+1234567892',
    createdAt: new Date(),
  },
  'admin@demo.com': {
    id: 'a1',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const login = useCallback(async (email: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email] || {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role,
      healthId: role === 'patient' ? `HID-${Date.now()}` : undefined,
      createdAt: new Date(),
    };

    if (mockUser.role !== role) {
      return false;
    }

    setUser(mockUser);
    return true;
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      phone: data.phone,
      healthId: data.role === 'patient' ? `HID-${Date.now()}` : undefined,
      createdAt: new Date(),
    };

    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSelectedRole(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        selectedRole,
        setSelectedRole,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
