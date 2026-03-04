// src/app/(admin)/admin-messages/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';


interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/contacts');
      setMessages(response.data);
    } catch (error) {
      toast.error('Erreur chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Supprimer ce message ?')) {
      try {
        await api.delete(`/contacts/${id}`);
        toast.success('Message supprimé');
        fetchMessages();
      } catch (error) {
        toast.error('Erreur suppression');
      }
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await api.put(`/contacts/${id}/read`);
      fetchMessages();
    } catch (error) {
      console.error('Erreur');
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl text-black font-bold mb-6">Messages reçus</h1>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl text-black font-bold mb-4">{selectedMessage.subject}</h2>
            <p className="text-sm text-gray-600 mb-2">
              De: {selectedMessage.name} ({selectedMessage.email})
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(selectedMessage.created_at).toLocaleString('fr-FR')}
            </p>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-green-200 text-white rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-black text-left">Date</th>
              <th className="px-6 py-3 text-black text-left">Nom</th>
              <th className="px-6 py-3 text-black text-left">Email</th>
              <th className="px-6 py-3 text-black text-left">Sujet</th>
              <th className="px-6 py-3 text-black text-left">Statut</th>
              <th className="px-6 py-3 text-black text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-t hover:bg-gray-50">
                <td className="px-6 text-black py-4">
                  {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 text-black py-4">{msg.name}</td>
                <td className="px-6 text-black py-4">{msg.email}</td>
                <td className="px-6 text-black py-4">{msg.subject || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    msg.status === 'read' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {msg.status === 'read' ? 'Lu' : 'Non lu'}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status !== 'read') {
                        markAsRead(msg.id);
                      }
                    }}
                    className="text-green-600 hover:text-green-900"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
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