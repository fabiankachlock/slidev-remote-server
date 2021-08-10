import { DB } from '../db';
import { JSONSerializer } from '../serializer';
import { DBDriverOptions, DBEntry, DBMutation, WherePredicate } from './types';
import { v4 as uuid } from 'uuid';
import { DBData } from '../interface';
import { DBJanitor } from '../janitor';

export class DBDriver<T extends DBData> {
  private db: DB;

  protected data: Record<string, T>;

  constructor(private options: DBDriverOptions) {
    this.db = new DB(options.fileName ?? options.name + '.db', undefined, new JSONSerializer());
    this.data = this.db.read();
    DBJanitor.instance.registerDatabase(this.db);
  }

  public shutdown = () => {
    this.db.close();
    DBJanitor.instance.deleteDatabase(this.db);
  };

  protected create = (object: T): string => {
    const id = uuid();
    this.db.write(id, object);
    this.data = this.db.read();
    return id;
  };

  protected select = (id: string): T | undefined => {
    return this.data[id];
  };

  protected selectWhere = (pred: WherePredicate<T>): DBEntry<T> | undefined => {
    for (const [key, value] of Object.entries(this.data)) {
      if (pred(value)) {
        return {
          id: key,
          value
        };
      }
    }
    return undefined;
  };

  protected selectAllWhere = (pred: WherePredicate<T>): DBEntry<T>[] => {
    const objects: DBEntry<T>[] = [];
    for (const [key, value] of Object.entries(this.data)) {
      if (pred(value)) {
        objects.push({
          id: key,
          value
        });
      }
    }
    return objects;
  };

  protected selectAll = () => this.selectAllWhere(() => true);

  protected update = (id: string, object: T): boolean => {
    if (id in this.data) {
      this.db.write(id, object);
      this.data = this.db.read();
      return true;
    }
    return false;
  };

  protected updateWhere = (pred: WherePredicate<T>, object: T): boolean => {
    for (const [key, value] of Object.entries(this.data)) {
      if (pred(value)) {
        this.update(key, object);
        this.data = this.db.read();
        return true;
      }
    }
    return false;
  };

  protected updateAllWhere = (pred: WherePredicate<T>, object: T) => {
    const updates: DBData = {};
    for (const [key, value] of Object.entries(this.data)) {
      if (pred(value)) {
        updates[key] = object;
      }
    }
    this.db.writeBatch(updates);
    this.data = this.db.read();
  };

  protected mutate = (id: string, mutation: DBMutation<T, T>): boolean => {
    if (id in this.data) {
      const object = this.data[id];
      this.db.write(id, mutation(object));
      this.data = this.db.read();
      return true;
    }
    return false;
  };

  protected mutateWhere = (pred: WherePredicate<T>, mutation: DBMutation<T, T>): boolean => {
    for (const [key, value] of Object.entries(this.data)) {
      if (pred(value)) {
        const object = this.data[key];
        this.update(key, mutation(object));
        this.data = this.db.read();
        return true;
      }
    }
    return false;
  };

  protected mutateAllWhere = (pred: WherePredicate<T>, mutation: DBMutation<T, T>) => {
    const updates: DBData = {};
    for (const [key, value] of Object.entries(this.data)) {
      if (pred(value)) {
        const object = this.data[key];
        updates[key] = mutation(object);
      }
    }
    this.db.writeBatch(updates);
    this.data = this.db.read();
  };

  protected mutateAll = <B>(mutation: DBMutation<T, B>) => {
    const updates: DBData = {};
    for (const [key, value] of Object.entries(this.data)) {
      updates[key] = mutation(value);
    }
    this.db.writeBatch(updates);
    this.data = this.db.read();
    DBJanitor.instance.cleanUp(this.db);
  };

  protected migrate = this.mutateAll;

  protected delete = (id: string) => {
    this.db.write(id, undefined);
    this.data = this.db.read();
  };

  protected deleteWhere = (pred: WherePredicate<T>): boolean => {
    for (const [key, value] of Object.entries(this.data)) {
      if (pred(value)) {
        this.delete(key);
        return true;
      }
    }
    return false;
  };

  protected deleteAllWhere = (pred: WherePredicate<T>) => {
    const updates: DBData = {};
    for (const [key, value] of Object.entries(this.data)) {
      if (pred(value)) {
        updates[key] = undefined;
      }
    }
    this.db.writeBatch(updates);
  };
}
