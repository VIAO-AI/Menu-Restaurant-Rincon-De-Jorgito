
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

const translations = {
  en: {
    "appName": "Sabrosura Peruana",
    "tagline": "Authentic Peruvian Cuisine",
    "allCategories": "All Categories",
    "peruvianDrinks": "Peruvian Drinks",
    "beverages": "Beverages",
    "sides": "Sides",
    "appetizers": "Appetizers",
    "soup": "Soup",
    "coldDishes": "Cold Dishes",
    "mainDish": "Main Dish",
    "ingredients": "Ingredients",
    "price": "Price",
    "about": "About",
    "contact": "Contact",
    "languages": "Languages",
    "english": "English",
    "spanish": "Spanish",
    "footer": "© 2023 Sabrosura Peruana. All rights reserved.",
  },
  es: {
    "appName": "Sabrosura Peruana",
    "tagline": "Auténtica Cocina Peruana",
    "allCategories": "Todas las Categorías",
    "peruvianDrinks": "Bebidas Peruanas",
    "beverages": "Bebidas",
    "sides": "Acompañamientos",
    "appetizers": "Entradas",
    "soup": "Sopas",
    "coldDishes": "Platos Fríos",
    "mainDish": "Platos Principales",
    "ingredients": "Ingredientes",
    "price": "Precio",
    "about": "Acerca de",
    "contact": "Contacto",
    "languages": "Idiomas",
    "english": "Inglés",
    "spanish": "Español",
    "footer": "© 2023 Sabrosura Peruana. Todos los derechos reservados.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translate = (key: string): string => {
    const currentTranslations = translations[language];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  const value = {
    language,
    setLanguage,
    translate
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
