const fs = require('fs').promises;
const path = require('path');

const isFilePathValid = (requestedPath) =>
  !requestedPath.startsWith('file/') || !requestedPath.includes('//');

const readFileByPath = async (requestedPath) => {
  let fileName = requestedPath.replace(/^file\/?/, '');

  if (!fileName) {
    fileName = 'index.html';
  }

  const publicPath = path.resolve(__dirname, '../public');
  const resolvedPath = path.resolve(publicPath, fileName);

  if (!resolvedPath.startsWith(publicPath)) {
    throw new Error('The path has duplicated slashes');
  }

  try {
    const data = await fs.readFile(resolvedPath, 'utf-8');

    return { data };
  } catch {
    throw new Error('The file does not exist at this path.');
  }
};

module.exports = { readFileByPath, isFilePathValid };
