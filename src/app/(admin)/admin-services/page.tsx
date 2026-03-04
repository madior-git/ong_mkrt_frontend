// src/app/(admin)/admin-services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';


interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      toast.error('Erreur chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await api.put(`/services/${editingService.id}`, formData);
        toast.success('Service modifié');
      } else {
        await api.post('/services', formData);
        toast.success('Service créé');
      }
      setShowForm(false);
      setEditingService(null);
      setFormData({ title: '', description: '', icon: '' });
      fetchServices();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Supprimer ce service ?')) {
      try {
        await api.delete(`/services/${id}`);
        toast.success('Service supprimé');
        fetchServices();
      } catch (error) {
        toast.error('Erreur suppression');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-black font-bold">Gestion des services</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nouveau service
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl text-black font-bold mb-4">
              {editingService ? 'Modifier' : 'Nouveau'} service
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Titre"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full text-black border p-2 rounded"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full text-black border p-2 rounded"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  placeholder="Icône (emoji ou classe CSS)"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full text-black border p-2 rounded"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingService(null);
                    setFormData({ title: '', description: '', icon: '' });
                  }}
                    className="px-4 py-2 rounded bg-yellow-300 hover:bg-yellow-400 text-gray-800 transition-colors"

                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {editingService ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-black text-left">Icône</th>
              <th className="px-6 py-3 text-black text-left">Titre</th>
              <th className="px-6 py-3 text-black text-left">Description</th>
              <th className="px-6 py-3 text-black text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t">
                <td className="px-6 py-4 text-2xl">{service.icon || '📌'}</td>
                <td className="px-6 text-black py-4">{service.title}</td>
                <td className="px-6 text-black py-4">{service.description}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setFormData(service);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}