import { type Chat } from "@google/genai";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: 'male' | 'female';
  dob: string; // YYYY-MM-DD
  role: 'admin' | 'staff' | 'customer';
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  comment: string;
  rating: number;
}

export interface ChatMessage {
    sender: 'user' | 'bot' | 'admin';
    text: string;
    timestamp: number;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<boolean>;
    register: (userData: Omit<User, 'id' | 'role'>) => Promise<boolean>;
    logout: () => void;
}