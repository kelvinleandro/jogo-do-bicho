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
        hostname: 'discuss.wxpython.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
