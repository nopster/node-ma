require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  basicToken: process.env.BASIC_TOKEN || 'TWFzdGVyczpBY2FkZW15',
};

module.exports = config;
