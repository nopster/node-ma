const http = require('http');
const requestsHandler = require('./requestHandler');

const server = http.createServer(requestsHandler);

function start() {
  server.listen(Number(process.env.PORT || 3000), () => {
    console.log('Server running...');
  });
}

function stop(callback) {
  server.close((err) => {
    if (err) {
      console.error(err, 'Filed to close server');
      callback();
    }

    console.log('Server has been stopped')
  });
}

module.exports = { start, stop };
