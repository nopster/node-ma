const express = require('express');
const { basicToken } = require('../config');
const goodsController = require('../controller/goods');
const discountController = require('../controller/discount');
const uploadController = require('../controller/upload');
const productController = require('../controller/product');
const { uploadGzip } = require('../controller/uploadGzip');
const { generateSuccessResponse } = require('./responseHandler');

const app = express();

app.use((req, res, next) => {
  if (req.headers.authorization !== `Basic ${basicToken}`) {
    next({ error: 'unauthorized access', code: 403 });
  }

  return next();
});

app.get('/', (req, res) => goodsController.index(res));
app.get('/task1', (req, res) => goodsController.task1(res, req.query));
app.get('/task2', (req, res) => goodsController.task2(res));
app.get('/task3', (req, res) => goodsController.task3(res));

app.post('/createProduct', express.json(), (req, res) => productController.createProduct(res, req));
app.get('/getProduct', (req, res) => productController.getProduct(res, req));
app.post('/updateProduct', express.json(), (req, res) => productController.updateProduct(res, req));
app.post('/deleteProduct', (req, res) => productController.deleteProduct(res, req));

app.get('/discount/callback', (req, res) => discountController.callbackMethod(res));
app.get('/discount/promist', (req, res) => discountController.promiseMethod(res));
app.get('/discount/async', (req, res) => discountController.asyncMethod(res));

app.post(/^\/uploads\/optimize\/(?:([^\/]+?))\/?$/i, (req, res) =>
  uploadController.optimize(req.params[0], res),
);

app.post('/upload', express.json(), (req, res) => goodsController.upload(res, req.body));

app.get('/uploads', (req, res) => uploadController.list(res));
app.put('/upload/gzip', async (req, res, next) => {
  try {
    await uploadGzip(req);
  } catch (error) {
    console.error('Failed to upload Gzip', error);
    next({ error: 'not_found', code: 400 });
  }

  generateSuccessResponse(res);
});

app.use((req, res, next) => next({ error: 'not_found', code: 404 }));

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.code || 500);
  res.write(JSON.stringify({ error: err.error || 'Internal Server Error' }));
  res.end();

  return null;
});

module.exports = app;
