const { pipeline } = require('stream');
const { createGunzip } = require('zlib');
const { promisify } = require('util');

const promisifiedPipeline = promisify(pipeline);

const { createCsvToDb } = require('../utils/csv-to-db');

async function uploadGzip(inputStream) {
  try {
    const gunzip = createGunzip();
    const csvToDb = createCsvToDb();

    await promisifiedPipeline(inputStream, gunzip, csvToDb);
  } catch (error) {
    console.log('CSV pipeline failed', error);
    throw Error('CSV pipeline filed');
  }
}

module.exports = {
  uploadGzip,
};
