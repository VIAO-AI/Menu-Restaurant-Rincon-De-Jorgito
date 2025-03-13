
import React from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '@/types/menu';
import { useLanguage } from '@/context/LanguageContext';

interface MenuSectionProps {
  title: string;
  items: MenuItemType[];
  categoryFilter?: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, categoryFilter }) => {
  const { translate } = useLanguage();
  
  // Filter items by category if categoryFilter is provided
  const filteredItems = categoryFilter 
    ? items.filter(item => item.category === categoryFilter)
    : items;

  return (
    <section className="py-8">
      <div className="divider-pattern pt-8 mb-6">
        <h2 className="font-title text-2xl md:text-3xl text-center text-peru-brown">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
