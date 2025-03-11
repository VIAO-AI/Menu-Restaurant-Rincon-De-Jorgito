
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash, Loader2, LogOut } from 'lucide-react';
import type { MenuItem } from '@/types/menu';

const AdminMenu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: { en: '', es: '' },
    description: { en: '', es: '' },
    price: '',
    category: '',
    isPopular: false,
    isVegetarian: false,
    ingredients: [],
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    fetchMenuItems();
  }, [navigate]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const storedItems = localStorage.getItem('menu_items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error: any) {
      console.error('Error fetching menu items:', error);
      toast({
        variant: "destructive",
        title: "Error al cargar el menú",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      setLoading(true);
      const updatedItems = items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      );
      setItems(updatedItems);
      localStorage.setItem('menu_items', JSON.stringify(updatedItems));
      
      toast({
        title: "Éxito",
        description: "Elemento del menú actualizado correctamente",
      });
      
      setIsEditing(false);
      setSelectedItem(null);
      setFormData({
        name: { en: '', es: '' },
        description: { en: '', es: '' },
        price: '',
        category: '',
        isPopular: false,
        isVegetarian: false,
        ingredients: [],
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al actualizar el elemento",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      setLoading(true);
      const newItem: MenuItem = {
        id: Date.now().toString(),
        ...formData as MenuItem
      };
      
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      localStorage.setItem('menu_items', JSON.stringify(updatedItems));
      
      toast({
        title: "Éxito",
        description: "Nuevo elemento añadido al menú",
      });
      
      setIsEditing(false);
      setFormData({
        name: { en: '', es: '' },
        description: { en: '', es: '' },
        price: '',
        category: '',
        isPopular: false,
        isVegetarian: false,
        ingredients: [],
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al añadir el elemento",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este elemento?')) return;
    
    try {
      setLoading(true);
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      localStorage.setItem('menu_items', JSON.stringify(updatedItems));
      
      toast({
        title: "Éxito",
        description: "Elemento eliminado correctamente",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al eliminar el elemento",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    toast({
      title: "Sesión cerrada",
      description: "Ha cerrado sesión correctamente",
    });
    navigate('/admin');
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-peru-beige/10">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-peru-red animate-spin" />
          <p className="mt-2 text-peru-brown">Cargando elementos del menú...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-peru-beige/10 pb-10">
      <header className="bg-white shadow-sm py-4 px-6 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-peru-red flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="font-title text-xl font-bold text-peru-brown">Panel de Administración</span>
          </div>
          <button
            onClick={signOut}
            className="bg-peru-red text-white px-4 py-2 rounded hover:bg-peru-terracotta transition-colors flex items-center gap-2"
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-title text-peru-brown">Gestión del Menú</h1>
          <button
            className="bg-peru-red text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-peru-terracotta transition-colors"
            onClick={() => setIsEditing(true)}
          >
            <Plus size={18} /> Añadir Elemento
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">No hay elementos en el menú. ¡Añade algunos!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-title text-lg text-peru-brown">{item.name.es}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-peru-ochre font-semibold">{item.price}</div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.description.es}
                </p>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setFormData(item);
                      setIsEditing(true);
                    }}
                    className="text-peru-red hover:text-peru-terracotta transition-colors flex items-center gap-1"
                  >
                    <Edit size={16} /> Editar
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                  >
                    <Trash size={16} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de edición */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-title text-peru-brown mb-4">
              {selectedItem ? 'Editar elemento' : 'Añadir nuevo elemento'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre (Español)
                </label>
                <input
                  type="text"
                  value={formData.name?.es || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    name: { ...formData.name, es: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre (English)
                </label>
                <input
                  type="text"
                  value={formData.name?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    name: { ...formData.name, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (Español)
                </label>
                <textarea
                  value={formData.description?.es || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, es: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (English)
                </label>
                <textarea
                  value={formData.description?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio
                </label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    category: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="starters">Entradas</option>
                  <option value="mainDish">Plato Principal</option>
                  <option value="desserts">Postres</option>
                  <option value="drinks">Bebidas</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isPopular || false}
                    onChange={(e) => setFormData({
                      ...formData,
                      isPopular: e.target.checked
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Popular</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isVegetarian || false}
                    onChange={(e) => setFormData({
                      ...formData,
                      isVegetarian: e.target.checked
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Vegetariano</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedItem(null);
                  setFormData({
                    name: { en: '', es: '' },
                    description: { en: '', es: '' },
                    price: '',
                    category: '',
                    isPopular: false,
                    isVegetarian: false,
                    ingredients: [],
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => selectedItem 
                  ? handleUpdateItem(selectedItem.id, formData)
                  : handleAddItem()
                }
                className="px-4 py-2 bg-peru-red text-white rounded hover:bg-peru-terracotta transition-colors"
              >
                {selectedItem ? 'Actualizar' : 'Añadir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
