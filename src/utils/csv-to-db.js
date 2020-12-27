/* eslint-disable no-continue */
const { Writable } = require('stream');
const { db: dbConfig } = require('../config');
const db = require('../db')(dbConfig);

function createCsvToDb() {
  let firstItem = true;
  let fieldsNames = [];
  let fieldsCount = 0;
  let lastLine = '';

  const parseLine = async (goodLine) => {
    const product = {};

    for (let fieldIndex = 0; fieldIndex < fieldsCount; fieldIndex += 1) {
      product[fieldsNames[fieldIndex]] = goodLine[fieldIndex];
    }

    await db.insertOrUpdateQty(product);
  };

  const write = async (chunk, encoding, next) => {
    const chunkStr = lastLine + chunk.toString();
    lastLine = '';
    const chunkArr = chunkStr.split('\n');
    const size = chunkArr.length;

    for (let index = 0; index < size; index += 1) {
      if (firstItem && index === 0) {
        fieldsNames = chunkArr[index].split(',');
        fieldsCount = fieldsNames.length;
        firstItem = false;
        continue;
      }

      if (index === size - 1) {
        lastLine = chunkArr[index];
        continue;
      }

      const good = chunkArr[index].split(',');

      // eslint-disable-next-line no-await-in-loop
      await parseLine(good);
    }

    next();
  };

  const end = (next) => {
    if (lastLine) {
      parseLine(lastLine);
    }

    next();
  };

  return new Writable({ write, end });
}

module.exports = { createCsvToDb };
