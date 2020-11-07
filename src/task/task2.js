const goods = require('../../goods');

/**
 * @param {Object[]} items
 * @returns {Object}
 */
const findMax = (items) => {
  let maxIndex;
  let maxPrice = 0;
  items.forEach((item, index) => {
    const qty = item.quantity || 0;
    const price = +(item.price || item.priceForPair).replace('$', '');

    if (qty > 0 && maxPrice < price) {
      maxPrice = price;
      maxIndex = index;
    }
  });

  return maxIndex ? items[maxIndex] : {};
};

module.exports = findMax(goods);
