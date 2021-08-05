import { Job, scheduleJob } from 'node-schedule';
import { DB } from './db';
import fs from 'fs-extra';
import { isDev } from '../util';

export class DBJanitor {
  public static instance = new DBJanitor();

  private job: Job;

  private dbs: DB[];

  private constructor() {
    // every day at midnight
    this.job = scheduleJob('db janitor', `${isDev ? '0' : '*'} * 0 * * *`, this.cleanUpCallBack);
    this.dbs = [];
  }

  private cleanUpCallBack = async () => {
    console.log('cleanup');
    for (const db of this.dbs) {
      const content = await fs.readFile(db.fileName);
      const data = db.serializer.deserialize(content.toString('utf-8'));
      await fs.writeFile(db.fileName, db.serializer.serializeAll(data));
    }
  };

  public registerDatabase = (db: DB) => {
    this.dbs.push(db);
  };

  public deleteDatabase = (db: DB) => {
    this.dbs = this.dbs.filter(d => d.fileName !== db.fileName);
  };

  public kill = () => {
    this.job.cancel(false);
  };
}
