/**
 * @param {import('http').ServerResponse} response
 * @param {[]} body
 * @param {number} statusCode
 */
function generateReponse(response, body, statusCode) {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = statusCode;
  response.write(JSON.stringify(body));
  response.end();
}

module.exports = {
  /**
   * @param {import('http').ServerResponse} response
   * @param {[]} data
   * @param {number} statusCode
   */
  generateSuccessResponse(response, data = [], statusCode = 200) {
    const responseData = { success: true, data };
    generateReponse(response, responseData, statusCode);
  },

  /**
   * @param {import('http').ServerResponse} response
   * @param {string} error
   * @param {number} statusCode
   */
  generateErrorResponse(response, error = '', statusCode = 400) {
    const responseData = { success: false, error };
    generateReponse(response, responseData, statusCode);
  },
};
