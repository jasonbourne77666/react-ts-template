import detect from 'detect-port-alt';
import isRoot from 'is-root';
import chalk from 'chalk';

const isInteractive = process.stdout.isTTY;

async function choosePort(port, host) {
  const resPort = await detect(port, host);
  if (resPort === port) {
    return resPort;
  }
  const message =
    process.platform !== 'win32' && port < 1024 && !isRoot()
      ? 'Admin permissions are required to run a server on a port below 1024.'
      : `Something is already running on port ${port}.`;

  if (isInteractive) {
    console.log(chalk.yellow(message));
    return resPort;
  }
  console.log(chalk.red(message));
  return null;
}

export default choosePort;
