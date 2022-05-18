import webpack, { Configuration } from 'webpack';
// 页面显示错误信息
// import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';
import { merge } from 'webpack-merge';
import common from './webpack.common';
import paths from '../paths';

export default merge<Configuration>(common, {
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
