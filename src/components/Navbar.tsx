
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { language, setLanguage, translate } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-peru-red flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-title text-2xl font-bold text-peru-brown">{translate('appName')}</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="text-peru-brown hover:text-peru-red transition-colors duration-300">
            {translate('about')}
          </a>
          <a href="#" className="text-peru-brown hover:text-peru-red transition-colors duration-300">
            {translate('contact')}
          </a>
          
          <div className="flex items-center space-x-4 ml-4">
            <button
              onClick={() => setLanguage('en')}
              className={`language-toggle text-sm font-medium ${language === 'en' ? 'text-peru-red active' : 'text-peru-brown'}`}
            >
              {translate('english')}
            </button>
            <span className="text-peru-brown">|</span>
            <button
              onClick={() => setLanguage('es')}
              className={`language-toggle text-sm font-medium ${language === 'es' ? 'text-peru-red active' : 'text-peru-brown'}`}
            >
              {translate('spanish')}
            </button>
          </div>
          
          <Link to="/admin" className="ml-4 text-sm text-peru-brown hover:text-peru-red transition-colors duration-300">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
