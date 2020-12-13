require('dotenv').config();
const { fatal } = require('../utils/fatal');

const config = {
  port: process.env.PORT || 3000,
  basicToken: process.env.BASIC_TOKEN || 'TWFzdGVyczpBY2FkZW15',
  db: {
    user: process.env.DATABASE_USER || fatal('ENV variable: DB_USER is not defined'),
    password: process.env.DATABASE_PASS || fatal('ENV variable: DB_PASS is not defined'),
    host: process.env.DATABASE_HOST || fatal('ENV variable: DB_HOST is not defined'),
    port: process.env.DATABASE_PORT || fatal('ENV variable:DB_PORT is not defined'),
    database: process.env.DATABASE_NAME || fatal('ENV variable: DB_NAME is not defined'),
  },
};

module.exports = config;
