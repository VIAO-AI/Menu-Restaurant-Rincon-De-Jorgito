
export interface MenuItem {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  price: string;
  image: string;
  category: string;
}

export const categories = [
  { id: 'all', name: { en: 'All Categories', es: 'Todas las Categorías' } },
  { id: 'peruvian-drinks', name: { en: 'Peruvian Drinks', es: 'Bebidas Peruanas' } },
  { id: 'beverages', name: { en: 'Beverages', es: 'Bebidas' } },
  { id: 'sides', name: { en: 'Sides', es: 'Acompañamientos' } },
  { id: 'appetizers', name: { en: 'Appetizers', es: 'Entradas' } },
  { id: 'soup', name: { en: 'Hot Soups', es: 'Sopas Calientes' } },
  { id: 'a-la-carta-hot', name: { en: 'A la Carta (Hot Dishes)', es: 'Platos a la Carta (Platos de Fondo)' } },
  { id: 'a-la-carta-cold', name: { en: 'A la Carta (Cold Dishes)', es: 'Platos a la Carta (Platos Fríos)' } },
  { id: 'main-dish', name: { en: 'Main Dish', es: 'Platos Principales' } },
  { id: 'house-specials', name: { en: 'House Specials', es: 'Especialidades de la Casa' } },
];

export const menuItems: MenuItem[] = [
  
  // House Specials - Especialidades de la Casa
  {
    id: 'saltado-champinones',
    name: { 
      en: 'Mushroom Saltado', 
      es: 'Saltado de Champiñones' 
    },
    description: { 
      en: 'Marinated mushrooms sautéed with Peruvian spices, onions, and tomatoes. Served with homemade french fries and white rice.',
      es: 'Champiñones marinados en especias peruanas salteados con cebolla y tomate. Servido con papas fritas caseras y arroz blanco.'
    },
    price: '$20.00',
    image: 'https://images.unsplash.com/photo-1625771688200-ee9a543c1b57',
    category: 'house-specials',
    isVegetarian: true
  },
  {
    id: 'saltado-pollo',
    name: { 
      en: 'Chicken Saltado', 
      es: 'Saltado de Pollo' 
    },
    description: { 
      en: 'Strips of chicken sautéed in traditional Peruvian style with onions, tomatoes, cilantro, and soy sauce. Served with french fries and white rice.',
      es: 'Tiras de pollo salteadas al estilo tradicional peruano con cebolla, tomate, cilantro, y salsa de soya. Servido con papas fritas y arroz blanco.'
    },
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3',
    category: 'house-specials'
  },
  {
    id: 'lomo-saltado-flank',
    name: { 
      en: 'Lomo Saltado (Flank Steak)', 
      es: 'Lomo Saltado (Flank steak)' 
    },
    description: { 
      en: 'Strips of flank steak sautéed in traditional Peruvian style with onions, tomatoes, cilantro, and soy sauce. Served with french fries and white rice.',
      es: 'Tiras de bistec salteadas al estilo tradicional peruano con cebolla, tomate, cilantro, y salsa de soya. Servido con papas fritas y arroz blanco.'
    },
    price: '$28.00',
    image: 'https://images.unsplash.com/photo-1651525251815-54a90df9c7c4',
    category: 'house-specials',
    isPopular: true
  },
  {
    id: 'lomo-saltado-filet',
    name: { 
      en: 'Lomo Saltado (Filet Mignon)', 
      es: 'Lomo Saltado (Filet Mignon)' 
    },
    description: { 
      en: 'Strips of filet mignon sautéed in traditional Peruvian style with onions, tomatoes, cilantro, and soy sauce. Served with french fries and white rice.',
      es: 'Tiras de bistec salteadas al estilo tradicional peruano con cebolla, tomate, cilantro, y salsa de soya. Servido con papas fritas y arroz blanco.'
    },
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1651525251815-54a90df9c7c4',
    category: 'house-specials'
  },
  {
    id: 'tallarin-criollo-pollo',
    name: { 
      en: 'Tallarin Criollo with Chicken', 
      es: 'Tallarin Criollo de Pollo' 
    },
    description: { 
      en: 'Spaghetti with sautéed chicken in Peruvian style sauce with onions, tomatoes, cilantro, and soy sauce.',
      es: 'Espaguetis con pollo salteados en salsa estilo peruano con cebolla, tomate, cilantro, y salsa de soya.'
    },
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'house-specials'
  },
  {
    id: 'tallarin-criollo-carne',
    name: { 
      en: 'Tallarin Criollo with Beef', 
      es: 'Tallarin Criollo de Carne' 
    },
    description: { 
      en: 'Spaghetti with sautéed beef in Peruvian style sauce with onions, tomatoes, cilantro, and soy sauce.',
      es: 'Espaguetis con carne salteados en salsa estilo peruano con cebolla, tomate, cilantro, y salsa de soya.'
    },
    price: '$28.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'house-specials'
  },
  {
    id: 'tallarin-verde-lomo',
    name: { 
      en: 'Green Tallarin with Lomo Saltado', 
      es: 'Tallarin Verde con Lomo Saltado' 
    },
    description: { 
      en: 'Peruvian pasta pesto (white cheese, spinach, and basil leaves) served with strips of steak sautéed in traditional Peruvian style with onions, tomatoes, cilantro, ginger, and soy sauce.',
      es: 'Pesto de pasta peruana (queso blanco, espinacas y hojas de albahaca) servido con tiras de filete salteadas al estilo tradicional peruano con cebolla, tomate, cilantro, jengibre picado y salsa de soya.'
    },
    price: '$30.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'house-specials'
  },
  {
    id: 'tallarin-verde-bistec',
    name: { 
      en: 'Green Tallarin with Steak', 
      es: 'Tallarin Verde con Bistec' 
    },
    description: { 
      en: 'Peruvian pasta pesto (white cheese, spinach, and basil leaves) served with beef steak.',
      es: 'Pesto de pasta peruana (queso blanco, espinacas y hojas de albahaca) servido con filete de res.'
    },
    price: '$32.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'house-specials'
  },
  {
    id: 'tallarines-verdes-milanesa',
    name: { 
      en: 'Green Pasta with Chicken Milanese', 
      es: 'Tallarines Verdes con Milanesa de Pollo' 
    },
    description: { 
      en: 'Green pasta (parmesan cheese, spinach, and basil leaves) served with breaded chicken cutlet.',
      es: 'Tallarines verdes (queso parmesano, espinacas y hojas de albahaca) servido con Milanesa de Pollo.'
    },
    price: '$30.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'house-specials'
  },
  {
    id: 'tallarin-huancaina-lomo',
    name: { 
      en: 'Tallarin a la Huancaina with Lomo Saltado', 
      es: 'Tallarin a la Huancaina con Lomo Saltado' 
    },
    description: { 
      en: 'Noodles smothered in a creamy Huancaina sauce, made from a perfect blend of yellow Peruvian peppers and cheese. Served with strips of steak sautéed in traditional Peruvian style with onions, tomatoes, cilantro, and soy sauce.',
      es: 'Fideos bañados en una cremosa crema huancaína, elaborados con una combinación perfecta de ajíes amarillos peruanos y queso. Servido con tiras de bistec salteadas al estilo tradicional peruano con cebolla, tomate, cilantro, y salsa de soya.'
    },
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'house-specials'
  },
  {
    id: 'tallarin-huancaina-bistec',
    name: { 
      en: 'Tallarin a la Huancaina with Steak', 
      es: 'Tallarin a la Huancaina con Bistec' 
    },
    description: { 
      en: 'Noodles smothered in a creamy Huancaina sauce, made from a perfect blend of yellow Peruvian peppers and cheese. Served with steak.',
      es: 'Fideos bañados en una cremosa crema huancaína, elaborados con una combinación perfecta de ajíes amarillos peruanos y queso. Servido con bistec.'
    },
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'house-specials'
  },
  {
    id: 'tallarines-huancaina-milanesa',
    name: { 
      en: 'Tallarines a la Huancaina with Chicken Milanese', 
      es: 'Tallarines a la Huancaina con Milanesa de Pollo' 
    },
    description: { 
      en: 'Noodles smothered in a creamy Huancaina sauce, made from a perfect blend of yellow Peruvian peppers and cheese. Served with chicken milanese.',
      es: 'Fideos bañados en una cremosa crema huancaína, elaborados con una combinación perfecta de ajíes amarillos peruanos y queso. Servido con milanesa de pollo.'
    },
    price: '$32.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'house-specials'
  },
  {
    id: 'filete-a-lo-macho',
    name: { 
      en: 'Filete a lo Macho', 
      es: 'Filete a lo Macho' 
    },
    description: { 
      en: 'Catch of the day fillet smothered with shrimp, calamari, octopus, mussels, and a traditional Peruvian seafood sauce. Served with cassava fries and white rice.',
      es: 'Filete de pesca del día bañado con camarones, calamares, pulpo, mejillones y una tradicional salsa de mariscos peruana. Servido con yuca frita y arroz blanco.'
    },
    price: '$30.00',
    image: 'https://images.unsplash.com/photo-1658155619720-38cb9280c60a',
    category: 'house-specials'
  },
  {
    id: 'pescado-a-lo-macho',
    name: { 
      en: 'Pescado a lo Macho', 
      es: 'Pescado a lo Macho' 
    },
    description: { 
      en: 'Catch of the day (whole fish) smothered with shrimp, calamari, octopus, mussels, and a traditional Peruvian seafood sauce. Served with cassava fries and rice.',
      es: 'Pesca del día (Pescado entero) bañado con camarones, calamares, pulpo, mejillones y una tradicional salsa de mariscos peruana. Servido con yuca frita y arroz.'
    },
    price: '$50.00',
    image: 'https://images.unsplash.com/photo-1658155619720-38cb9280c60a',
    category: 'house-specials'
  },
  {
    id: 'filete-frito',
    name: { 
      en: 'Fried Fish Fillet', 
      es: 'Filete Frito' 
    },
    description: { 
      en: 'Deep fried fish (swai fillet) served with cassava fries, white rice and salsa criolla (red onions, tomato and lime).',
      es: 'Tilete frito (swai fillet) servida con yuca frita, arroz blanco y ensalada criolla (Cebolla, tomate y limón).'
    },
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1644676914296-eb46d23f9cdb',
    category: 'house-specials'
  },
  {
    id: 'pescado-frito',
    name: { 
      en: 'Fried Whole Fish', 
      es: 'Pescado Frito' 
    },
    description: { 
      en: 'Catch of the day deep fried fish served with cassava fries, white rice and salsa criolla (red onions, tomato and lime).',
      es: 'Pescado del día, pescado entero servido con yuca frita, arroz blanco y salsa criolla (cebolla, tomate y limón).'
    },
    price: '$50.00',
    image: 'https://images.unsplash.com/photo-1644676914296-eb46d23f9cdb',
    category: 'house-specials'
  },
  {
    id: 'salchipapa',
    name: { 
      en: 'Salchipapa', 
      es: 'Salchipapa' 
    },
    description: { 
      en: 'Homemade french fries and beef hot dog, covered with sauce of your choice.',
      es: 'Papas fritas caseras y hot dog de carne, cubiertas con salsa de su elección.'
    },
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c311461cd',
    category: 'a-la-carta-hot',
    isPopular: true
  },
  {
    id: 'broaster-chicken',
    name: { 
      en: 'Broaster Chicken', 
      es: 'Broaster Chicken' 
    },
    description: { 
      en: 'Fried chicken. Served with homemade french fries, covered with sauce of your choice.',
      es: 'Pollo frito. Servido con papas fritas caseras, cubiertas con salsa de su elección.'
    },
    price: '$22.00',
    image: 'https://images.unsplash.com/photo-1598103442080-4e2e436dbe30',
    category: 'a-la-carta-hot'
  },
  {
    id: 'anticucho',
    name: { 
      en: 'Anticucho', 
      es: 'Anticucho' 
    },
    description: { 
      en: 'Two beef heart skewers, potatoes, Peruvian corn (choclo) and huancaina sauce.',
      es: 'Dos brochetas de corazón de res, papas, maíz Peruano (choclo) y salsa huancaína.'
    },
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1633504581786-316cce58cd5b',
    category: 'a-la-carta-hot',
    isPopular: true
  },
  {
    id: 'rachi',
    name: { 
      en: 'Rachi', 
      es: 'Rachi' 
    },
    description: { 
      en: 'Grilled beef stomach, potatoes, Peruvian corn (choclo) and huancaina sauce.',
      es: 'Estómago de res asado, papas, maíz peruano (choclo) y salsa huancaína.'
    },
    price: '$20.00',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c311461cd',
    category: 'a-la-carta-hot'
  },
  {
    id: 'anticucho-con-rachi',
    name: { 
      en: 'Anticucho with Rachi', 
      es: 'Anticucho con Rachi' 
    },
    description: { 
      en: 'Two beef heart skewers, rachi, potatoes, Peruvian corn (choclo) and huancaina sauce.',
      es: 'Dos brochetas de corazón de res, rachi, papas, maíz Peruano (choclo) y salsa huancaína.'
    },
    price: '$28.00',
    image: 'https://images.unsplash.com/photo-1633504581786-316cce58cd5b',
    category: 'a-la-carta-hot',
    isPopular: true
  },
  {
    id: 'chaufa-pollo',
    name: { 
      en: 'Chicken Chaufa', 
      es: 'Chaufa de Pollo' 
    },
    description: { 
      en: 'Peruvian fried rice with chicken, Chinese beans, scrambled eggs, ginger, Chinese onion, sesame oil and seeds. Served with fried wonton strips.',
      es: 'Arroz frito peruano con pollo, frijol chino, huevos revueltos, jengibre, cebolla china, aceite de sésamo y semillas. Servido con hilos de wonton frito.'
    },
    price: '$20.00',
    image: 'https://images.unsplash.com/photo-1594916855318-d752f5864e9c',
    category: 'a-la-carta-hot'
  },
  {
    id: 'chaufa-mariscos',
    name: { 
      en: 'Seafood Chaufa', 
      es: 'Chaufa de Mariscos' 
    },
    description: { 
      en: 'Peruvian fried rice with seafood (shrimp, squid and octopus), Chinese beans, scrambled eggs, Chinese onion, ginger, sesame oil and seeds. Served with fried wonton strips.',
      es: 'Arroz frito peruano con mariscos (camarón, calamar y pulpo), frijol chino, huevos revueltos, cebolla china, jengibre, aceite de sésamo y semillas. Servido con hilos de wonton frito.'
    },
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1594916855318-d752f5864e9c',
    category: 'a-la-carta-hot'
  },
  {
    id: 'chaufa-rincon',
    name: { 
      en: 'Chaufa Rincón', 
      es: 'Chaufa Rincón' 
    },
    description: { 
      en: 'House Special Peruvian fried rice with homemade pork, shrimp, chicken, Chinese beans, scrambled eggs, Chinese onion, ginger, sesame oil and seeds. Served with fried wonton strips.',
      es: 'Especial de la Casa Arroz frito peruano con carne de cerdo casera, camarones, pollo, frijol chino, huevos revueltos, cebolla china, jengibre, aceite de sésamo y semillas. Servido con hilos de wonton frito.'
    },
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1594916855318-d752f5864e9c',
    category: 'a-la-carta-hot',
    isPopular: true
  },

  // Peruvian Drinks
  {
    id: 'chicha-morada',
    name: { 
      en: 'Chicha Morada (Glass/Pitcher)', 
      es: 'Chicha Morada (Vaso/Jarra)' 
    },
    description: { 
      en: 'A sweet Peruvian beverage made from purple corn, pineapple, cinnamon, clove, and sugar.',
      es: 'Una dulce bebida peruana hecha de maíz morado, piña, canela, clavo y azúcar.'
    },
    price: '$5.00 / $20.00',
    image: 'https://images.unsplash.com/photo-1633436375153-d7045cb6c0bf',
    category: 'peruvian-drinks'
  },

  {
    id: 'passion-fruit',
    name: { 
      en: 'Passion fruit (Glass/Pitcher)', 
      es: 'Granadilla (Vaso/Jarra)' 
    },
    description: { 
      en: 'Passion Fruits Pulp, water and sugar.',
      es: 'Pulpa de maracuyá, agua y azúcar.'
    },
    price: '$5.00 / $20.00',
    image: 'https://images.unsplash.com/photo-1633436375153-d7045cb6c0bf',
    category: 'peruvian-drinks'
  },

  {
    id: 'guarana',
    name: { 
      en: 'Guarana (Peruvian Soda)', 
      es: 'Guaraná (Soda Peruana)' 
    },
    description: { 
      en: 'A popular Peruvian carbonated soft drink with a sweet, fruity flavor derived from the guarana plant.',
      es: 'Una popular bebida gaseosa peruana con un sabor dulce y afrutado derivado de la planta de guaraná.'
    },
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3',
    category: 'peruvian-drinks'
  },

  {
    id: 'inca-kola',
    name: { 
      en: 'Inca Kola', 
      es: 'Inca Kola' 
    },
    description: { 
      en: 'A sweet, fruity soft drink that is very popular in Peru. It has a unique taste similar to cream soda or bubblegum.',
      es: 'Un refresco dulce y afrutado muy popular en Perú. Tiene un sabor único similar a la soda de crema o al chicle.'
    },
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3',
    category: 'peruvian-drinks'
  },
  
  // Beverages
  {
    id: 'water',
    name: { 
      en: 'Sparkling Water', 
      es: 'Agua con Gas' 
    },
    description: { 
      en: 'Sparkling mineral water.',
      es: 'Agua mineral con gas.'
    },
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad',
    category: 'beverages'
  },
  {
    id: 'hot-tea',
    name: { 
      en: 'Hot Tea', 
      es: 'Tea Caliente' 
    },
    description: { 
      en: '  ',
      es: '  '
    },
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336',
    category: 'beverages'
  },
  {
    id: 'coffee',
    name: { 
      en: 'Coffee', 
      es: 'Café' 
    },
    description: { 
      en: '  ',
      es: '  '
    },
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3',
    category: 'beverages'
  },
  {
    id: 'sprite',
    name: { 
      en: 'Sprite', 
      es: 'Sprite' 
    },
    description: { 
      en: '  ',
      es: '  '
    },
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7',
    category: 'beverages'
  },
  {
    id: 'coca-cola',
    name: { 
      en: 'Cola Cola', 
      es: 'Coca Cola' 
    },
    description: { 
      en: '  ',
      es: '  '
    },
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3',
    category: 'beverages'
  },
  
  
  // Sides
  {
    id: 'cassava-fries',
    name: { 
      en: 'Cassava fries', 
      es: 'Papas fritas de Yuka' 
    },
    description: { 
      en: '  ',
      es: '  '
    },
    price: '$8.00',
    image: 'https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73',
    category: 'sides'
  },
  {
    id: 'homemade-fries',
    name: { 
      en: 'Homemade fries', 
      es: 'Papas fritas Caseras' 
    },
    description: { 
      en: '  ',
      es: '  '
    },
    price: '$8.00',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c311461cd',
    category: 'sides'
  },
  {
    id: 'white-rice',
    name: { 
      en: 'White Rice', 
      es: 'Arroz Blanco' 
    },
    description: { 
      en: '  ',
      es: '  '
    },
    price: '$8.00',
    image: 'https://images.unsplash.com/photo-1615500548485-bdca912221f0',
    category: 'sides'
  },
  {
    id: 'fried-plantains',
    name: { 
      en: 'Fried Plantains', 
      es: 'Plátanos fritos' 
    },
    description: { 
      en: '  ',
      es: '  '
    },
    price: '$8.00',
    image: 'https://images.unsplash.com/photo-1603614550145-c7bb90bbdabd',
    category: 'sides'
  },
  
  // Appetizers
  {
    id: 'papa-a-la-huancainas',
    name: { 
      en: 'Papa to the Huancaina', 
      es: 'Papa a la Huancaina' 
    },
    description: { 
      en: 'Sliced boiled potatoes in Huancaina sauce. Served with egg and olive. (Made with a Peruvian yellow pepper, crackers and dairy). ',
      es: 'Papas hervidas en rodajas en salsa huancaína. Servidas con huevo y aceitunas. (Hecho con ají amarillo peruano, galletas y lácteos).'
    },
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1633342279010-2d01f39cc10a',
    category: 'appetizers'
  },
  
  {
    id: 'mariscos-a-la-chalala',
    name: { 
      en: 'Seafood Chalala', 
      es: 'Mariscos a la Chalala' 
    },
    description: { 
      en: 'Mixed seafood with Peruvian corn served with lemon juice and a touch of rocoto.',
      es: 'Mariscos mixtos con maíz peruano servido con jugo de limón y un toque de rocoto.'
    },
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1651525358426-108c1aa2ab9e',
    category: 'appetizers'
  },
  {
    id: 'vegetarian-causa',
    name: { 
      en: 'Vegetarian Causa', 
      es: 'Causa Vegetariana' 
    },
    description: { 
      en: 'Mashed potatoes marinated in aji amarillo with a filling of avocado, carrot, green pea and mayonnaise.',
      es: 'Puré de papa marinado en ají amarillo con relleno de aguacate, zanahoria, chícharo y mayonesa.'
    },
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1585591359088-e144e8a61da7',
    category: 'appetizers'
  },
  {
    id: 'pulpo-al-olivo',
    name: { 
      en: 'Pulpo al Olivo', 
      es: 'Pulpo al Olivo' 
    },
    description: { 
      en: 'fresh octopus matched with a perfectly balanced olive cream sauce.',
      es: 'Pulpo fresco acompañado de una salsa de crema de aceitunas perfectamente equilibrada.'
    },
    price: '$30.00',
    image: 'https://images.unsplash.com/photo-1592232906461-3c27973c1ce4',
    category: 'appetizers'
  },
  {
    id: 'causa-acevichada',
    name: { 
      en: 'Causa Acevichada', 
      es: 'Causa Acevichada' 
    },
    description: { 
      en: 'Mashed potatoes marinated in aji amarillo with a filling of avocado, crab meat, mayonnaise, and ceviche on the side.',
      es: 'Puré de papas marinado en ají amarillo con relleno de aguacate, carne de cangrejo, mayonesa y ceviche al lado.'
    },
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1592232906461-3c27973c1ce4',
    category: 'appetizers',
  },
  {
    id: 'crab-causa',
    name: { 
      en: 'Crab Causa', 
      es: 'Causa de Cangrejo' 
    },
    description: { 
      en: 'Mashed potatoes marinated in aji amarillo with a filling of avocado, mayonnaise, fresh octopus matched with an olive cream sauce.',
      es: 'Puré de papa marinado en ají amarillo con relleno de aguacate, mayonesa, pulpo fresco acompañado de una salsa de crema de aceitunas.'
    },
    price: '$30.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'appetizers',
  },
  {
    id: 'pulp-causa',
    name: { 
      en: ' Cause with olive pulp', 
      es: ' Causa con Pulpa al Olivo' 
    },
    description: { 
      en: 'Mashed potato marinated with a filling of avocado, mayonnaise, fresh octopus matched with an olive cream sauce.',
      es: 'Puré de papa marinado con relleno de aguacate, mayonesa, pulpo fresco acompañado de una salsa de crema de aceitunas.'
    },
    price: '$30.00',
    image: 'https://images.unsplash.com/photo-1592232906461-3c27973c1ce4',
    category: 'appetizers'
  },
  
  
  // Soups

  {
    id: 'sopa-de-pollo',
    name: { 
      en: 'Chicken Soup', 
      es: 'Sopa de Pollo' 
    },
    description: { 
      en: 'Traditional chicken soup with angel hair noodles, celery, leek and potatoes. A comforting dish often enjoyed at breakfast.',
      es: 'Sopa tradicional de pollo con fideos cabello de angel, apio, poro y papas. Un plato reconfortante que a menudo se disfruta en el desayuno.'
    },
    price: '$23.00',
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1',
    category: 'soup'
  },
  
  {
    id: 'sopa-a-la-minuta-',
    name: { 
      en: 'Soup to the Minute', 
      es: 'Sopa a la Minuta' 
    },
    description: { 
      en: 'Beef, broth, aji panca, onion, garlic, angel hair noodles, white bread and eggs, tomato paste, evaporated milk',
      es: 'Carne de res, caldo, aji panca, cebolla, ajo, fideo cabello de Angel, pan blanco y huevos, pasta de tomate y leche evaporada'
    },
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1',
    category: 'soup'
  },

  {
    id: 'parihuela-con-filete',
    name: { 
      en: 'Parihuela with Steak', 
      es: 'Parihuela con Filete' 
    },
    description: { 
      en: 'Seafood Soup (Mussels, crab, shrimp, calamari and a steak) served with rice.',
      es: 'Sopa de Mariscos (Mejillones, cangrejo, camarones, calamares y un filete) Servido con Arroz.'
    },
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1',
    category: 'soup'
  },

  {
    id: 'parihuela-con-pescado-entero',
    name: { 
      en: 'Parihuela with Whole Fish', 
      es: 'Parihuela con Pescado Entero' 
    },
    description: { 
      en: 'Seafood Soup (Mussels, crab, shrimp, squid and a whole fish) served with rice.',
      es: 'Sopa de Mariscos (Mejillones, cangrejo, camarones, calamares y un Pescado Entero) Servido con Arroz.'
    },
    price: '$50.00',
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1',
    category: 'soup'
  },

  // Cold Dishes
  {
    id: 'fish-leche-tigre',
    name: { 
      en: 'Fish Leche de Tigre', 
      es: 'Leche de Tigre (Pescado)' 
    },
    description: { 
      en: 'Tiger\'s milk is a citrus-infused marinade crafted from lime juice, fish juices, red onions, and cilantro. White fish Leche de Tigre served with yam, fried fish, calamari and shrimp, Peruvian corn and toasted corn. (Request mild or spicy)',
      es: 'La leche de tigre es preparada a base de limón, jugo de pescado, cebolla morada y cilantro. Leche de Tigre de pescado blanco servida con camote, pescado frito, calamar, camarón, choclo y cancha Peruana (Solicitar suave o picante)'
    },
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1662488024831-797a1cf04898',
    category: 'a-la-carta-cold',
    isSpicy: true
  },
  {
    id: 'mixed-leche-tigre',
    name: { 
      en: 'Mixed Leche de Tigre Rincón', 
      es: 'Leche de Tigre Rincón (Mixto)' 
    },
    description: { 
      en: 'Mixed seafood (white fish, octopus, shrimp, calamari, and squid) onion, Peruvian corn, Peruvian corn kernels, served with yam and fried fish. (Request mild or spicy)',
      es: 'Mezcla de mariscos (pescado blanco, pulpo, camarón y calamar) servida con camote, pescado frito, calamar y camarón, choclo y cancha Peruana (Solicitar suave o picante)'
    },
    price: '$28.00',
    image: 'https://images.unsplash.com/photo-1662488024831-797a1cf04898',
    category: 'a-la-carta-cold',
    isSpicy: true
  },
  {
    id: 'fish-ceviche',
    name: { 
      en: 'Fish Ceviche', 
      es: 'Ceviche de Pescado' 
    },
    description: { 
      en: 'Fresh white fish, marinated in lime juice and Peruvian rocoto pepper. Served with yam, Peruvian corn and toasted corn. (Request mild or spicy)',
      es: 'Pescado blanco fresco cortado en rebanadas, marinado en jugo de limón y rocoto Peruano. Servido con camote, choclo y cancha Peruana. (Solicitar suave o picante)'
    },
    price: '$20.00',
    image: 'https://images.unsplash.com/photo-1633342279010-2d01f39cc10a',
    category: 'a-la-carta-cold',
    isSpicy: true
  },
  {
    id: 'mixed-ceviche',
    name: { 
      en: 'Mixed Ceviche', 
      es: 'Ceviche Mixto' 
    },
    description: { 
      en: 'Fresh diced white fish, octopus, shrimp, calamari, and mussels, marinated in lime juice and Peruvian rocoto pepper. Served with yam, Peruvian corn and toasted corn. (Request mild or spicy)',
      es: 'Pescado blanco fresco cortado en rebanadas, pulpo, camarones, calamares, marinado en jugo de limón y rocoto Peruano. Servido con camote, choclo y cancha Peruana.(Solicitar suave o picante)'
    },
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1633342279010-2d01f39cc10a',
    category: 'a-la-carta-cold',
    isSpicy: true
  },
  {
    id: 'ceviche-rincon',
    name: { 
      en: 'Ceviche Rincón', 
      es: 'Ceviche Rincón' 
    },
    description: { 
      en: 'House Special Ceviche with diced white fish, octopus, shrimp, calamari, crab meat and crab legs, marinated in lime juice and Peruvian rocoto pepper with House Special Sauce. Served with yam, Peruvian corn and toasted corn. (Request mild or spicy)',
      es: 'Ceviche Especial de la Casa con rebanadas de pescado blanco, pulpo, camarones, calamar, pulpa y patas de cangrejo, marinados en jugo de limón y rocoto peruano con salsa Especial de la casa. Servido con camote, choclo y cancha Peruana. (Solicitar suave o picante)'
    },
    price: '$40.00',
    image: 'https://images.unsplash.com/photo-1633342279010-2d01f39cc10a',
    category: 'a-la-carta-cold',
    isSpicy: true,
    isPopular: true
  },

  // New Main Dishes from Menu Images
  {
    id: 'jalea-mixta',
    name: { 
      en: 'Jalea Mixta', 
      es: 'Jalea Mixta' 
    },
    description: { 
      en: 'Deep fried fish, shrimp, calamari and octopus. Served with cassava fries, tartar sauce, and salsa criolla (red onions, tomato and lime).',
      es: 'Pescado frito, camarones, calamares y pulpo. Servido con yuca frita, salsa tártara y salsa criolla (cebolla roja, tomate y limón).'
    },
    price: '$30.00',
    image: 'https://images.unsplash.com/photo-1562967915-92ae0c320a01',
    category: 'main-dish'
  },
  {
    id: 'arroz-con-mariscos-2',
    name: { 
      en: 'Rice with seafood', 
      es: 'Arroz con Mariscos' 
    },
    description: { 
      en: 'Peruvian style paella with scallops, octopus, mussels, clams, shrimp, and calamari in a red sauce. Served with salsa criolla (red onions, tomato and lime).',
      es: 'Paella al estilo peruano con vieiras, pulpo, mejillones, almejas, camarones y calamares en una salsa roja. Servido con salsa criolla (cebolla roja, tomate y limón).'
    },
    price: '$28.00',
    image: 'https://images.unsplash.com/photo-1626790997302-17c15337f73e',
    category: 'main-dish'
  },
  {
    id: 'pollada',
    name: { 
      en: 'Pollada', 
      es: 'Pollada' 
    },
    description: { 
      en: 'Pollada is a Peruvian Traditional Dish, which is chicken marinated with Peruvian herbs. Served with boiled potatoes, salad, and huancaina sauce.',
      es: 'La Pollada es un Plato Tradicional Peruano, que consiste en pollo marinado con hierbas peruanas. Servido con papas hervidas, ensalada y salsa huancaína.'
    },
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1598103442080-4e2e436dbe30',
    category: 'main-dish'
  },
  {
    id: 'bistec-a-lo-pobre',
    name: { 
      en: 'Bistec a lo Pobre', 
      es: 'Bistec a lo Pobre' 
    },
    description: { 
      en: 'Peruvian delight featuring tender steak, fried plantains, homemade fried potatoes and a fried egg. Served with rice.',
      es: 'Delicia peruana con bistec tierno, plátanos fritos, papas fritas caseras y un huevo frito. Servido con arroz.'
    },
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    category: 'main-dish'
  }
];
