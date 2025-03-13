
import React from 'react';
import { MenuItem as MenuItemType } from '@/types/menu';
import { useLanguage } from '@/context/LanguageContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { language, translate } = useLanguage();
  const { name, description, price, image, isVegetarian, isPopular } = item;

  return (
    <div className="menu-item group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {image && (
        <div className="menu-item-image h-48 relative">
          <img 
            src={image} 
            alt={name[language as keyof typeof name]} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isPopular && (
            <span className="absolute top-2 right-2 bg-peru-red text-white text-xs px-2 py-1 rounded-full">
              {translate('popular')}
            </span>
          )}
          {isVegetarian && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {translate('vegetarian')}
            </span>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-title font-bold text-lg text-peru-brown group-hover:text-peru-red transition-colors duration-300">
          {name[language as keyof typeof name]}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {description[language as keyof typeof description]}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-semibold text-peru-ochre">{price}</span>
          {item.ingredients && item.ingredients.length > 0 && (
            <button className="text-xs font-medium text-peru-red hover:text-peru-terracotta transition-colors">
              {translate('ingredients')} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
