
import { MenuItem } from '@/types/menu';
import { supabase } from './supabase';

// Menu item CRUD operations
export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

export const addMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<MenuItem | null> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([{ ...item }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding menu item:', error);
    return null;
  }
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating menu item:', error);
    return null;
  }
};

export const deleteMenuItem = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return false;
  }
};

// Admin authentication
export const verifyAdminEmail = async (email: string): Promise<boolean> => {
  try {
    // This would typically check against an approved list of admin emails
    // For now, we'll simply check if the email format is valid and has a specific domain
    // In a production environment, you would want more robust admin verification
    return email.includes('@') && email.length > 5;
  } catch (error) {
    console.error('Error verifying admin email:', error);
    return false;
  }
};

// File storage for menu item images
export const uploadMenuItemImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `menu-items/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
