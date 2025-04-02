import { menuItems } from '@/data/menuData';
import { MenuItem } from '@/types/menu';

/**
 * Fetches menu items from the data source
 * @returns Promise<MenuItem[]> A promise that resolves to an array of menu items
 */
export const getMenuItems = async (): Promise<MenuItem[]> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menuItems);
    }, 500);
  });
};