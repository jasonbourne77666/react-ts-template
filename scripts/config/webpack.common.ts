import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// 进度条
import WebpackBar from 'webpackbar';
// 单独开启进程进行 ts 类型检查，优化打包速度
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import paths from '../paths';
import { isDevelopment, isProduction } from '../env';
import { imageInlineSizeLimit } from '../conf';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const getCssLoaders = (importLoaders: number, modules = {}) => [
  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules,
      sourceMap: isDevelopment,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          require('postcss-flexbugs-fixes'),
          isProduction && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
        ].filter(Boolean),
      },
    },
  },
];

// 开发环境热更新
const entry = isDevelopment
  ? [
      // Runtime code for hot module replacement
      'webpack/hot/dev-server.js',
      // Dev server client for web socket transport, hot and live reload logic
      'webpack-dev-server/client/index.js?hot=true&live-reload=true',
      paths.appIndex,
    ]
  : { app: paths.appIndex };

export default {
  entry,
  // cache: {
  //   type: 'filesystem',
  //   buildDependencies: {
  //     config: [__filename],
  //   },
  // },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': paths.appSrc,
    },
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // axios: 'axios'
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getCssLoaders(1),
      },
      {
        test: cssModuleRegex,
        use: getCssLoaders(1, {
          mode: 'local',
          auto: true,
          localIdentName: '[path]__[local]--[hash:base64:5]',
        }),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: sassModuleRegex,
        use: [
          ...getCssLoaders(2, {
            mode: 'local',
            auto: true,
            localIdentName: '[path]__[local]--[hash:base64:5]',
          }),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      cache: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          context: paths.appPublic,
          from: '*',
          to: paths.appBuild,
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new WebpackBar({
      name: isDevelopment ? 'RUNNING' : 'BUNDLING',
      color: isDevelopment ? '#52c41a' : '#722ed1',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        // 应用项目tsconfig地址
        configFile: paths.appTsConfig,
      },
    }),
  ],
};
