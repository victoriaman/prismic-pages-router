import NextFederationPlugin from '@module-federation/nextjs-mf';
const deps = require('./package.json').dependencies;

const nextConfig = {
  reactStrictMode: true,
  webpack(config: any, options: any) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'hostApp',
        filename: 'static/runtime/remoteEntry.js', // ✅ REQUIRED even in host
        remotes: {
          adminMFE: 'adminMFE@http://localhost:3001/_next/static/runtime/remoteEntry.js',
        },
        shared: {
          ...deps,
          react: { singleton: true, requiredVersion: '19.0.0', eager: true },
          'react-dom': { singleton: true, requiredVersion: '19.0.0', eager: true },
          '@prismicio/react': { singleton: true, requiredVersion: false },
          '@prismicio/client': { singleton: true, requiredVersion: false },
          '@prismicio/next': { singleton: true, requiredVersion: false },
        },
        extraOptions: {
          skipSharingNextInternals: true, // ✅ avoid internal Next.js conflicts
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;

// const NextFederationPlugin = require('@module-federation/nextjs-mf');
// const withTM = require('next-transpile-modules')([]);
// const deps = require('./package.json').dependencies;

// module.exports = withTM({
//   webpack(config: any, options: any) {
//     config.plugins.push(
//       new NextFederationPlugin({
//         name: 'host',
//         filename: 'static/runtime/remoteEntry.js', // ✅ REQUIRED even in host
//         remotes: {
//           adminMFE: 'adminMFE@http://localhost:3001/_next/static/runtime/remoteEntry.js',
//         },
//         shared: {
//           ...deps,
//           react: { singleton: true, requiredVersion: '19.0.0', eager: true },
//           'react-dom': { singleton: true, requiredVersion: '19.0.0', eager: true },
//         },
//         extraOptions: {
//           skipSharingNextInternals: true,
//         },
//       })
//     );

//     // ✅ safe aliasing — ONLY apply if not already resolved
//     // config.resolve.alias = {
//     //   ...(config.resolve.alias || {}),
//     //   react: require.resolve('react'),
//     //   'react-dom': require.resolve('react-dom'),
//     //   // DO NOT alias react/jsx-runtime here — let Next handle it
//     // };

//     return config;
//   },
// });