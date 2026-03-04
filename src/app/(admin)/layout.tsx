// src/app/(admin)/layout.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();

  // Redirection si non connecté
  useEffect(() => {
    if (!loading && !user) {
      console.log('❌ Non connecté, redirection.');
      window.location.replace('/login');
    }
  }, [user, loading]);

  // Pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si pas connecté, on ne rend rien (la redirection va se faire)
  if (!user) {
    return null;
  }

  // Utilisateur connecté, on affiche le layout
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-blue-600">ONG Admin</h1>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/admin-activites" className="text-gray-700 hover:text-blue-600">
                Activités
              </Link>
              <Link href="/admin-services" className="text-gray-700 hover:text-blue-600">
                Services
              </Link>
              <Link href="/admin-messages" className="text-gray-700 hover:text-blue-600">
                Messages
              </Link>
            </div>
            <div className="flex text-black items-center">
              <span className="mr-4">{user.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}