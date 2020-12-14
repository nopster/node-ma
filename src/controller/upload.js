const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { generateSuccessResponse } = require('../server/responseHandler');
const { optimizer } = require('../utils/optimizer');
const { createJsonToDbStream } = require('../utils/json-to-db');

const promisifiedPipeline = promisify(pipeline);
const readdirp = promisify(fs.readdir);

async function runOptimize(filename) {
  try {
    const filePath = `./uploads/${filename}`;
    const readStream = fs.createReadStream(filePath);
    const optimizerStream = optimizer();

    if (!fs.existsSync('./uploads/optimize')) {
      fs.mkdirSync('./uploads/optimize');
    }

    const outputStream = createJsonToDbStream();

    await promisifiedPipeline(readStream, optimizerStream, outputStream);
  } catch (err) {
    console.error('Error on optimize file');
    console.error(err);
  }
}

module.exports = {
  /**
   * @param {import('http').ServerResponse} response
   */
  async list(response) {
    const data = await readdirp('./uploads/');
    const targetFiles = data.filter((file) => {
      return path.extname(`./uploads/${file}`).toLowerCase() === '.json';
    });
    return generateSuccessResponse(response, targetFiles);
  },

  async optimize(file, response) {
    runOptimize(file);
    return generateSuccessResponse(response, [], 202);
  },
};
