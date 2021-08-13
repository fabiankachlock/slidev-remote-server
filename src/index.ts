import { UserDB } from './db/driver/users/UserDB';
import { DBJanitor } from './db/janitor';
import { startServer } from './server/server';

startServer();

process.on('SIGTERM', () => {
  console.log('shutting down...');
  UserDB.shutdown();
  DBJanitor.instance.kill();
});
