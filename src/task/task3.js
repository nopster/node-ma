/**
 * @param {Object[]} items
 * @returns {{type: string, color: string, quantity: number, price: string}[]}
 */
module.exports = (items) => {
  return items.map((item) => {
    return {
      type: item.type,
      color: item.color,
      quantity: item.quantity || 0,
      price: item.price || item.priceForPair,
    };
  });
};
