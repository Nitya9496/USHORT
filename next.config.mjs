/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
