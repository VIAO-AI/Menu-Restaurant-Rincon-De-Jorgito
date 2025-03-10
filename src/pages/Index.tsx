
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MenuFilter from '@/components/MenuFilter';
import MenuSection from '@/components/MenuSection';
import Footer from '@/components/Footer';
import { menuItems, categories } from '@/data/menuData';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { language, translate } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Group items by category for displaying
  const getItemsByCategory = (categoryId: string) => {
    return filteredItems.filter(item => item.category === categoryId);
  };

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name[language as keyof typeof category.name] : '';
  };

  // Get unique categories from filtered items
  const uniqueCategories = Array.from(
    new Set(filteredItems.map(item => item.category))
  );

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-8 px-6 bg-gradient-to-b from-peru-beige/50 to-white hero-pattern">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-float">
            <span className="inline-block px-4 py-1 rounded-full bg-peru-gold/10 text-peru-ochre text-sm font-medium mb-4">
              {translate('tagline')}
            </span>
          </div>
          <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-peru-brown animate-fade-in">
            {translate('appName')}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Descubre los sabores auténticos de la gastronomía peruana. Nuestra carta ofrece una experiencia culinaria que refleja la rica tradición y diversidad de Perú.
          </p>
        </div>
      </div>
      
      {/* Menu Filter */}
      <div className="sticky top-16 z-40 bg-white shadow-sm">
        <div className="container mx-auto max-w-6xl px-6">
          <MenuFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </div>
      </div>
      
      {/* Menu Content */}
      <div className="flex-1 container mx-auto max-w-6xl px-6 py-8">
        {activeCategory === 'all' ? (
          // When showing all categories, display each category with its own section
          uniqueCategories.map(categoryId => {
            const items = getItemsByCategory(categoryId);
            if (items.length === 0) return null;
            
            return (
              <MenuSection 
                key={categoryId} 
                title={getCategoryName(categoryId)} 
                items={items} 
              />
            );
          })
        ) : (
          // When a category is selected, display just those items
          <MenuSection 
            title={getCategoryName(activeCategory)} 
            items={filteredItems} 
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
