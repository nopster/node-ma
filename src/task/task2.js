const goods = require('../../goods');

/**
 * @param {Object[]} items
 * @returns {Object}
 */
module.exports = (items = goods) => {
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

  return maxPrice ? items[maxIndex] : {};
};
