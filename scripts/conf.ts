import path from 'path';

export const PROJECT_PATH = path.resolve(__dirname, '../');
export const PROJECT_NAME = path.parse(PROJECT_PATH).name;

// Dev server host and port
export const SERVER_HOST = 'localhost';
export const SERVER_PORT = 9000;

// Whether to enable bundle package analysis
export const shouldOpenAnalyzer = false;
export const ANALYZER_HOST = 'localhost';
export const ANALYZER_PORT = '8888';

// Resource size limit
export const imageInlineSizeLimit = 4 * 1024;
