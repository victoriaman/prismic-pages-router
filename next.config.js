const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, options) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'hostApp',
          filename: 'static/runtime/remoteEntry.js', // ✅ REQUIRED even in host
          remotes: {
            adminMFE: 'adminMFE@http://localhost:3001/_next/static/runtime/remoteEntry.js',
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            'react-dom': { singleton: true, requiredVersion: false },
          },
          extraOptions: {
            skipSharingNextInternals: true, // ✅ avoid internal Next.js conflicts
          },
        })
      );

      // ⛔ chặn resolve tới react-server-dom-webpack
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'react-server-dom-webpack/client': false,
        'react-server-dom-webpack/client.edge': false,
      };
      return config;
    },
};

module.exports = nextConfig;

