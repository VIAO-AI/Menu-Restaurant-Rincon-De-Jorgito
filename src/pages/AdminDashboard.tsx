
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash, Loader2, LogOut, Upload, RefreshCw } from 'lucide-react';
import type { MenuItem } from '@/types/menu';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, uploadMenuItemImage } from '@/lib/api';

const AdminDashboard = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: { en: '', es: '' },
    description: { en: '', es: '' },
    price: '',
    category: '',
    isPopular: false,
    isVegetarian: false,
    ingredients: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchMenuItems();
  }, [navigate]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const data = await getMenuItems();
      setItems(data);
    } catch (error: any) {
      console.error('Error fetching menu items:', error);
      toast({
        variant: "destructive",
        title: "Error al cargar el menú",
        description: error.message || "No se pudo cargar el menú",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshMenuItems = async () => {
    try {
      setRefreshing(true);
      await fetchMenuItems();
      toast({
        title: "Menú actualizado",
        description: "El menú se ha actualizado correctamente",
      });
    } catch (error) {
      console.error('Error refreshing menu:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      setLoading(true);
      
      // If there's a new image, upload it first
      if (imageFile) {
        setUploadingImage(true);
        const imageUrl = await uploadMenuItemImage(imageFile);
        setUploadingImage(false);
        
        if (imageUrl) {
          updates.image = imageUrl;
        } else {
          throw new Error('Error al subir la imagen');
        }
      }
      
      const updatedItem = await updateMenuItem(id, updates);
      
      if (updatedItem) {
        const updatedItems = items.map(item => 
          item.id === id ? updatedItem : item
        );
        setItems(updatedItems);
        
        toast({
          title: "Éxito",
          description: "Elemento del menú actualizado correctamente",
        });
        
        setIsEditing(false);
        setSelectedItem(null);
        resetForm();
      } else {
        throw new Error('Error al actualizar el elemento');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al actualizar el elemento",
        description: error.message || "No se pudo actualizar el elemento",
      });
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const handleAddItem = async () => {
    try {
      setLoading(true);
      
      // First, check if we have the required fields
      if (!formData.name?.en || !formData.name?.es || !formData.price || !formData.category) {
        throw new Error('Por favor complete todos los campos obligatorios');
      }
      
      let imageUrl = null;
      
      // If there's an image, upload it first
      if (imageFile) {
        setUploadingImage(true);
        imageUrl = await uploadMenuItemImage(imageFile);
        setUploadingImage(false);
        
        if (!imageUrl) {
          throw new Error('Error al subir la imagen');
        }
      }
      
      const newItemData = {
        ...formData,
        image: imageUrl || undefined
      } as Omit<MenuItem, 'id'>;
      
      const newItem = await addMenuItem(newItemData);
      
      if (newItem) {
        setItems([...items, newItem]);
        
        toast({
          title: "Éxito",
          description: "Nuevo elemento añadido al menú",
        });
        
        setIsEditing(false);
        resetForm();
      } else {
        throw new Error('Error al añadir el elemento');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al añadir el elemento",
        description: error.message || "No se pudo añadir el elemento",
      });
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este elemento?')) return;
    
    try {
      setLoading(true);
      const success = await deleteMenuItem(id);
      
      if (success) {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        
        toast({
          title: "Éxito",
          description: "Elemento eliminado correctamente",
        });
      } else {
        throw new Error('Error al eliminar el elemento');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al eliminar el elemento",
        description: error.message || "No se pudo eliminar el elemento",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: { en: '', es: '' },
      description: { en: '', es: '' },
      price: '',
      category: '',
      isPopular: false,
      isVegetarian: false,
      ingredients: [],
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const signOut = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    toast({
      title: "Sesión cerrada",
      description: "Ha cerrado sesión correctamente",
    });
    navigate('/admin/login');
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
          <div className="flex items-center gap-4">
            <button 
              onClick={refreshMenuItems}
              disabled={refreshing}
              className="bg-peru-ochre text-white px-4 py-2 rounded hover:bg-peru-ochre/80 transition-colors flex items-center gap-2"
            >
              {refreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              Actualizar
            </button>
            <button
              onClick={signOut}
              className="bg-peru-red text-white px-4 py-2 rounded hover:bg-peru-terracotta transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-title text-peru-brown">Gestión del Menú</h1>
          <button
            className="bg-peru-red text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-peru-terracotta transition-colors"
            onClick={() => {
              setIsEditing(true);
              setSelectedItem(null);
              resetForm();
            }}
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
                
                {item.image && (
                  <div className="relative h-32 mb-3 overflow-hidden rounded">
                    <img 
                      src={item.image} 
                      alt={item.name.es} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.description.es}
                </p>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setFormData(item);
                      setImagePreview(item.image || null);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-title text-peru-brown mb-4">
              {selectedItem ? 'Editar elemento' : 'Añadir nuevo elemento'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre (Español) *
                </label>
                <input
                  type="text"
                  value={formData.name?.es || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    name: { ...formData.name, es: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre (English) *
                </label>
                <input
                  type="text"
                  value={formData.name?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    name: { ...formData.name, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
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
                  Precio *
                </label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="$0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    category: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="peruvian-drinks">Bebidas Peruanas</option>
                  <option value="beverages">Bebidas</option>
                  <option value="sides">Acompañamientos</option>
                  <option value="appetizers">Entradas</option>
                  <option value="soup">Sopas</option>
                  <option value="cold-dishes">Platos Fríos</option>
                  <option value="main-dish">Platos Principales</option>
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
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen del Platillo
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <label className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Upload size={16} className="mr-2" />
                    <span>Subir imagen</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <span className="text-sm text-gray-500">
                    {imageFile ? imageFile.name : 'Ningún archivo seleccionado'}
                  </span>
                </div>
                
                {(imagePreview || formData.image) && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 mb-1">Vista previa:</p>
                    <div className="relative h-40 w-40 overflow-hidden rounded">
                      <img 
                        src={imagePreview || formData.image} 
                        alt="Vista previa" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredientes (separados por coma)
                </label>
                <input
                  type="text"
                  value={formData.ingredients?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    ingredients: e.target.value.split(',').map(i => i.trim()).filter(i => i)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ají, cebolla, limón, etc."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedItem(null);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                disabled={loading || uploadingImage}
              >
                Cancelar
              </button>
              <button
                onClick={() => selectedItem 
                  ? handleUpdateItem(selectedItem.id, formData)
                  : handleAddItem()
                }
                disabled={loading || uploadingImage}
                className="px-4 py-2 bg-peru-red text-white rounded hover:bg-peru-terracotta transition-colors flex items-center disabled:opacity-70"
              >
                {loading || uploadingImage ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    {uploadingImage ? 'Subiendo imagen...' : 'Procesando...'}
                  </>
                ) : (
                  selectedItem ? 'Actualizar' : 'Añadir'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
