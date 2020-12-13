require('./utils/map');

const { port, db: dbConfig } = require('./config');
const app = require('./server');
const db = require('./db')(dbConfig);

function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.log(error);

    console.log('Gracefully stopping...');

    app.close();
    process.exit();
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

async function boot() {
  enableGracefulExit();
  await db.testConnection();
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

boot();
