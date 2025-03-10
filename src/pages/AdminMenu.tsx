
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';
import { MenuItem } from '@/data/menuData';

const AdminMenu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchMenuItems();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin');
    }
  };

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*');

      if (error) throw error;

      setItems(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching menu items",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Menu item updated successfully",
      });
      
      fetchMenuItems();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating menu item",
        description: error.message,
      });
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-title text-peru-brown">Menu Administration</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-peru-red text-white px-4 py-2 rounded hover:bg-peru-terracotta transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-title text-lg text-peru-brown">{item.name.en}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
              <div className="text-peru-ochre font-semibold">{item.price}</div>
            </div>
            
            {/* Add edit functionality here */}
            <button
              onClick={() => {
                // Implement edit modal/form
              }}
              className="mt-4 text-peru-red hover:text-peru-terracotta transition-colors"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
