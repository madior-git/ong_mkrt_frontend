// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérification unique au montage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log('🔍 Vérification auth:', { token: !!token, storedUser: !!storedUser });
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          console.log('✅ Utilisateur connecté:', userData.username);
        } catch (e) {
          console.error('❌ Erreur parsing user');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        console.log('❌ Aucun utilisateur connecté');
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('📤 Tentative de connexion...');
      
      const response = await api.post('/auth/login', { email, password });
      console.log('✅ Réponse:', response.data);
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      toast.success('Connexion réussie');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur de connexion');
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    // Redirection immédiate sans passer par React Router
    window.location.href = '/login';
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}