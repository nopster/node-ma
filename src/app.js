require('dotenv').config();
const http = require('http');
const requestsHandler = require('./http/requestHandler');

const server = http.createServer(requestsHandler);
server.listen(Number(process.env.PORT || 3000));
console.log('Server running...')
