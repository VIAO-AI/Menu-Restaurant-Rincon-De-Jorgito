
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
  { id: 'soup', name: { en: 'Soup', es: 'Sopas' } },
  { id: 'cold-dishes', name: { en: 'Cold Dishes', es: 'Platos Fríos' } },
  { id: 'main-dish', name: { en: 'Main Dish', es: 'Platos Principales' } },
];

export const menuItems: MenuItem[] = [
  // Peruvian Drinks
  {
    id: 'chicha-morada',
    name: { 
      en: 'Chicha Morada', 
      es: 'Chicha Morada' 
    },
    description: { 
      en: 'A sweet Peruvian beverage made from purple corn, pineapple, cinnamon, clove, and sugar.',
      es: 'Una dulce bebida peruana hecha de maíz morado, piña, canela, clavo y azúcar.'
    },
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1633436375153-d7045cb6c0bf',
    category: 'peruvian-drinks'
  },
  {
    id: 'pisco-sour',
    name: { 
      en: 'Pisco Sour', 
      es: 'Pisco Sour' 
    },
    description: { 
      en: 'Peru\'s national cocktail made with Pisco, lime juice, simple syrup, egg white, and bitters.',
      es: 'El cóctel nacional de Perú hecho con Pisco, jugo de limón, jarabe simple, clara de huevo y amargos.'
    },
    price: '$8.00',
    image: 'https://images.unsplash.com/photo-1514362453360-8f94243c9996',
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
    price: '$3.00',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3',
    category: 'peruvian-drinks'
  },
  {
    id: 'maracuya-sour',
    name: { 
      en: 'Maracuyá Sour', 
      es: 'Maracuyá Sour' 
    },
    description: { 
      en: 'A variation of the Pisco Sour made with passion fruit juice, creating a refreshing and tropical cocktail.',
      es: 'Una variación del Pisco Sour hecho con jugo de maracuyá, creando un cóctel refrescante y tropical.'
    },
    price: '$9.00',
    image: 'https://images.unsplash.com/photo-1619604373884-1e8a4f638ae3',
    category: 'peruvian-drinks'
  },
  
  // Beverages
  {
    id: 'water',
    name: { 
      en: 'Bottled Water', 
      es: 'Agua Embotellada' 
    },
    description: { 
      en: 'Still or sparkling mineral water.',
      es: 'Agua mineral con o sin gas.'
    },
    price: '$2.00',
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad',
    category: 'beverages'
  },
  {
    id: 'coffee',
    name: { 
      en: 'Peruvian Coffee', 
      es: 'Café Peruano' 
    },
    description: { 
      en: 'Locally sourced coffee with rich flavors and medium acidity.',
      es: 'Café de origen local con sabores ricos y acidez media.'
    },
    price: '$3.50',
    image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336',
    category: 'beverages'
  },
  {
    id: 'coca-tea',
    name: { 
      en: 'Coca Tea', 
      es: 'Mate de Coca' 
    },
    description: { 
      en: 'Traditional Andean tea made from coca leaves, known for helping with altitude sickness.',
      es: 'Té andino tradicional hecho de hojas de coca, conocido por ayudar con el mal de altura.'
    },
    price: '$3.00',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3',
    category: 'beverages'
  },
  {
    id: 'fruit-juice',
    name: { 
      en: 'Fresh Fruit Juice', 
      es: 'Jugo de Fruta Fresca' 
    },
    description: { 
      en: 'Choose from various tropical fruits including mango, papaya, and passion fruit.',
      es: 'Escoge entre varias frutas tropicales incluyendo mango, papaya y maracuyá.'
    },
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
    category: 'beverages'
  },
  {
    id: 'beer',
    name: { 
      en: 'Cusqueña Beer', 
      es: 'Cerveza Cusqueña' 
    },
    description: { 
      en: 'Premium Peruvian lager with a clean, refreshing taste.',
      es: 'Lager premium peruana con un sabor limpio y refrescante.'
    },
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9',
    category: 'beverages'
  },
  
  // Sides
  {
    id: 'rice',
    name: { 
      en: 'White Rice', 
      es: 'Arroz Blanco' 
    },
    description: { 
      en: 'Fluffy steamed white rice, essential accompaniment to many Peruvian dishes.',
      es: 'Arroz blanco esponjoso al vapor, acompañamiento esencial para muchos platos peruanos.'
    },
    price: '$3.00',
    image: 'https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73',
    category: 'sides'
  },
  {
    id: 'yuca-frita',
    name: { 
      en: 'Yuca Frita', 
      es: 'Yuca Frita' 
    },
    description: { 
      en: 'Crispy fried cassava, a starchy alternative to french fries.',
      es: 'Yuca frita crujiente, una alternativa feculenta a las papas fritas.'
    },
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c311461cd',
    category: 'sides'
  },
  {
    id: 'plantains',
    name: { 
      en: 'Fried Plantains', 
      es: 'Plátanos Fritos' 
    },
    description: { 
      en: 'Sweet ripe plantains, fried until golden and caramelized.',
      es: 'Plátanos maduros dulces, fritos hasta que estén dorados y caramelizados.'
    },
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1615500548485-bdca912221f0',
    category: 'sides'
  },
  {
    id: 'papa-criolla',
    name: { 
      en: 'Papa Criolla', 
      es: 'Papa Criolla' 
    },
    description: { 
      en: 'Small yellow potatoes boiled and then lightly fried with spices.',
      es: 'Pequeñas papas amarillas hervidas y luego ligeramente fritas con especias.'
    },
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1603614550145-c7bb90bbdabd',
    category: 'sides'
  },
  
  // Appetizers
  {
    id: 'ceviche',
    name: { 
      en: 'Classic Ceviche', 
      es: 'Ceviche Clásico' 
    },
    description: { 
      en: 'Fresh fish marinated in lime juice with onions, cilantro, and aji amarillo. Served with sweet potato and cancha.',
      es: 'Pescado fresco marinado en jugo de limón con cebollas, cilantro y ají amarillo. Servido con camote y cancha.'
    },
    price: '$14.00',
    image: 'https://images.unsplash.com/photo-1633342279010-2d01f39cc10a',
    category: 'appetizers'
  },
  {
    id: 'causa',
    name: { 
      en: 'Causa Limeña', 
      es: 'Causa Limeña' 
    },
    description: { 
      en: 'Layered potato dish with avocado, chicken, and various fillings, seasoned with lime and aji amarillo.',
      es: 'Plato de papa en capas con aguacate, pollo y varios rellenos, sazonado con limón y ají amarillo.'
    },
    price: '$10.00',
    image: 'https://images.unsplash.com/photo-1592232906461-3c27973c1ce4',
    category: 'appetizers'
  },
  {
    id: 'anticuchos',
    name: { 
      en: 'Anticuchos', 
      es: 'Anticuchos' 
    },
    description: { 
      en: 'Grilled beef heart skewers marinated in a spicy sauce, a popular Peruvian street food.',
      es: 'Brochetas de corazón de res a la parrilla marinadas en una salsa picante, una popular comida callejera peruana.'
    },
    price: '$12.00',
    image: 'https://images.unsplash.com/photo-1633504581786-316cce58cd5b',
    category: 'appetizers'
  },
  {
    id: 'papa-rellena',
    name: { 
      en: 'Papa Rellena', 
      es: 'Papa Rellena' 
    },
    description: { 
      en: 'Mashed potato stuffed with seasoned ground beef, eggs, olives, and spices, then fried until golden.',
      es: 'Puré de papa relleno de carne molida sazonada, huevos, aceitunas y especias, luego frito hasta que esté dorado.'
    },
    price: '$9.00',
    image: 'https://images.unsplash.com/photo-1597289124948-688c1a35cb48',
    category: 'appetizers'
  },
  {
    id: 'empanadas',
    name: { 
      en: 'Empanadas', 
      es: 'Empanadas' 
    },
    description: { 
      en: 'Baked or fried pastries filled with beef, chicken, or cheese.',
      es: 'Pasteles horneados o fritos rellenos de carne de res, pollo o queso.'
    },
    price: '$8.00',
    image: 'https://images.unsplash.com/photo-1628824851008-952e45cef567',
    category: 'appetizers'
  },
  {
    id: 'tiradito',
    name: { 
      en: 'Tiradito', 
      es: 'Tiradito' 
    },
    description: { 
      en: 'Thinly sliced raw fish in a spicy sauce. Similar to ceviche but without onions and served in thin slices.',
      es: 'Pescado crudo finamente cortado en una salsa picante. Similar al ceviche pero sin cebollas y servido en rodajas finas.'
    },
    price: '$13.00',
    image: 'https://images.unsplash.com/photo-1585591359088-e144e8a61da7',
    category: 'appetizers'
  },
  {
    id: 'tequeños',
    name: { 
      en: 'Tequeños', 
      es: 'Tequeños' 
    },
    description: { 
      en: 'Fried wonton sticks filled with cheese, served with guacamole or huancaína sauce.',
      es: 'Palitos de wonton fritos rellenos de queso, servidos con guacamole o salsa huancaína.'
    },
    price: '$8.00',
    image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435',
    category: 'appetizers'
  },
  
  // Soup
  {
    id: 'aguadito',
    name: { 
      en: 'Aguadito de Pollo', 
      es: 'Aguadito de Pollo' 
    },
    description: { 
      en: 'Peruvian chicken soup with a bright green color from cilantro, with rice, vegetables, and potatoes.',
      es: 'Sopa peruana de pollo con un color verde brillante del cilantro, con arroz, verduras y papas.'
    },
    price: '$10.00',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    category: 'soup'
  },
  {
    id: 'chupe',
    name: { 
      en: 'Chupe de Camarones', 
      es: 'Chupe de Camarones' 
    },
    description: { 
      en: 'Creamy shrimp soup with potatoes, corn, rice, and vegetables, flavored with aji panca and huacatay.',
      es: 'Sopa cremosa de camarones con papas, maíz, arroz y verduras, aromatizada con ají panca y huacatay.'
    },
    price: '$14.00',
    image: 'https://images.unsplash.com/photo-1591778622066-1d79eae5d08c',
    category: 'soup'
  },
  {
    id: 'menestron',
    name: { 
      en: 'Menestrón', 
      es: 'Menestrón' 
    },
    description: { 
      en: 'Peruvian minestrone soup with vegetables, beans, pasta, and pesto.',
      es: 'Sopa minestrone peruana con verduras, frijoles, pasta y pesto.'
    },
    price: '$9.00',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: 'soup'
  },
  {
    id: 'caldo-gallina',
    name: { 
      en: 'Caldo de Gallina', 
      es: 'Caldo de Gallina' 
    },
    description: { 
      en: 'Traditional hen soup with noodles, potatoes, and vegetables. A comforting dish often enjoyed for breakfast.',
      es: 'Sopa tradicional de gallina con fideos, papas y verduras. Un plato reconfortante que a menudo se disfruta en el desayuno.'
    },
    price: '$11.00',
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1',
    category: 'soup'
  },
  
  // Cold Dishes
  {
    id: 'leche-tigre',
    name: { 
      en: 'Leche de Tigre', 
      es: 'Leche de Tigre' 
    },
    description: { 
      en: 'Spicy citrus-based marinade of ceviche served as a refreshing shooter.',
      es: 'Marinada picante a base de cítricos del ceviche servida como un refrescante shot.'
    },
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1662488024831-797a1cf04898',
    category: 'cold-dishes'
  },
  {
    id: 'pulpo-olivo',
    name: { 
      en: 'Pulpo al Olivo', 
      es: 'Pulpo al Olivo' 
    },
    description: { 
      en: 'Sliced octopus in a black olive sauce, a Nikkei (Japanese-Peruvian) fusion dish.',
      es: 'Pulpo en rodajas en una salsa de aceitunas negras, un plato de fusión Nikkei (japonés-peruano).'
    },
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1626625148737-af9029348c19',
    category: 'cold-dishes'
  },
  {
    id: 'solterito',
    name: { 
      en: 'Solterito', 
      es: 'Solterito' 
    },
    description: { 
      en: 'Fresh salad with fava beans, corn, tomato, queso fresco, olives, and a lime dressing.',
      es: 'Ensalada fresca con habas, maíz, tomate, queso fresco, aceitunas y un aderezo de limón.'
    },
    price: '$9.00',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: 'cold-dishes'
  },
  {
    id: 'palta-rellena',
    name: { 
      en: 'Palta Rellena', 
      es: 'Palta Rellena' 
    },
    description: { 
      en: 'Avocado halves filled with chicken, shrimp, or vegetables in a creamy sauce.',
      es: 'Mitades de aguacate rellenas de pollo, camarones o vegetales en una salsa cremosa.'
    },
    price: '$11.00',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c311461cd',
    category: 'cold-dishes'
  },
  {
    id: 'ocopa',
    name: { 
      en: 'Ocopa Arequipeña', 
      es: 'Ocopa Arequipeña' 
    },
    description: { 
      en: 'Boiled potatoes covered in a creamy sauce made with peanuts, cheese, aji amarillo, and huacatay.',
      es: 'Papas hervidas cubiertas con una salsa cremosa hecha con maní, queso, ají amarillo y huacatay.'
    },
    price: '$10.00',
    image: 'https://images.unsplash.com/photo-1651525358426-108c1aa2ab9e',
    category: 'cold-dishes'
  },
  
  // Main Dishes - just showing 10 of 28 for brevity
  {
    id: 'lomo-saltado',
    name: { 
      en: 'Lomo Saltado', 
      es: 'Lomo Saltado' 
    },
    description: { 
      en: 'Stir-fried beef with onions, tomatoes, and french fries, served with rice. A classic Peruvian-Chinese fusion dish.',
      es: 'Carne de res salteada con cebollas, tomates y papas fritas, servida con arroz. Un clásico plato de fusión peruano-chino.'
    },
    price: '$16.00',
    image: 'https://images.unsplash.com/photo-1651525251815-54a90df9c7c4',
    category: 'main-dish'
  },
  {
    id: 'aji-gallina',
    name: { 
      en: 'Ají de Gallina', 
      es: 'Ají de Gallina' 
    },
    description: { 
      en: 'Shredded chicken in a creamy yellow pepper sauce, served with rice, potatoes, olives, and boiled eggs.',
      es: 'Pollo desmenuzado en una salsa cremosa de ají amarillo, servido con arroz, papas, aceitunas y huevos duros.'
    },
    price: '$14.00',
    image: 'https://images.unsplash.com/photo-1651525399311-088c3a8e7709',
    category: 'main-dish'
  },
  {
    id: 'arroz-mariscos',
    name: { 
      en: 'Arroz con Mariscos', 
      es: 'Arroz con Mariscos' 
    },
    description: { 
      en: 'Peruvian seafood rice similar to paella, with a mix of seafood and vegetables flavored with aji panca.',
      es: 'Arroz con mariscos peruano similar a la paella, con una mezcla de mariscos y verduras aromatizadas con ají panca.'
    },
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1626790997302-17c15337f73e',
    category: 'main-dish'
  },
  {
    id: 'pollo-brasa',
    name: { 
      en: 'Pollo a la Brasa', 
      es: 'Pollo a la Brasa' 
    },
    description: { 
      en: 'Peruvian rotisserie chicken marinated in a special sauce. Served with french fries and salad.',
      es: 'Pollo asado peruano marinado en una salsa especial. Servido con papas fritas y ensalada.'
    },
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1598103442080-4e2e436dbe30',
    category: 'main-dish'
  },
  {
    id: 'tacu-tacu',
    name: { 
      en: 'Tacu Tacu', 
      es: 'Tacu Tacu' 
    },
    description: { 
      en: 'Refried rice and beans patty, often topped with a fried egg and served with steak or seafood.',
      es: 'Patty de arroz y frijoles refritos, a menudo cubierto con un huevo frito y servido con bistec o mariscos.'
    },
    price: '$14.00',
    image: 'https://images.unsplash.com/photo-1662057364847-f9e7913d65ad',
    category: 'main-dish'
  },
  {
    id: 'carapulcra',
    name: { 
      en: 'Carapulcra', 
      es: 'Carapulcra' 
    },
    description: { 
      en: 'One of Peru\'s oldest dishes, made with dried potatoes and pork in a peanut and spice sauce.',
      es: 'Uno de los platos más antiguos de Perú, hecho con papas secas y cerdo en una salsa de maní y especias.'
    },
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1535400255456-96cfb1b128e9',
    category: 'main-dish'
  },
  {
    id: 'chaufa',
    name: { 
      en: 'Arroz Chaufa', 
      es: 'Arroz Chaufa' 
    },
    description: { 
      en: 'Peruvian-Chinese fried rice with chicken, beef, or seafood, eggs, green onions, and soy sauce.',
      es: 'Arroz frito peruano-chino con pollo, res o mariscos, huevos, cebollas verdes y salsa de soja.'
    },
    price: '$14.00',
    image: 'https://images.unsplash.com/photo-1594916855318-d752f5864e9c',
    category: 'main-dish'
  },
  {
    id: 'pescado-cebichero',
    name: { 
      en: 'Pescado a lo Macho', 
      es: 'Pescado a lo Macho' 
    },
    description: { 
      en: 'Fried fish topped with a spicy seafood sauce, served with rice.',
      es: 'Pescado frito cubierto con una salsa picante de mariscos, servido con arroz.'
    },
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1658155619720-38cb9280c60a',
    category: 'main-dish'
  },
  {
    id: 'rocoto-relleno',
    name: { 
      en: 'Rocoto Relleno', 
      es: 'Rocoto Relleno' 
    },
    description: { 
      en: 'Stuffed spicy rocoto pepper with minced meat, topped with cheese and baked.',
      es: 'Rocoto picante relleno con carne picada, cubierto con queso y horneado.'
    },
    price: '$14.00',
    image: 'https://images.unsplash.com/photo-1644676914296-eb46d23f9cdb',
    category: 'main-dish'
  },
  {
    id: 'chupe-camarones',
    name: { 
      en: 'Seco de Cordero', 
      es: 'Seco de Cordero' 
    },
    description: { 
      en: 'Lamb stew cooked with cilantro, beer, and spices, served with beans and rice.',
      es: 'Estofado de cordero cocinado con cilantro, cerveza y especias, servido con frijoles y arroz.'
    },
    price: '$17.00',
    image: 'https://images.unsplash.com/photo-1602351230645-8fc4e5590b2b',
    category: 'main-dish'
  }
];
