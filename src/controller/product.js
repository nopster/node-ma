const { db: dbConfig } = require('../config');
const db = require('../db')(dbConfig);

const { generateSuccessResponse, generateErrorResponse } = require('../server/responseHandler');

module.exports = {
  async createProduct(res, req) {
    try {
      const row = await db.createProduct(req.body);
      generateSuccessResponse(res, row);
    } catch (err) {
      generateErrorResponse(res, err.message || err);
    }
  },

  async getProduct(res, req) {
    try {
      const row = await db.getProduct(req.query.id);
      generateSuccessResponse(res, row);
    } catch (err) {
      generateErrorResponse(res, err.message || err);
    }
  },

  async updateProduct(res, req) {
    try {
      const row = await db.updateProduct(req.query.id, req.body);
      generateSuccessResponse(res, row);
    } catch (err) {
      generateErrorResponse(res, err.message || err);
    }
  },

  async deleteProduct(res, req) {
    try {
      const row = await db.deleteProduct(req.query.id);
      generateSuccessResponse(res, row);
    } catch (err) {
      generateErrorResponse(res, err.message || err);
    }
  },
};
