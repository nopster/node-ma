const { promisify } = require('util');
const { randomInt } = require('crypto');
const goodsModel = require('../model/goods');
const task3 = require('../task/task3');
const { generateSuccessResponse } = require('../http/responseHandler');

module.exports = {
  generateDiscount(callback) {
    setTimeout(() => {
      const discount = randomInt(1, 99);

      if (discount >= 20) {
        return callback(new Error('Big discount value'));
      }

      return callback(null, discount);
    }, 50);
  },

  wrapperGenerateCallbackDiscount() {
    return new Promise((resolve, reject) => {
      this.generateDiscount((err, script) => {
        if (err) reject(err);
        else resolve(script);
      });
    });
  },

  wrapperGenerateAsyncDiscount() {
    return promisify(this.generateDiscount);
  },

  async generateAsyncDiscount(goods) {
    const result = await goods.myMapAsync(async (good) => {
      const item = good;
      let needsDiscountCount = 1;
      let discountCount = 0;

      if (good.type === 'hat') {
        needsDiscountCount = good.color === 'red' ? 3 : 2;
      }

      let discount = 1;

      while (discountCount !== needsDiscountCount) {
        try {
          // eslint-disable-next-line no-await-in-loop
          discount *= 1 - (await this.wrapperGenerateCallbackDiscount()) / 100;
          discountCount += 1;
        } catch (error) {
          //
        }
      }
      const price = item.price.replace('$', '');
      const priceWithDiscount = price * discount;
      const discountValue = price - price * discount;
      item.priceWithDiscount = `$${priceWithDiscount.toFixed(2)}`;
      item.discount = `$${discountValue.toFixed(2)}`;

      return good;
    });

    return result;
  },

  /**
   * @param {import('http').ServerResponse} response
   */
  async asyncMethod(response) {
    let goods = goodsModel.getAll();
    goods = task3(goods);

    const result = await this.generateAsyncDiscount(goods);

    return generateSuccessResponse(response, result);
  },

  /**
   * @param {import('http').ServerResponse} response
   */
  async promiseMethod(response) {
    let goods = goodsModel.getAll();
    goods = task3(goods);

    this.generateAsyncDiscount(goods).then((result) => {
      generateSuccessResponse(response, result)
    });
  },

  generator(goods, state, callback) {
    const items = goods;
    const currentState = state || {
      currentItem: 0,
      currentDiscountCount: 0,
      generatedDiscount: 0,
      currentDiscountValue: 1,
    };

    if (items.length === currentState.currentItem) {
      callback(items);
      return;
    }

    if (currentState.generatedDiscount === 0) {
      this.generateDiscount((err, value) => {
        currentState.generatedDiscount = err ? 0 : value;
        this.generator(items, currentState, callback);
      });
      return;
    }

    const index = currentState.currentItem;
    currentState.currentDiscountValue *= 1 - currentState.generatedDiscount / 100;
    currentState.currentDiscountCount += 1;

    if (items[index].type === 'hat') {
      const needsDiscountCount = items[index].color === 'red' ? 3 : 2;
      if (currentState.currentDiscountCount < needsDiscountCount) {
        this.generator(items, currentState, callback);
        return;
      }
    }

    const price = items[index].price.replace('$', '');
    const priceWithDiscount = price * currentState.currentDiscountValue;
    const discountValue = price - price * currentState.currentDiscountValue;
    items[index].priceWithDiscount = `$${priceWithDiscount.toFixed(2)}`;
    items[index].discount = `$${discountValue.toFixed(2)}`;

    currentState.currentItem += 1;
    currentState.currentDiscountValue = 1;
    currentState.currentDiscountCount = 0;
    currentState.generatedDiscount = 0;

    this.generator(items, currentState, callback);
  },

  callbackMethod(response) {
    let goods = goodsModel.getAll();
    goods = task3(goods);

    this.generator(goods, null, (result) => {
      generateSuccessResponse(response, result);
    });
  },
};
