#  Frontend - ONG 
  Application web moderne développée avec Next.js 14 pour une organisation non gouvernementale. Interface utilisateur responsive, authentification sécurisée et administration complète.

   Démo en ligne : https://ong-mkrt-nr0x.onrender.com/

   DASHBOARD     : https://ong-mkrt-nr0x.onrender.com/dashboard

 #  Aperçu
   Interface publique et administration pour l'ONG  permettant de :

  Présenter les activités et services

  Gérer le contenu via un dashboard sécurisé

  Recevoir et gérer les messages de contact

# Fonctionnalités
Côté Public
   Page d'accueil : Présentation de l'ONG

   Activités : Liste des activités avec images

   Services : Présentation des services

   Contact : Formulaire avec validation

   Login : Accès administrateur

# Côté Administration
   Dashboard : Vue d'ensemble

   Gestion activités : CRUD complet avec images

   Gestion services : CRUD avec icônes

   Messages : Consultation et gestion

   Protection des routes : Authentification JWT


#  Technologies Utilisées


   - Next.js

   - Tailwind CSS

   - Axios

   - Heroicons

   - React Hook Form

# Structure du Projet
   ong-mkrt-frontend/
├── 📁 src/
│   ├── 📁 app/                    # App Router
│   │   ├── 📁 (public)/           # Routes publiques
│   │   │   ├── page.tsx           # Accueil
│   │   │   └── layout.tsx
│   │   │
│   │   ├── 📁 (admin)/            # Routes admin (protégées)
│   │   │   ├── 📁 dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁 admin-activites/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁 admin-services/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁 admin-messages/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── 📁 activites/           # Page publique activités
│   │   │   └── page.tsx
│   │   ├── 📁 services/            # Page publique services
│   │   │   └── page.tsx
│   │   ├── 📁 contact/             # Page contact
│   │   │   └── page.tsx
│   │   ├── 📁 login/               # Page connexion
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx              # Layout racine
│   │   └── globals.css             # Styles globaux
│   │
│   ├── 📁 components/               # Composants réutilisables
│   │   ├── 📁 common/               # Navbar, Footer
│   │   ├── 📁 forms/                # ContactForm
│   │   └── 📁 admin/                # Sidebar
│   │
│   ├── 📁 hooks/                    # Hooks personnalisés
│   │   ├── useAuth.ts
│   │   ├── useActivities.ts
│   │   └── useServices.ts
│   │
│   ├── 📁 lib/                       # Configuration API
│   │   └── api.ts
│   │
│   └── 📁 types/                      # Types TypeScript
│       └── index.ts
│
├── public/                            # Assets statiques
├── middleware.ts                       # Protection des routes
├── next.config.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── render.yaml

# Installation
  Prérequis
   Node.js 20+

   npm ou yarn

# Étapes d'installation
# Cloner le repository
  git clone https://github.com/madior-git/ong_mkrt_frontend.git
  cd ong_mkrt_frontend

# Installer les dépendances
  npm install

# Configurer les variables d'environnement
   cp .env.local.example .env.local
# Éditer .env.local avec l'URL de votre backend

