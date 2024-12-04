const fs = require('fs').promises;
const path = require('path');

const readFileByPath = async (requestedPath) => {
  let fileName = requestedPath.replace(/^file\/?/, '');

  if (!fileName) {
    fileName = 'index.html';
  }

  if (fileName.includes('..')) {
    throw new Error('The path has duplicated slashes');
  }

  const filePath = path.join(__dirname, `../public/${fileName}`);

  try {
    const data = await fs.readFile(filePath, 'utf-8');

    return { data };
  } catch {
    throw new Error('The file does not exist at this path');
  }
};

module.exports = { readFileByPath };
