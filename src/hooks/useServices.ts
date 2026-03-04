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

  useEffect(() => {
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

    fetchServices();
  }, []);

  return { services, loading };
}