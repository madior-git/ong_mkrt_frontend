// src/app/(admin)/dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activites: 0,
    services: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [activites, services, messages] = await Promise.all([
          api.get('/activities'),
          api.get('/services'),
          api.get('/contacts')
        ]);

        setStats({
          activites: activites.data.length,
          services: services.data.length,
          messages: messages.data.length
        });
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Activités</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.activites}</p>
          <Link href="/admin-activites" className="text-sm text-blue-500 hover:underline mt-2 block">
            Gérer →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Services</h3>
          <p className="text-3xl font-bold text-green-600">{stats.services}</p>
          <Link href="/admin-services" className="text-sm text-green-500 hover:underline mt-2 block">
            Gérer →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Messages</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.messages}</p>
          <Link href="/admin-messages" className="text-sm text-purple-500 hover:underline mt-2 block">
            Voir →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl text-black font-semibold mb-4">Bienvenue, {user?.username} !</h2>
        <p className="text-black-600">
          Vous êtes connecté en tant qu'administrateur. Utilisez le menu pour gérer le contenu du site.
        </p>
      </div>
    </div>
  );
}