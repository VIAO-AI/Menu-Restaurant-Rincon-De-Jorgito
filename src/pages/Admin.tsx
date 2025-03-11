
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase, isAuthenticated } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2 } from 'lucide-react';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { translate } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          navigate('/admin/menu');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Attempting login with:', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Supabase login error details:', error);
        throw error;
      }

      if (data && data.session) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "¡Bienvenido al panel de administración!",
        });
        navigate('/admin/menu');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: "Error al intentar iniciar sesión. Por favor, verifica tus credenciales y la conexión con Supabase.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Setup development/testing account logic
  // Use this for testing if Supabase auth is not working
  const handleDevLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (process.env.NODE_ENV === 'development' || !import.meta.env.PROD) {
      localStorage.setItem('dev_admin_authenticated', 'true');
      toast({
        title: "Modo de desarrollo",
        description: "Accediendo en modo de desarrollo",
      });
      navigate('/admin/menu');
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-peru-beige/10">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-peru-red animate-spin" />
          <p className="mt-2 text-peru-brown">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-peru-beige/10">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-peru-red flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="font-title text-2xl font-bold text-peru-brown">El Rincón De Jorgito</span>
          </div>
          <h1 className="text-xl font-title text-peru-brown">Panel de Administración</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-peru-red"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-peru-red"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-peru-red text-white py-2 px-4 rounded-md hover:bg-peru-terracotta transition-colors disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Iniciando sesión...
              </span>
            ) : "Iniciar Sesión"}
          </button>
          
          {/* Development/testing login option */}
          {(process.env.NODE_ENV === 'development' || !import.meta.env.PROD) && (
            <button
              onClick={handleDevLogin}
              className="w-full mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              Acceso de Desarrollo
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Admin;
