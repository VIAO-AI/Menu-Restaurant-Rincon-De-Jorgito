/**
 * Utilidades para manejar imágenes locales en la aplicación
 */

/**
 * Función para obtener la ruta de la imagen local
 * @param imageName Nombre del archivo de imagen
 * @returns Ruta completa a la imagen local
 */
export const getLocalImagePath = (imageName: string): string => {
  return `/dishes-images/${imageName}`;
};

/**
 * Mapeo de IDs de platillos a nombres de archivos de imágenes locales
 */
export const dishImageMap: Record<string, string> = {
  // House Specials
  'saltado-champinones': '5140960186003991781.jpg',
  'saltado-pollo': '5140960186003991782.jpg',
  'lomo-saltado-flank': '5140960186003991783.jpg',
  'lomo-saltado-filet': '5140960186003991784.jpg',
  'tallarin-criollo-pollo': '5141273710026666320.jpg',
  'tallarin-criollo-carne': '5141273710026666321.jpg',
  'tallarin-verde-lomo': '5141273710026666322.jpg',
  'tallarin-verde-bistec': '5141273710026666323.jpg',
  'tallarines-verdes-milanesa': '5141273710026666324.jpg',
  'tallarin-huancaina-lomo': '5141273710026666325.jpg',
  'tallarin-huancaina-bistec': '5141273710026666326.jpg',
  'tallarines-huancaina-milanesa': '5141273710026666327.jpg',
  'filete-a-lo-macho': '5141273710026666328.jpg',
  'pescado-a-lo-macho': '5141273710026666329.jpg',
  'filete-frito': '5141273710026666330.jpg',
  'pescado-frito': '5141273710026666331.jpg',
  'salchipapa': '5141273710026666332.jpg',
  'broaster-chicken': '5141273710026666333.jpg',
  'anticucho': '5141273710026666334.jpg',
  'rachi': '5141273710026666335.jpg',
  'anticucho-con-rachi': '5141273710026666336.jpg',
  'chaufa-pollo': '5141273710026666337.jpg',
  'chaufa-mariscos': '5141273710026666338.jpg',
  'chaufa-rincon': '5141273710026666339.jpg',
  
  // Otros platillos pueden ser mapeados según sea necesario
  // Bebidas, entradas, etc.
  'chicha-morada': '5141273710026666340.jpg'
};

/**
 * Función para obtener la ruta de la imagen local basada en el ID del platillo
 * @param dishId ID del platillo
 * @returns Ruta a la imagen local o undefined si no existe mapeo
 */
export const getDishImagePath = (dishId: string): string | undefined => {
  const imageName = dishImageMap[dishId];
  if (imageName) {
    return getLocalImagePath(imageName);
  }
  return undefined;
};