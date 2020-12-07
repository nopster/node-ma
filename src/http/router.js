const goodsController = require('../controller/goods');
const discountController = require('../controller/discount');
const { generateErrorResponse } = require('./responseHandler');

/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
module.exports = (request, response) => {
  const { pathname, method, queryParams, body: data } = request;

  if (method === 'GET' && pathname === '/') return goodsController.index(response);
  if (method === 'GET' && pathname === '/task1') return goodsController.task1(response, queryParams);
  if (method === 'GET' && pathname === '/task2') return goodsController.task2(response);
  if (method === 'GET' && pathname === '/task3') return goodsController.task3(response);

  if (method === 'GET' && pathname === '/discount/callback') return discountController.callbackMethod(response);
  if (method === 'GET' && pathname === '/discount/promise') return discountController.promiseMethod(response);
  if (method === 'GET' && pathname === '/discount/async') return discountController.asyncMethod(response);

  if (method === 'POST' && pathname === '/upload') return goodsController.upload(response, data);

  return generateErrorResponse(response, 'Route not found', 404);
};
