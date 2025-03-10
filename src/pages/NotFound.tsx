
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { translate } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-peru-beige/30 hero-pattern">
      <div className="text-center max-w-md px-6">
        <h1 className="text-5xl font-title font-bold text-peru-red mb-4 animate-fade-in">404</h1>
        <p className="text-xl text-peru-brown mb-6 animate-fade-in">
          Oops! Página no encontrada
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-peru-gold text-white rounded-lg shadow-md hover:bg-peru-ochre transition-colors duration-300 animate-fade-in"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
