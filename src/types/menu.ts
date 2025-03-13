
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
  category: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  ingredients?: string[];
  image?: string;
}
