import { type User } from '../types';

// Mock database
export const MOCK_USERS: User[] = [
    { 
        id: 'admin01', 
        email: 'zawia.syr@gmail.com', 
        fullName: 'المدير العام', 
        phone: '123456789',
        address: 'Syria',
        gender: 'male',
        dob: '1990-01-01',
        role: 'admin', 
    },
    {
        id: 'user01',
        email: 'ahmad@example.com',
        fullName: 'أحمد المصري',
        phone: '0987654321',
        address: 'Cairo, Egypt',
        gender: 'male',
        dob: '1995-05-15',
        role: 'customer',
    },
    {
        id: 'user02',
        email: 'fatima@example.com',
        fullName: 'فاطمة الزهراء',
        phone: '0912345678',
        address: 'Riyadh, KSA',
        gender: 'female',
        dob: '2001-11-20',
        role: 'customer',
    }
];

export const getCustomerUsers = (): User[] => {
    return MOCK_USERS.filter(u => u.role === 'customer');
}

export const getStaffUsers = (): User[] => {
    return MOCK_USERS.filter(u => u.role === 'staff');
}

export const findUserByEmail = (email: string): User | undefined => {
    return MOCK_USERS.find(u => u.email === email);
}

export const addUser = (userData: Omit<User, 'id'>): User => {
    const newUser: User = { ...userData, id: `user${Date.now()}` };
    MOCK_USERS.push(newUser);
    return newUser;
}

export const addStaff = (userData: Omit<User, 'id' | 'role'>): User => {
    if (findUserByEmail(userData.email)) {
        throw new Error('This email is already registered.');
    }
    const newStaffUser: User = { ...userData, role: 'staff', id: `staff${Date.now()}`};
    MOCK_USERS.push(newStaffUser);
    return newStaffUser;
}