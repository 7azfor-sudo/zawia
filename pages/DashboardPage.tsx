import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ChatWindow from '../components/ChatWindow';
import { type User } from '../types';
import ChatManager from '../components/admin/ChatManager';
import PortfolioManager from '../components/admin/PortfolioManager';
import StaffManager from '../components/admin/StaffManager';

type AdminTab = 'chats' | 'portfolio' | 'staff';

const AdminAndStaffDashboard: React.FC<{ user: User }> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('chats');
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'chats':
                return <ChatManager />;
            case 'portfolio':
                return <PortfolioManager />;
            case 'staff':
                return user.role === 'admin' ? <StaffManager /> : null;
            default:
                return null;
        }
    };
    
    const TabButton: React.FC<{tabName: AdminTab, label: string}> = ({ tabName, label }) => (
         <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tabName
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:bg-slate-700'
            }`}
        >
            {label}
        </button>
    )

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">لوحة تحكم المدير</h1>
                 <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-lg">
                    <TabButton tabName="chats" label="إدارة المحادثات" />
                    <TabButton tabName="portfolio" label="إدارة الأعمال" />
                    {user.role === 'admin' && (
                       <TabButton tabName="staff" label="إدارة الموظفين" />
                    )}
                </div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-lg">
                {renderTabContent()}
            </div>
        </div>
    );
};

const CustomerDashboard: React.FC<{ user: User }> = ({ user }) => {
    return (
         <div>
            <h1 className="text-4xl font-bold mb-2">لوحة التحكم الخاصة بك</h1>
            <p className="text-lg text-gray-400 mb-8">مرحباً بك مجدداً، {user.fullName}. كيف يمكننا مساعدتك اليوم؟</p>
            <ChatWindow user={user} />
        </div>
    );
};


const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }
    
    switch(user.role) {
        case 'admin':
        case 'staff':
            return <AdminAndStaffDashboard user={user} />;
        case 'customer':
            return <CustomerDashboard user={user} />;
        default:
             return <Navigate to="/login" />;
    }
};

export default DashboardPage;