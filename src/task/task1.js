/**
 * @param {Object[]} items
 * @param {string} field
 * @param {string} value
 * @returns {Object[]}
 */
module.exports = (items, field, value) => {
  return items.filter((element) => {
    return element[field] === value;
  });
};
