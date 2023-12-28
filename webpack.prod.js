const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

 module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
        new TerserPlugin(),
    ],
  },
 });