import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue chez ONG MKRT
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Ensemble, construisons un avenir meilleur pour les communautés dans le besoin
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Nous soutenir
            </Link>
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Nos Missions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-black mb-3">{mission.title}</h3>
                <p className="text-gray-600">{mission.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const missions = [
  {
    title: "Aide Humanitaire",
    description: "Fournir une aide d'urgence aux populations touchées par les catastrophes naturelles et les conflits."
  },
  {
    title: "Développement Durable",
    description: "Mettre en place des projets de développement durable pour améliorer les conditions de vie."
  },
  {
    title: "Éducation",
    description: "Promouvoir l'accès à l'éducation pour tous, en particulier pour les enfants défavorisés."
  }
];