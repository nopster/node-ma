/**
 * @param {Object[]} items
 * @param {string} field
 * @param {string} value
 * @returns {Object[]}
 */
module.exports = (items, field, value) => items.filter((element) => element[field] === value);
