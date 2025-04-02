
import React from 'react';
import { MenuItem as MenuItemType } from '@/types/menu';
import { useLanguage } from '@/context/LanguageContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { language, translate } = useLanguage();
  const { name, description, price, isVegetarian, isVegan, isSpicy, isPopular, category } = item;
  
  // Función para determinar el icono según la categoría de bebida
  const getDrinkIcon = () => {
    if (category === 'peruvian-drinks') {
      // Bebidas peruanas tradicionales
      if (item.id === 'chicha-morada') return '🧃';
      if (item.id === 'pisco-sour') return '🍸';
      if (item.id === 'inca-kola') return '🥤';
      if (item.id === 'maracuya-sour') return '🍹';
      return '🍹'; // Icono por defecto para bebidas peruanas
    } else if (category === 'beverages') {
      // Bebidas generales
      if (item.id === 'water') return '💧';
      if (item.id === 'coffee') return '☕';
      if (item.id === 'coca-tea') return '🍵';
      if (item.id === 'fruit-juice') return '🧃';
      if (item.id === 'beer') return '🍺';
      return '🥤'; // Icono por defecto para bebidas generales
    }
    return '🍽️'; // Icono por defecto para otros elementos
  };
  
  // Determinar si es una categoría de bebida
  const isDrinkCategory = category === 'peruvian-drinks' || category === 'beverages';

  const handleItemClick = () => {
    window.location.href = 'https://www.restaurantrincondejorgito.com';
  };

  return (
    <div 
      className="menu-item group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-peru-ochre cursor-pointer" 
      onClick={handleItemClick}
    >
      <div className="p-5">
        <h3 className="font-title font-bold text-lg text-peru-brown group-hover:text-peru-red transition-colors duration-300 flex items-center">
          <span className="mr-2">{isDrinkCategory ? getDrinkIcon() : '🍽️'}</span>
          {name[language as keyof typeof name]}
          {isPopular && (
            <span className="ml-2 inline-block bg-peru-red text-white text-xs px-2 py-1 rounded-full">
              {translate('popular')}
            </span>
          )}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1">
          {isVegetarian && (
            <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {translate('vegetarian')}
            </span>
          )}
          {isVegan && (
            <span className="inline-block bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
              {translate('vegan')}
            </span>
          )}
          {isSpicy && (
            <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              {translate('spicy')}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-600">
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
