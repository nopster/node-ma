const goodsModel = require('../model/goods');
const tasks = require('../task');
const { generateSuccessResponse, generateErrorResponse } = require('../http/responseHandler');

module.exports = {
  /**
   * @param {import('http').ServerResponse} response
   */
  index(response) {
    return generateSuccessResponse(response, goodsModel.getAll());
  },

  /**
   * @param {import('http').ServerResponse} response
   * @param {[]} queryParams
   */
  task1(response, queryParams) {
    if (!queryParams.field) return generateErrorResponse(response, 'field is not defined');
    if (!queryParams.value) return generateErrorResponse(response, 'value is not defined');

    const responseData = tasks.task1(goodsModel.getAll(), queryParams.field, queryParams.value);

    return generateSuccessResponse(response, responseData);
  },

  /**
   * @param {import('http').ServerResponse} response
   */
  task2(response) {
    return generateSuccessResponse(response, tasks.task2);
  },

  /**
   * @param {import('http').ServerResponse} response
   */
  task3(response) {
    return generateSuccessResponse(response, tasks.task3(goodsModel.getAll()));
  },

  /**
   * @param {import('http').ServerResponse} response
   * @param {Object[]} body
   */
  upload(response, body) {
    goodsModel.setAll(body);

    return generateSuccessResponse(response);
  },
};
