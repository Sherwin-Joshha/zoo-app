/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-leaflet', 'leaflet'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
};

export default nextConfig;
