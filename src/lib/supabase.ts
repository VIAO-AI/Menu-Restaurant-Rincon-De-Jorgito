
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use placeholder values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key not found in environment variables. Using placeholder values for development.');
}

// Create Supabase client with proper error handling
export const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co',
  supabaseAnonKey || 'your-anon-key'
);

// Helper function to check if a user is authenticated
export const isAuthenticated = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Authentication check error:', error);
    return false;
  }
};

// Helper function to get the current user
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// Check if we have a valid Supabase connection
export const checkSupabaseConnection = async () => {
  try {
    // Simple ping to check connection
    const { data, error } = await supabase.from('menu_items').select('count', { count: 'exact', head: true });
    return !error;
  } catch (error) {
    console.error('Supabase connection check error:', error);
    return false;
  }
};
