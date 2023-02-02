/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  redirects: async () => {
    return [
      {
        source: '/account',
        destination: '/account/login',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
