import 'dotenv/config';
import app from './app';
import { createServer } from 'http';
import { databaseConnect } from './database/functions';
import { databaseListeners } from './database/listeners';
import { startSocketOneVersusOne } from './sockets/oneVersusOne.socket';

const PORT = process.env.PORT || 8080;

const httpServer = createServer(app);

function startServer() {
  databaseConnect();
  databaseListeners();
  startSocketOneVersusOne(httpServer);

  httpServer.listen(PORT);

  /* Log every missing environment variable that's required */
  const envRequired = ['MONGODB_CONNECTION', 'JWT_SECRET'];

  envRequired.forEach((prop) => {
    if (!process.env[prop]) {
      console.log(`Required environment variable '${prop}' wasn't provided.`);
    }
  });
}

startServer();
