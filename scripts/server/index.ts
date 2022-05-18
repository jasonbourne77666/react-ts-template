import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
import webpackDevConfig from '../config/webpack.dev';
import { SERVER_HOST, SERVER_PORT } from '../conf';
import logger from './logger';
import choosePort from './choseport';

const compiler = Webpack(webpackDevConfig);

const devServerOptions = {
  ...webpackDevConfig.devServer,
};
const server = new WebpackDevServer(compiler, devServerOptions);

async function startServer() {
  const resPort = await choosePort(SERVER_PORT, SERVER_HOST);
  try {
    if (resPort !== null) {
      server.listen(resPort, SERVER_HOST, (err: any) => {
        if (err) {
          return logger.error(err.message);
        }
        return logger.start(resPort, SERVER_HOST);
      });
    }
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

startServer();
