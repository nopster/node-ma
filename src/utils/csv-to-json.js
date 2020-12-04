/* eslint-disable no-continue */
const { Transform } = require('stream');

function createCsvToJson() {
  let firstItem = true;
  let fieldsNames = [];
  let fieldsCount = 0;
  let lastLine = '';
  let firstLine = true;

  const parseLine = (goodLine) => {
    let res = '\n{';

    for (let fieldIndex = 0; fieldIndex < fieldsCount; fieldIndex += 1) {
      res += `"${fieldsNames[fieldIndex]}":"${goodLine[fieldIndex]}"`;

      if (fieldIndex !== fieldsCount - 1) {
        res += ',';
      }
    }

    res += '}';

    return res;
  };

  const transform = (chunk, encoding, callback) => {
    const chunkStr = lastLine + chunk.toString();
    lastLine = '';
    let res = '';
    const chunkArr = chunkStr.split('\n');
    const size = chunkArr.length;

    for (let index = 0; index < size; index += 1) {
      if (firstItem && index === 0) {
        res += '[';
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

      if (firstLine) {
        firstLine = false;
      } else {
        res += ',';
      }

      res += parseLine(good);
    }

    callback(null, res);
  };

  const flush = (callback) => {
    let res = '';

    if (lastLine) {
      res += parseLine(lastLine);
    }

    res += ']';
    callback(null, res);
  };

  return new Transform({ transform, flush });
}

module.exports = { createCsvToJson };
