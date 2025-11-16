import React, { createContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { findUserByEmail, addUser } from '../services/userService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, pass: string): Promise<boolean> => {
    const foundUser = findUserByEmail(email);
    if (foundUser) {
        // For admin, check password specifically
        if (foundUser.role === 'admin' && pass !== 'zawia2007') {
            return false;
        }
        // In a real app, you'd check a hashed password for all users
        setUser(foundUser);
        return true;
    }
    return false;
  };
  
  const register = async (userData: Omit<User, 'id' | 'role'>): Promise<boolean> => {
    if (findUserByEmail(userData.email)) {
        alert("هذا البريد الإلكتروني مسجل بالفعل.");
        return false;
    }
    const newUser = addUser({ ...userData, role: 'customer' });
    setUser(newUser);
    alert("شكراً لتسجيلك في زاوية! تم إنشاء حسابك بنجاح.");
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};