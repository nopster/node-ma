require('dotenv').config();
require('./utils/map');
const server = require('./http/server');

function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.log(error);

    console.log('Gracefully stopping...');

    server.stop(() => {
      process.exit();
    });
  };

  // Catches ctrl+c event
  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);

  // Catches "kill pid"
  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);

  // Catches uncaught/unhandled exeptions
  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

function boot() {
  enableGracefulExit();
  server.start();
}

boot();
