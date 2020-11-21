const fs = require('fs');
const path = require('path');
let store = require('../../goods.json');

module.exports = {
  getAll() {
    return store;
  },

  /**
   * @param {Object[]} data
   */
  setAll(items) {
    fs.writeFileSync(path.resolve(__dirname, '../../', 'goods.json'), JSON.stringify(items));

    store = items;
  },
};
