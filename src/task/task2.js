// eslint-disable-next-line no-unused-vars
const goods = require('../../goods');

/**
 * @param {Object[]} items
 * @returns {Object}
 */
module.exports = (items) => {
  let maxIndex = 0;
  let sum = 0;

  items.forEach((item, index) => {
    const qty = item.quantity || 0;
    const price = +(item.price || item.priceForPair).replace('$', '');

    if (sum < price * qty) {
      sum = price * qty;
      maxIndex = index;
    }
  });

  return items[maxIndex];
};
