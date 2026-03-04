export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ONG MKRT</h3>
            <p className="text-gray-300 text-sm">
              Organisation dédiée à l'aide humanitaire et au développement communautaire.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/activites" className="text-gray-300 hover:text-white">Nos activités</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white">Nos services</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: contact@ong-mkrt.org</li>
              <li>Tél: +221 293 94 34</li>
              <li>Adresse: Rue de l'ONG, DAKAR</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ONG MKRT. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}