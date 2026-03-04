// src/hooks/useActivities.ts
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await api.get('/activities');
      let data = response.data;
      
      // Gérer différents formats de réponse
      if (data.data && Array.isArray(data.data)) {
        data = data.data;
      } else if (!Array.isArray(data)) {
        data = [];
      }
      
      setActivities(data);
      setError(null);
    } catch (err) {
      console.error('Erreur fetchActivities:', err);
      setError('Impossible de charger les activités');
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const createActivity = async (formData: FormData) => {
    try {
      const response = await api.post('/activities', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setActivities(prev => [response.data, ...prev]);
      toast.success('Activité créée avec succès');
      return response.data;
    } catch (err) {
      toast.error('Erreur lors de la création');
      throw err;
    }
  };

  const updateActivity = async (id: number, formData: FormData) => {
    try {
      const response = await api.put(`/activities/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setActivities(prev => prev.map(a => a.id === id ? response.data : a));
      toast.success('Activité mise à jour');
      return response.data;
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
      throw err;
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      await api.delete(`/activities/${id}`);
      setActivities(prev => prev.filter(a => a.id !== id));
      toast.success('Activité supprimée');
    } catch (err) {
      toast.error('Erreur lors de la suppression');
      throw err;
    }
  };

  return {
    activities,
    loading,
    error,
    createActivity,
    updateActivity,
    deleteActivity,
    refresh: fetchActivities
  };
}