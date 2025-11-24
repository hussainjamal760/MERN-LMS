/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... any existing config here ...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      },
      // You may also need to add other external domains like Google/GitHub avatars if not done already
      // {
      //   protocol: 'https',
      //   hostname: 'avatars.githubusercontent.com',
      //   port: '',
      //   pathname: '/**'
      // }
      // {
      //   protocol: 'https',
      //   hostname: 'lh3.googleusercontent.com',
      //   port: '',
      //   pathname: '/**'
      // }
    ],
  },
};

export default nextConfig; // Ya 'module.exports = nextConfig;' agar .js file ho