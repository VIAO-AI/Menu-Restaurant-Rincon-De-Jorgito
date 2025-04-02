import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

const translations = {
  en: {
    "appName": "Menu - El Rincón De Jorgito",
    "tagline": "Authentic Peruvian Cuisine",
    "allCategories": "All Categories",
    "peruvianDrinks": "Peruvian Drinks",
    "beverages": "Beverages",
    "sides": "Sides",
    "appetizers": "Appetizers",
    "soup": "Hot Soups",
    "coldDishes": "Cold Dishes",
    "mainDish": "Main Dish",
    "veganMainDish": "Vegan Main Dish",
    "alaCartaHot": "A la Carta (Hot Dishes)",
    "alaCartaCold": "A la Carta (Cold Dishes)",
    "ingredients": "Ingredients",
    "price": "Price",
    "about": "About",
    "contact": "Contact",
    "languages": "Languages",
    "english": "English",
    "spanish": "Spanish",
    "popular": "Popular",
    "vegetarian": "Vegetarian",
    "vegan": "Vegan",
    "spicy": "Spicy",
    "footer": "© 2025 El Rincón de Jorgito. All Rights Reserved. ❤️ Designed and developed by Angel Nerozzi ❤️",
  },
  es: {
    "appName": "Menu - El Rincón De Jorgito",
    "tagline": "Auténtica Cocina Peruana",
    "allCategories": "Todas las Categorías",
    "peruvianDrinks": "Bebidas Peruanas",
    "beverages": "Bebidas",
    "sides": "Acompañamientos",
    "appetizers": "Entradas",
    "soup": "Sopas Calientes",
    "coldDishes": "Platos Fríos",
    "mainDish": "Platos Principales",
    "veganMainDish": "Platos Principales Veganos",
    "alaCartaHot": "Platos a la Carta (Platos de Fondo)",
    "alaCartaCold": "Platos a la Carta (Platos Fríos)",
    "ingredients": "Ingredientes",
    "price": "Precio",
    "about": "Acerca de",
    "contact": "Contacto",
    "languages": "Idiomas",
    "english": "Inglés",
    "spanish": "Español",
    "popular": "Popular",
    "vegetarian": "Vegetariano",
    "vegan": "Vegano",
    "spicy": "Picante",
    "footer": "© 2025 El Rincón de Jorgito. Todos los derechos reservados. ❤️ Designed and developed by Angel Nerozzi ❤️",
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
