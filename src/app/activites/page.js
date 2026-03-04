'use client';

import { useActivities } from '@/hooks/useActivities';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ActivitiesPage() {
  const { activities, loading } = useActivities();

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
        <h1 className="text-4xl font-bold text-center text-black mb-12">Nos Activités</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {activity.image_url && (
                <div className="relative h-48">
                  <Image
                    src={`http://localhost:5000${activity.image_url}`}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-black mb-2">{activity.title}</h2>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {activity.location}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(activity.date), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <p className="text-center text-gray-500">Aucune activité pour le moment.</p>
        )}
      </div>
    </div>
  );
}