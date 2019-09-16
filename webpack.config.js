const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// config for Service worker
const SWConfig = {
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: 'service-worker.js',
  logger(message) {
    if (message.indexOf('Total precache size is') === 0) {
      // This message occurs for every build and is a bit too noisy.
      return;
    }
    console.log(message);
  },
  minify: true, // minify and uglify the script
  navigateFallback: '/index.html',
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
};

const buildPath = `${__dirname}/docs`;

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: buildPath,
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './docs',
    port: 3001,
    compress: true,
    historyApiFallback: true
  },
  devtool: '',
  plugins: [
    new Dotenv(),
    new HtmlPlugin({ template: './src/index.html' }),
    new ManifestPlugin({ fileName: 'asset-manifest.json' }),
    new SWPrecacheWebpackPlugin(SWConfig),
    new CopyWebpackPlugin([{ from: 'src/pwa' }]),
    new CompressionPlugin(),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]' // <-- retain original file name
      }
    ]
  }
};
