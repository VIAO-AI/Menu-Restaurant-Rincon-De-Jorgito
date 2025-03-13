
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const { email } = await req.json()
    
    // List of allowed admin emails
    // In a production environment, you would store this in a database table
    const allowedAdmins = [
      'admin@example.com',
      'restaurant@example.com',
      'manager@example.com'
    ]
    
    const isAdmin = allowedAdmins.includes(email.toLowerCase())

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
