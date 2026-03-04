'use client';

import { useServices } from '@/hooks/useServices';
import { CogIcon } from '@heroicons/react/24/outline';

export default function ServicesPage() {
  const { services, loading } = useServices();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Nos Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CogIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <p className="text-center text-gray-500">Aucun service pour le moment.</p>
        )}
      </div>
    </div>
  );
}