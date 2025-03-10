
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://restaurantrincondejorgito.com';
const supabaseAnonKey = 'jorgitoadm1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
