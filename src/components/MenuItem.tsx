
import React from 'react';
import { MenuItem as MenuItemType } from '@/data/menuData';
import { useLanguage } from '@/context/LanguageContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { language, translate } = useLanguage();
  const { name, description, price, image } = item;

  return (
    <div className="menu-item group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="menu-item-image h-48">
        <img 
          src={`${image}?w=400&h=300&fit=crop&auto=format`} 
          alt={name[language as keyof typeof name]} 
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-title font-bold text-lg text-peru-brown group-hover:text-peru-red transition-colors duration-300">
          {name[language as keyof typeof name]}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {description[language as keyof typeof description]}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-semibold text-peru-ochre">{price}</span>
          <button className="text-xs font-medium text-peru-red hover:text-peru-terracotta transition-colors">
            {translate('ingredients')} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
