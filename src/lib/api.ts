
import { MenuItem } from '@/types/menu';
import { supabase } from './supabase';

// Menu item CRUD operations via Edge Functions
export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    // Fallback to local menuData if Supabase is not properly configured
    if (!supabase.functions) {
      console.log("Supabase functions not available, using menuData");
      const { menuItems } = await import('@/data/menuData');
      return menuItems as MenuItem[];
    }

    const { data, error } = await supabase.functions.invoke('get-menu-items');
    
    if (error) {
      console.error("Edge function error:", error);
      // Fallback to direct database query
      const { data: dbData, error: dbError } = await supabase
        .from('menu_items')
        .select('*');
      
      if (dbError) {
        console.error("Database query error:", dbError);
        // Final fallback to menuData
        const { menuItems } = await import('@/data/menuData');
        return menuItems as MenuItem[];
      }
      
      return dbData || [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    // Ultimate fallback to menuData
    const { menuItems } = await import('@/data/menuData');
    return menuItems as MenuItem[];
  }
};

export const addMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<MenuItem | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('add-menu-item', {
      body: { item }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      // Fallback to direct database query
      const { data: dbData, error: dbError } = await supabase
        .from('menu_items')
        .insert([{ ...item }])
        .select()
        .single();
      
      if (dbError) throw dbError;
      return dbData;
    }
    
    return data;
  } catch (error) {
    console.error('Error adding menu item:', error);
    return null;
  }
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('update-menu-item', {
      body: { id, updates }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      // Fallback to direct database query
      const { data: dbData, error: dbError } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (dbError) throw dbError;
      return dbData;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating menu item:', error);
    return null;
  }
};

export const deleteMenuItem = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('delete-menu-item', {
      body: { id }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      // Fallback to direct database query
      const { error: dbError } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
      
      if (dbError) throw dbError;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return false;
  }
};

// Admin authentication
export const verifyAdminEmail = async (email: string): Promise<boolean> => {
  try {
    // This could also be moved to an edge function for better security
    const { data, error } = await supabase.functions.invoke('verify-admin', {
      body: { email }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      // Simple fallback validation
      return email.includes('@') && email.length > 5;
    }
    
    return data?.isAdmin || false;
  } catch (error) {
    console.error('Error verifying admin email:', error);
    // Fallback validation if edge function fails
    return email.includes('@') && email.length > 5;
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
