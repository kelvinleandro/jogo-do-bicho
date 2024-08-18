/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.tenor.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.wxpython.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.pngtree.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.vexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.vecteezy.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
