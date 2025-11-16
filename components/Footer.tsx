
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm text-gray-400">
          جميع الحقوق محفوظة لدى شركة زاوية © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
