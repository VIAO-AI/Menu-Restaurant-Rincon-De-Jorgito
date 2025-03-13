
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { verifyAdminEmail } from '@/lib/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (isAuthenticated === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (email.trim()) {
        const isAdmin = await verifyAdminEmail(email);
        
        if (isAdmin) {
          localStorage.setItem('admin_authenticated', 'true');
          localStorage.setItem('admin_email', email);
          
          toast({
            title: "Inicio de sesión exitoso",
            description: "¡Bienvenido al panel de administración!",
          });
          navigate('/admin/dashboard');
        } else {
          throw new Error('No autorizado. El correo electrónico no tiene permisos de administrador.');
        }
      } else {
        throw new Error('El correo electrónico es requerido');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: error.message || "Error al intentar iniciar sesión",
      });
    } finally {
      setLoading(false);
    }
  };

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
              Correo Electrónico de Administrador
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
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-peru-red text-white py-2 px-4 rounded-md hover:bg-peru-terracotta transition-colors disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Verificando...
              </span>
            ) : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
