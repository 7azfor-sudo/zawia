
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { login, register } = useAuth();

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Register State
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [dob, setDob] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(loginEmail, loginPassword);
        if (success) {
            navigate('/dashboard');
        } else {
            alert('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.');
        }
    };
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await register({ fullName, email, phone, address, gender, dob });
         if (success) {
            navigate('/dashboard');
        }
    };


    return (
        <div className="max-w-md mx-auto py-12">
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6 border-b border-slate-700">
                    <button onClick={() => setIsLogin(true)} className={`px-6 py-2 text-lg font-semibold transition-colors ${isLogin ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>تسجيل الدخول</button>
                    <button onClick={() => setIsLogin(false)} className={`px-6 py-2 text-lg font-semibold transition-colors ${!isLogin ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>حساب جديد</button>
                </div>

                {isLogin ? (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <h2 className="text-2xl font-bold text-center text-white">مرحباً بعودتك!</h2>
                         <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                            <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">كلمة المرور</label>
                            <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500"/>
                        </div>
                        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md transition-transform duration-300 hover:scale-105">دخول</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <h2 className="text-2xl font-bold text-center text-white">إنشاء حساب جديد</h2>
                         <input type="text" placeholder="الاسم الكامل" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500"/>
                         <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500"/>
                         <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500"/>
                         <input type="tel" placeholder="رقم الهاتف" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500"/>
                         <input type="text" placeholder="العنوان" value={address} onChange={e => setAddress(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500"/>
                         <div className="flex gap-4">
                            <select value={gender} onChange={e => setGender(e.target.value as 'male'|'female')} className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500">
                                <option value="male">ذكر</option>
                                <option value="female">أنثى</option>
                            </select>
                            <input type="date" value={dob} onChange={e => setDob(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500"/>
                         </div>
                        <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-transform duration-300 hover:scale-105">إنشاء الحساب</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
