import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { ContactMessage } from '@/types';
import toast from 'react-hot-toast';

export function useMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/contact');
      setMessages(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await api.patch(`/contact/${id}/read`);
      setMessages(messages.map(m => 
        m.id === id ? { ...m, is_read: true } : m
      ));
      toast.success('Message marqué comme lu');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      await api.delete(`/contact/${id}`);
      setMessages(messages.filter(m => m.id !== id));
      toast.success('Message supprimé');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      throw error;
    }
  };

  return {
    messages,
    loading,
    markAsRead,
    deleteMessage,
    refresh: fetchMessages,
    unreadCount: messages.filter(m => !m.is_read).length
  };
}