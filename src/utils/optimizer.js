const { Transform } = require('stream');

function optimizer() {
  const optimizedArray = {};
  let summaryQuantity = 0;
  let chunkLast = '';
  const transform = (chunk, encoding, callback) => {
    const chunkStr = chunkLast + chunk.toString();

    const items = chunkStr.split('}');
    const itemsLength = items.length;

    for (let index = 0; index < itemsLength - 1; index += 1) {
      const itemFields = items[index].replace(',\n').split(',');
      const type = itemFields[0].split('"')[3];
      const color = itemFields[1  ].split('"')[3];
      const quantity = +itemFields[2].split('"')[3];
      const price = itemFields[3].split('"')[3];
      const isPair = itemFields[4].split('"')[3];
      summaryQuantity += quantity;

      const key = type + color + price;

      if (optimizedArray[key]) {
        optimizedArray[key].quantity += quantity;
      } else {
        optimizedArray[key] = { type, color, quantity, price, isPair };
      }
    }

    chunkLast = items[itemsLength - 1];

    callback(null, null);
  };

  const flush = (callback) => {
    console.log(`Summary Quantity = ${summaryQuantity}`);
    const resultArray = [];
    const optimizedArrayLength = Object.keys(optimizedArray).length;
    for (let index = 0; index < optimizedArrayLength; index += 1) {
      resultArray.push(optimizedArray[index]);
    }

    callback(null, JSON.stringify(resultArray));
  };

  return new Transform({ transform, flush });
}

module.exports = { optimizer };
