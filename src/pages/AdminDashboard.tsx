import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, Edit, Trash, Loader2, LogOut, Upload, RefreshCw, Globe, Link } from 'lucide-react';
import type { MenuItem } from '@/types/menu';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, uploadMenuItemImage } from '@/lib/api';
import { categories } from '@/data/menuData';

const AdminDashboard = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [useImageUrl, setUseImageUrl] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: { en: '', es: '' },
    description: { en: '', es: '' },
    price: '',
    category: '',
    isPopular: false,
    isVegetarian: false,
    ingredients: [],
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language, setLanguage, translate } = useLanguage();

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
        title: language === 'en' ? "Error loading menu" : "Error al cargar el menú",
        description: error.message || (language === 'en' ? "Could not load menu" : "No se pudo cargar el menú"),
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
        title: language === 'en' ? "Menu updated" : "Menú actualizado",
        description: language === 'en' ? "The menu has been updated successfully" : "El menú se ha actualizado correctamente",
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
    setUseImageUrl(false);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    if (e.target.value) {
      setImagePreview(e.target.value);
      setUseImageUrl(true);
      setImageFile(null);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      setLoading(true);
      
      // Handle image upload or image URL
      if (useImageUrl && imageUrl) {
        updates.image = imageUrl;
      } else if (imageFile) {
        setUploadingImage(true);
        const uploadedImageUrl = await uploadMenuItemImage(imageFile);
        setUploadingImage(false);
        
        if (uploadedImageUrl) {
          updates.image = uploadedImageUrl;
        } else {
          throw new Error(language === 'en' ? 'Error uploading image' : 'Error al subir la imagen');
        }
      }
      
      const updatedItem = await updateMenuItem(id, updates);
      
      if (updatedItem) {
        const updatedItems = items.map(item => 
          item.id === id ? updatedItem : item
        );
        setItems(updatedItems);
        
        toast({
          title: language === 'en' ? "Success" : "Éxito",
          description: language === 'en' ? "Menu item updated successfully" : "Elemento del menú actualizado correctamente",
        });
        
        setIsEditing(false);
        setSelectedItem(null);
        resetForm();
      } else {
        throw new Error(language === 'en' ? 'Error updating item' : 'Error al actualizar el elemento');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error updating item" : "Error al actualizar el elemento",
        description: error.message || (language === 'en' ? "Could not update item" : "No se pudo actualizar el elemento"),
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
        throw new Error(language === 'en' ? 'Please fill all required fields' : 'Por favor complete todos los campos obligatorios');
      }
      
      let finalImageUrl = null;
      
      // Handle image upload or image URL
      if (useImageUrl && imageUrl) {
        finalImageUrl = imageUrl;
      } else if (imageFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadMenuItemImage(imageFile);
        setUploadingImage(false);
        
        if (!finalImageUrl) {
          throw new Error(language === 'en' ? 'Error uploading image' : 'Error al subir la imagen');
        }
      }
      
      const newItemData = {
        ...formData,
        image: finalImageUrl || undefined
      } as Omit<MenuItem, 'id'>;
      
      const newItem = await addMenuItem(newItemData);
      
      if (newItem) {
        setItems([...items, newItem]);
        
        toast({
          title: language === 'en' ? "Success" : "Éxito",
          description: language === 'en' ? "New item added to the menu" : "Nuevo elemento añadido al menú",
        });
        
        setIsEditing(false);
        resetForm();
      } else {
        throw new Error(language === 'en' ? 'Error adding item' : 'Error al añadir el elemento');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error adding item" : "Error al añadir el elemento",
        description: error.message || (language === 'en' ? "Could not add item" : "No se pudo añadir el elemento"),
      });
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    const confirmMessage = language === 'en' 
      ? 'Are you sure you want to delete this item?' 
      : '¿Estás seguro de que deseas eliminar este elemento?';
      
    if (!confirm(confirmMessage)) return;
    
    try {
      setLoading(true);
      const success = await deleteMenuItem(id);
      
      if (success) {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        
        toast({
          title: language === 'en' ? "Success" : "Éxito",
          description: language === 'en' ? "Item deleted successfully" : "Elemento eliminado correctamente",
        });
      } else {
        throw new Error(language === 'en' ? 'Error deleting item' : 'Error al eliminar el elemento');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error deleting item" : "Error al eliminar el elemento",
        description: error.message || (language === 'en' ? "Could not delete item" : "No se pudo eliminar el elemento"),
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
      image: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setImageUrl('');
    setUseImageUrl(false);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUrl('');
    setUseImageUrl(false);
    
    if (selectedItem && isEditing) {
      setFormData({
        ...formData,
        image: undefined
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const signOut = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    toast({
      title: language === 'en' ? "Signed out" : "Sesión cerrada",
      description: language === 'en' ? "You have been signed out successfully" : "Ha cerrado sesión correctamente",
    });
    navigate('/admin/login');
  };

  const getCategoryItems = (categoryId: string) => {
    if (categoryId === 'all') {
      return items;
    }
    return items.filter(item => item.category === categoryId);
  };

  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'all') {
      return language === 'en' ? 'All Categories' : 'Todas las Categorías';
    }
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name[language as keyof typeof category.name] : categoryId;
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-peru-beige/10">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-peru-red animate-spin" />
          <p className="mt-2 text-peru-brown">
            {language === 'en' ? 'Loading menu items...' : 'Cargando elementos del menú...'}
          </p>
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
            <span className="font-title text-xl font-bold text-peru-brown">
              {language === 'en' ? 'Admin Dashboard' : 'Panel de Administración'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="bg-peru-brown text-white px-4 py-2 rounded hover:bg-peru-brown/80 transition-colors flex items-center gap-2"
            >
              <Globe size={16} />
              {language === 'en' ? 'Español' : 'English'}
            </button>
            <button 
              onClick={refreshMenuItems}
              disabled={refreshing}
              className="bg-peru-ochre text-white px-4 py-2 rounded hover:bg-peru-ochre/80 transition-colors flex items-center gap-2"
            >
              {refreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              {language === 'en' ? 'Refresh' : 'Actualizar'}
            </button>
            <button
              onClick={signOut}
              className="bg-peru-red text-white px-4 py-2 rounded hover:bg-peru-terracotta transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              {language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-title text-peru-brown">
            {language === 'en' ? 'Menu Management' : 'Gestión del Menú'}
          </h1>
          <button
            className="bg-peru-red text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-peru-terracotta transition-colors"
            onClick={() => {
              setIsEditing(true);
              setSelectedItem(null);
              resetForm();
            }}
          >
            <Plus size={18} /> 
            {language === 'en' ? 'Add Item' : 'Añadir Elemento'}
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <h2 className="text-lg font-medium text-peru-brown mb-3">
            {language === 'en' ? 'Filter by Category' : 'Filtrar por Categoría'}
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full text-sm ${
                activeCategory === 'all' 
                  ? 'bg-peru-red text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? 'All Categories' : 'Todas las Categorías'}
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  activeCategory === category.id 
                    ? 'bg-peru-red text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name[language as keyof typeof category.name]}
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">
              {language === 'en' 
                ? 'No items in the menu. Add some!' 
                : 'No hay elementos en el menú. ¡Añade algunos!'}
            </p>
          </div>
        ) : (
          <>
            {activeCategory === 'all' ? (
              categories.map(category => {
                const categoryItems = items.filter(item => item.category === category.id);
                if (categoryItems.length === 0) return null;
                
                return (
                  <div key={category.id} className="mb-10">
                    <h2 className="text-xl font-title text-peru-brown mb-4 border-b border-peru-beige/50 pb-2">
                      {category.name[language as keyof typeof category.name]}
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {categoryItems.map((item) => (
                        <div key={item.id} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-title text-lg text-peru-brown">
                                {item.name[language as keyof typeof item.name]}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {getCategoryName(item.category)}
                              </p>
                            </div>
                            <div className="text-peru-ochre font-semibold">{item.price}</div>
                          </div>
                          
                          {item.image && (
                            <div className="relative h-32 mb-3 overflow-hidden rounded">
                              <img 
                                src={item.image} 
                                alt={item.name[language as keyof typeof item.name]} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {item.description[language as keyof typeof item.description]}
                          </p>
                          
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setFormData(item);
                                setImagePreview(item.image || null);
                                if (item.image) {
                                  const isURL = item.image.startsWith('http');
                                  if (isURL) {
                                    setImageUrl(item.image);
                                    setUseImageUrl(true);
                                  }
                                }
                                setIsEditing(true);
                              }}
                              className="text-peru-red hover:text-peru-terracotta transition-colors flex items-center gap-1"
                            >
                              <Edit size={16} /> {language === 'en' ? 'Edit' : 'Editar'}
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                            >
                              <Trash size={16} /> {language === 'en' ? 'Delete' : 'Eliminar'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getCategoryItems(activeCategory).map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-title text-lg text-peru-brown">
                          {item.name[language as keyof typeof item.name]}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {getCategoryName(item.category)}
                        </p>
                      </div>
                      <div className="text-peru-ochre font-semibold">{item.price}</div>
                    </div>
                    
                    {item.image && (
                      <div className="relative h-32 mb-3 overflow-hidden rounded">
                        <img 
                          src={item.image} 
                          alt={item.name[language as keyof typeof item.name]} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description[language as keyof typeof item.description]}
                    </p>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setFormData(item);
                          setImagePreview(item.image || null);
                          if (item.image) {
                            const isURL = item.image.startsWith('http');
                            if (isURL) {
                              setImageUrl(item.image);
                              setUseImageUrl(true);
                            }
                          }
                          setIsEditing(true);
                        }}
                        className="text-peru-red hover:text-peru-terracotta transition-colors flex items-center gap-1"
                      >
                        <Edit size={16} /> {language === 'en' ? 'Edit' : 'Editar'}
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                      >
                        <Trash size={16} /> {language === 'en' ? 'Delete' : 'Eliminar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-title text-peru-brown mb-4">
              {selectedItem 
                ? (language === 'en' ? 'Edit Item' : 'Editar Elemento') 
                : (language === 'en' ? 'Add New Item' : 'Añadir Nuevo Elemento')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Name (Spanish) *' : 'Nombre (Español) *'}
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
                  {language === 'en' ? 'Name (English) *' : 'Nombre (Inglés) *'}
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
                  {language === 'en' ? 'Description (Spanish)' : 'Descripción (Español)'}
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
                  {language === 'en' ? 'Description (English)' : 'Descripción (Inglés)'}
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
                  {language === 'en' ? 'Price *' : 'Precio *'}
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
                  {language === 'en' ? 'Category *' : 'Categoría *'}
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
                  <option value="">
                    {language === 'en' ? 'Select category' : 'Seleccionar categoría'}
                  </option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name[language as keyof typeof category.name]}
                    </option>
                  ))}
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
                  <span className="text-sm text-gray-700">
                    {language === 'en' ? 'Popular' : 'Popular'}
                  </span>
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
                  <span className="text-sm text-gray-700">
                    {language === 'en' ? 'Vegetarian' : 'Vegetariano'}
                  </span>
                </label>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Dish Image' : 'Imagen del Platillo'}
                </label>
                
                <div className="mt-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="imageSource"
                        checked={!useImageUrl}
                        onChange={() => setUseImageUrl(false)}
                      />
                      <span className="ml-2">
                        {language === 'en' ? 'Upload Image' : 'Subir Imagen'}
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="imageSource"
                        checked={useImageUrl}
                        onChange={() => setUseImageUrl(true)}
                      />
                      <span className="ml-2">
                        {language === 'en' ? 'Image URL' : 'URL de Imagen'}
                      </span>
                    </label>
                  </div>
                  
                  {!useImageUrl ? (
                    <div className="mt-1 flex items-center gap-4">
                      <label className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <Upload size={16} className="mr-2" />
                        <span>{language === 'en' ? 'Upload image' : 'Subir imagen'}</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <span className="text-sm text-gray-500">
                        {imageFile 
                          ? imageFile.name 
                          : (language === 'en' ? 'No file selected' : 'Ningún archivo seleccionado')}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Link size={16} className="text-gray-400 mr-2" />
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={handleImageUrlChange}
                            placeholder={language === 'en' ? 'Enter image URL' : 'Introduce URL de imagen'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {language === 'en' 
                            ? 'Example: https://images.unsplash.com/photo-1...' 
                            : 'Ejemplo: https://images.unsplash.com/photo-1...'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {imagePreview && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-700">
                        {language === 'en' ? 'Preview:' : 'Vista previa:'}
                      </p>
                      <button 
                        onClick={removeImage}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        {language === 'en' ? 'Remove image' : 'Eliminar imagen'}
                      </button>
                    </div>
                    <div className="relative h-40 w-40 overflow-hidden rounded">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Ingredients (comma separated)' : 'Ingredientes (separados por coma)'}
                </label>
                <input
                  type="text"
                  value={formData.ingredients?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    ingredients: e.target.value.split(',').map(i => i.trim()).filter(i => i)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={language === 'en' ? 'Chili, onion, lemon, etc.' : 'Ají, cebolla, limón, etc.'}
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
                {language === 'en' ? 'Cancel' : 'Cancelar'}
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
                    {uploadingImage 
                      ? (language === 'en' ? 'Uploading image...' : 'Subiendo imagen...') 
                      : (language === 'en' ? 'Processing...' : 'Procesando...')}
                  </>
                ) : (
                  selectedItem 
                    ? (language === 'en' ? 'Update' : 'Actualizar') 
                    : (language === 'en' ? 'Add' : 'Añadir')
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
