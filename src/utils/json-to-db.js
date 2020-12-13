const { Writable } = require('stream');
const { db: dbConfig } = require('../config');
const db = require('../db')(dbConfig);

function createJsonToDbStream() {
  const write = (chunk, encoding, next) => {
    const products = JSON.parse(chunk.toString());
    products.forEach((product) => {
      db.insertOrUpdateQty(product);
    });

    next();
  };

  return new Writable({ write });
}

module.exports = { createJsonToDbStream };
