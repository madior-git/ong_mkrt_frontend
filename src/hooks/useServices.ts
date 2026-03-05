// src/hooks/useServices.ts 
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  image_url?: string;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Définir fetchServices en premier pour qu'il soit disponible partout
  const fetchServices = async () => {
    try {
      console.log('📡 Récupération des services...');
      const response = await api.get('/services');
      console.log('✅ Services reçus:', response.data);
      setServices(response.data);
    } catch (error) {
      console.error('❌ Erreur chargement services:', error);
      toast.error('Erreur lors du chargement des services');
    } finally {
      setLoading(false);
    }
  };

  // Appeler fetchServices au montage
  useEffect(() => {
    fetchServices();
  }, []);

  const createService = async (data: any) => {
    try {
      const response = await api.post('/services', data);
      toast.success('Service créé');
      fetchServices();
      return response.data;
    } catch (error) {
      toast.error('Erreur création');
      throw error;
    }
  };

  const updateService = async (id: number, data: any) => {
    try {
      const response = await api.put(`/services/${id}`, data);
      toast.success('Service modifié');
      fetchServices();
      return response.data;
    } catch (error) {
      toast.error('Erreur modification');
      throw error;
    }
  };

  const deleteService = async (id: number) => {
    try {
      await api.delete(`/services/${id}`);
      toast.success('Service supprimé');
      fetchServices();
    } catch (error) {
      toast.error('Erreur suppression');
      throw error;
    }
  };

  return { 
    services,
    loading,
    createService,
    updateService,
    deleteService,
    refresh: fetchServices
  };
}