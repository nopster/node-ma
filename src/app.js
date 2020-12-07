require('dotenv').config();
const http = require('http');
const requestsHandler = require('./http/requestHandler');

const server = http.createServer(requestsHandler);
server.listen(Number(process.env.PORT || 3000));
console.log('Server running...');

// eslint-disable-next-line no-extend-native
Array.prototype.myMapAsync = async function myMap(callback) {
  const newArr = [];

  for (let i = 0; i < this.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    newArr[i] = await callback(this[i]);
  }

  return newArr;
};

// eslint-disable-next-line no-extend-native
Array.prototype.myMap = function myMap(callback) {
  const newArr = [];

  for (let i = 0; i < this.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    newArr[i] = callback(this[i]);
  }

  return newArr;
};