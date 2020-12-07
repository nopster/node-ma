const responseHandler = require('./responseHandler');
const { uploadGzip } = require('../controller/uploadGzip');

async function streamHandler(request, response) {
  const { url, method } = request;
  if (method === 'PUT' && url === '/upload/gzip') {
    try {
      await uploadGzip(request);
    } catch (error) {
      console.error('Failed to upload Gzip', error);
      responseHandler.generateErrorResponse(response, 'Failed to upload');
      return;
    }

    responseHandler.generateSuccessResponse(response);
    return;
  }

  responseHandler.generateErrorResponse(response, 'route_not_found', 404)
}

module.exports = { streamHandler };
