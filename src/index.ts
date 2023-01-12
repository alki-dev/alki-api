import app from './app';
import { config } from './config';
import { database } from './db';
import { logger } from './logger';

async function startServer() {
  try {
    const PORT = config.port;

    await database.connect();

    const server = app.listen(PORT, async () => {
      logger.info('Application started');
      logger.debug(`🚀 App listening on http://localhost:${PORT}`);
    });

    const teardown = async () => {
      try {
        logger.info('Tearing down application');

        await database.disconnect();

        server.close(async (err) => {
          if (err) logger.error(err);

          logger.info('Teardown complete');

          process.exit(0);
        });
      } catch (error) {
        logger.error(new Error(`Error tearing down application: ${error}`));
      }
    };

    process.on('SIGTERM', teardown);
  } catch (error) {
    logger.error(new Error(`Error starting server: ${error}`));
  }
}

startServer();
