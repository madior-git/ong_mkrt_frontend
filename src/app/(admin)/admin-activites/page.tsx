// src/app/(admin)/admin-activites/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';


interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  image_url?: string;
}

export default function AdminActivites() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get('/activities');
      setActivities(response.data);
    } catch (error) {
      toast.error('Erreur chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingActivity) {
        await api.put(`/activities/${editingActivity.id}`, formData);
        toast.success('Activité modifiée');
      } else {
        await api.post('/activities', formData);
        toast.success('Activité créée');
      }
      setShowForm(false);
      setEditingActivity(null);
      setFormData({ title: '', description: '', date: '', location: '' });
      fetchActivities();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Supprimer cette activité ?')) {
      try {
        await api.delete(`/activities/${id}`);
        toast.success('Activité supprimée');
        fetchActivities();
      } catch (error) {
        toast.error('Erreur suppression');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-black font-bold">Gestion des activités</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nouvelle activité
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl text-black font-bold mb-4">
              {editingActivity ? 'Modifier' : 'Nouvelle'} activité
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Titre"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border text-black p-2 rounded"
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
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full text-black border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Lieu"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full text-black border p-2 rounded"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingActivity(null);
                    setFormData({ title: '', description: '', date: '', location: '' });
                  }}
                  className="px-4 py-2 rounded bg-yellow-300 hover:bg-yellow-400 text-gray-800 transition-colors"

                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editingActivity ? 'Modifier' : 'Créer'}
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
              <th className="px-6 py-3 text-black text-left">Titre</th>
              <th className="px-6 py-3 text-black text-left">Date</th>
              <th className="px-6 py-3 text-black text-left">Lieu</th>
              <th className="px-6 py-3 text-black text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-t">
                <td className="px-6 text-black py-4">{activity.title}</td>
                <td className="px-6 text-black py-4">{new Date(activity.date).toLocaleDateString('fr-FR')}</td>
                <td className="px-6 text-black py-4">{activity.location || '-'}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setEditingActivity(activity);
                      //setFormData(activity);
                      setFormData({
                        title: activity.title,
                        description: activity.description,
                        date: activity.date,
                        location: activity.location || ''
                      });
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 p-2 rounded transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 hover:text-red-900 p-2 rounded transition-colors"
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