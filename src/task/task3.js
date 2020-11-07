/**
 * @param {Object[]} items
 * @returns {{type: st, color: string, quantity: number, price: string}[]}
 */
module.exports = (items) => {
  const normalizedItems = [];

  items.forEach((item) => {
    normalizedItems.push({
      type: item.type,
      color: item.color,
      quantity: item.quantity || 0,
      price: item.price || item.priceForPair,
    });
  });

  return normalizedItems;
};
