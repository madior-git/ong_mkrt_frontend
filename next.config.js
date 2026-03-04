// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactive le minificateur CSS natif qui cause le problème
  swcMinify: false,
  // Optionnel : utilisez le minificateur par défaut de Terser
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;