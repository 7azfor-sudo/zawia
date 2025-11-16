
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-slate-900 bg-opacity-80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              <span className="text-orange-500">زاوية</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-reverse space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">الرئيسية</Link>
            <Link to="/services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">خدماتنا</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">تواصل معنا</Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-reverse space-x-4">
                 <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white">مرحباً, {user.fullName.split(' ')[0]}</Link>
                <button onClick={handleLogout} className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold py-2 px-4 rounded-md transition-transform duration-300 hover:scale-105">
                  خروج
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold py-2 px-4 rounded-md transition-transform duration-300 hover:scale-105">
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
