
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://restaurantrincondejorgito.com';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'jorgitoadm1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if a user is authenticated
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
