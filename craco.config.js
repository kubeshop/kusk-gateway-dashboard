const webpack = require('webpack');
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@analytics': path.resolve(__dirname, 'src/analytics'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@swaggerUI': path.resolve(__dirname, 'src/swaggerUI'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    configure: {
      resolve: {
        fallback: {
          buffer: require.resolve('buffer'),
          process: require.resolve('process/browser'),
          stream: require.resolve('stream-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          url: require.resolve('url'),
          util: require.resolve('util'),
        },
      },
      plugins: [
        new MonacoWebpackPlugin({
          languages: ['yaml'],
          customLanguages: [
            {
              label: 'yaml',
              entry: 'monaco-yaml',
              worker: {
                id: 'monaco-yaml/yamlWorker',
                entry: 'monaco-yaml/yaml.worker',
              },
            },
          ],
        }),

        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
  },
};
