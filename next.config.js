const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const apiEndpoint = new URL(process.env.NEXT_PUBLIC_API_ENDPOINT);
const apiDomain = apiEndpoint.hostname;

module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: process.env.NODE_ENV === 'production',
  images: {
    domains: [apiDomain],
    // https://nextjs.org/docs/api-reference/next/image#minimum-cache-ttl
    minimumCacheTTL: 60,
  },
  env: {
    BUILD_ENV: process.env.BUILD_ENV ?? 'development',
  },
  webpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          urlPrefix: '~/_next',
        })
      );
    }
    return config;
  },
};
