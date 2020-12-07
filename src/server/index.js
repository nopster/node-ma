const express = require('express');
const { basicToken } = require('../config')
const goodsController = require('../controller/goods');
const discountController = require('../controller/discount');
const uploadController = require('../controller/upload');
const { uploadGzip } = require('../controller/uploadGzip');
const { generateErrorResponse, generateSuccessResponse } = require('./responseHandler');

const app = express();

app.use((req, res, next) => {
  if (req.headers.authorization !== `Basic ${basicToken}`) {
    return generateErrorResponse(res, 'unauthorized access', 403);
  }

  return next();
});

app.get('/', (req, res) => goodsController.index(res));
app.get('/task1', (req, res) => goodsController.task1(res, req.query));
app.get('/task2', (req, res) => goodsController.task2(res));
app.get('/task3', (req, res) => goodsController.task3(res));

app.get('/discount/callback', (req, res) => discountController.callbackMethod(res));
app.get('/discount/promist', (req, res) => discountController.promiseMethod(res));
app.get('/discount/async', (req, res) => discountController.asyncMethod(res));

app.post(/^\/uploads\/optimize\/(?:([^\/]+?))\/?$/i, (req, res) =>
  uploadController.optimize(req.params[0], res),
);

app.post('/upload', express.json(), (req, res) => goodsController.upload(res, req.body));

app.get('/uploads', express.json(), (req, res) => uploadController.list(res));
app.put('/upload/gzip', async (req, res) => {
  try {
    await uploadGzip(req);
  } catch (error) {
    console.error('Failed to upload Gzip', error);
    generateErrorResponse(res, 'Failed to upload');
  }

  generateSuccessResponse(res);
});

app.use((req, res) => generateErrorResponse(res, 'not_found', 404));

module.exports = app;
