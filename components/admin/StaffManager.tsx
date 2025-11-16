import React, { useState, useEffect } from 'react';
import { type User } from '../../types';
import { getStaffUsers, addStaff } from '../../services/userService';

const StaffManager: React.FC = () => {
    const [staff, setStaff] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = () => {
        setStaff(getStaffUsers());
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setFullName('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // In a real app, you would add more data, but this is sufficient for the mock.
             addStaff({ 
                fullName, 
                email, 
                // These fields are required by the User type but not collected in this simple form
                phone: 'N/A', 
                address: 'N/A', 
                gender: 'male', 
                dob: '2000-01-01' 
            });
            alert(`تمت إضافة الموظف ${fullName} بنجاح.`);
            loadStaff();
            closeModal();
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">إدارة موظفي خدمة العملاء</h2>
                <button onClick={openModal} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md">
                    إضافة موظف جديد
                </button>
            </div>
            <div className="bg-slate-700 rounded-lg overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-slate-600">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">الاسم الكامل</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">البريد الإلكتروني</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">الدور</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                       {staff.map(user => (
                            <tr key={user.id}>
                                <td className="p-3 text-white">{user.fullName}</td>
                                <td className="p-3 text-gray-300">{user.email}</td>
                                <td className="p-3"><span className="bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">موظف</span></td>
                            </tr>
                       ))}
                    </tbody>
                </table>
            </div>

             {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">إضافة موظف جديد</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
                                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">كلمة المرور</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">إلغاء</button>
                                <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md">إضافة</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffManager;
