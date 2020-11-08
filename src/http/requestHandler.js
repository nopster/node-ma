const { parse: parseQuery } = require('querystring');
const { URL } = require('url');
const router = require('./router');

/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
module.exports = async (request, response) => {
  try {
    const parsedUrl = new URL(request.url, process.env.HOST || 'http://localhost:3000');
    const queryParams = parseQuery(parsedUrl.search.substr(1));

    let body = [];

    request
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();

        router(
          {
            ...request,
            body: body ? JSON.parse(body) : {},
            pathname: parsedUrl.pathname,
            queryParams,
          },
          response,
        );
      });
  } catch (error) {
    console.log(error);
  }
};
