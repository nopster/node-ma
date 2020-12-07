const { pipeline } = require('stream');
const { createGunzip } = require('zlib');
const { promisify } = require('util');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const promisifiedPipeline = promisify(pipeline);

const { createCsvToJson } = require('../utils/csv-to-json');

async function uploadGzip(inputStream) {
  const gunzip = createGunzip();

  const filename = uuidv4();

  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }

  const filePath = `./uploads/${filename}.json`;
  const outputStream = fs.createWriteStream(filePath);
  const csvToJson = createCsvToJson();

  try {
    await promisifiedPipeline(inputStream, gunzip, csvToJson, outputStream);
  } catch (error) {
    console.log('CSV pipeline failed', error);
  }
}

module.exports = {
  uploadGzip,
}
