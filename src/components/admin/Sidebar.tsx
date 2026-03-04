// src/components/admin/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  HomeIcon, 
  CalendarIcon, 
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Activités', href: '/admin-activites', icon: CalendarIcon },
  { name: 'Services', href: '/admin-services', icon: WrenchScrewdriverIcon },
  { name: 'Messages', href: '/admin-messages', icon: EnvelopeIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      {/* En-tête */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-blue-600">ONG MKRT</h2>
        <p className="text-sm text-gray-600 mt-1">Espace Admin</p>
        {user && (
          <p className="text-xs text-gray-500 mt-2">
            Connecté en tant que <span className="font-medium">{user.name}</span>
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}