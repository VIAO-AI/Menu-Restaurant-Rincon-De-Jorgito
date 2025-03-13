
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const { email } = await req.json()
    
    // Only allow this specific admin email
    const allowedAdmin = 'restaurantdejorgitoadm@gmail.com'
    
    const isAdmin = email.toLowerCase() === allowedAdmin.toLowerCase()

    return new Response(
      JSON.stringify({ 
        isAdmin,
        message: isAdmin 
          ? { en: 'Admin verified successfully', es: 'Administrador verificado correctamente' }
          : { en: 'Not authorized', es: 'No autorizado' }
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: { 
          en: 'Error verifying admin',
          es: 'Error al verificar administrador'
        }
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      },
    )
  }
})
