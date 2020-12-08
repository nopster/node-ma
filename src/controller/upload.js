const { generateSuccessResponse, generateErrorResponse } = require('../server/responseHandler');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { optimizer } = require('../utils/optimizer');

const promisifiedPipeline = promisify(pipeline);
const readdirp = promisify(fs.readdir);

async function runOptimize(filename) {
  let filePath = `./uploads/${filename}`;
  const readStream = fs.createReadStream(filePath);
  const optimizerStream = optimizer();

  if (!fs.existsSync('./uploads/optimize')) {
    fs.mkdirSync('./uploads/optimize');
  }

  filePath = `./uploads/optimize/${filename}`;
  const outputStream = fs.createWriteStream(filePath);

  await promisifiedPipeline(readStream, optimizerStream, outputStream);
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
  }
};
