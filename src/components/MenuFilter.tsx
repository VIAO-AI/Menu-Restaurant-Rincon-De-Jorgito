
import React from 'react';
import { categories } from '@/data/menuData';
import { useLanguage } from '@/context/LanguageContext';

interface MenuFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const MenuFilter: React.FC<MenuFilterProps> = ({ activeCategory, setActiveCategory }) => {
  const { language } = useLanguage();

  return (
    <div className="py-6 overflow-x-auto">
      <div className="flex space-x-3 min-w-max px-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`menu-category-pill ${activeCategory === category.id ? 'active' : ''}`}
          >
            {category.name[language as keyof typeof category.name]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuFilter;
