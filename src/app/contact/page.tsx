'use client';

import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600">
            Une question ? Un projet ? N'hésitez pas à nous contacter
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <ContactForm />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="font-semibold text-black mb-2">Adresse</h3>
            <p className="text-gray-600">Rue de l'ONG<br />DAKAR</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-black mb-2">Téléphone</h3>
            <p className="text-gray-600">+221 78 293 94 34</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-black mb-2">Email</h3>
            <p className="text-gray-600">contact@ong-mkrt.org</p>
          </div>
        </div>
      </div>
    </div>
  );
}