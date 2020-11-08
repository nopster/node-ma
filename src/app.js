const goods = require('../goods');
const { task1: itemsFilter, task2: findMaxSumItem, task3: itemsNormalizer } = require('./task');

/**
 * @param {Object[]} items
 * @param {string} field
 * @param {string} value
 */
const boot = (items, field, value) => {
  const filtredItems = itemsFilter(items, field, value);
  console.log('Filtred items');
  console.log(filtredItems);

  const normalizedItems = itemsNormalizer(filtredItems);
  console.log('\nNormalized items');
  console.log(normalizedItems);

  console.log('\nMax price item');
  console.log(findMaxSumItem);
};

boot(goods, 'type', 'socks');
