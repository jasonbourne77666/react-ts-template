const webpack = require('webpack');
// 页面显示错误信息
// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('../paths');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: paths.appBuild,
    publicPath: '/',
    clean: true,
  },
  stats: 'errors-only', // 只输出错误日志
  devServer: {
    compress: false,
    open: true,
    hot: false,
    client: false,
    historyApiFallback: true,
    // proxy: {
    //   ...require(paths.appProxySetup),
    // },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ErrorOverlayPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
  },
});
