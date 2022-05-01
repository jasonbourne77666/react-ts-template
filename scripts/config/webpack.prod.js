const { merge } = require('webpack-merge');
// css拆包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');
const paths = require('../paths');
const { shouldOpenAnalyzer, ANALYZER_HOST, ANALYZER_PORT } = require('../conf');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  // 使用自动解析的 browserslist 配置和环境（从最近的 package.json 或其他）
  target: 'browserslist',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: paths.appBuild,
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: ANALYZER_HOST,
        analyzerPort: ANALYZER_PORT,
      }),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 是否提取注释
        extractComments: false,
        terserOptions: {
          // 删除代码中console.log打印
          compress: { pure_funcs: ['console.log'] },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
});
