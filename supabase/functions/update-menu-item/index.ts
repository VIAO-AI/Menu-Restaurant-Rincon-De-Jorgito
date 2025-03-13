
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

serve(async (req) => {
  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )
    
    const { id, updates } = await req.json()
    
    // Validate that we have the required inputs
    if (!id) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required field: id',
          message: {
            en: 'Item ID is required',
            es: 'Se requiere el ID del elemento'
          }
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        },
      )
    }
    
    const { data, error } = await supabaseClient
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: {
          en: 'Error updating menu item',
          es: 'Error al actualizar el elemento del menú'
        }
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      },
    )
  }
})
