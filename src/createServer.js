const http = require('http');
const { sendTextResponse } = require('./sendResponse');
const { readFileByPath, isFilePathValid } = require('./getFilePath');

const createServer = () => {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const requestedPath = url.pathname.slice(1);

      if (!isFilePathValid(requestedPath)) {
        sendTextResponse(res, 400, 'The path to files must start with /file');
      }

      try {
        const { data } = await readFileByPath(requestedPath);

        return sendTextResponse(res, 200, data, 'OK');
      } catch (err) {
        sendTextResponse(res, 404, err.message);
      }
    } catch (error) {
      sendTextResponse(res, 500, error.message, 'Internal Server Error');
    }
  });

  return server;
};

module.exports = { createServer };
