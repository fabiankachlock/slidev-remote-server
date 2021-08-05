import fs from 'fs-extra';
import { DBData, Serializer } from './interface';
import { JSONSerializer } from './serializer';

export class DB {
  private stream: fs.WriteStream;

  private data: DBData;

  constructor(readonly fileName: string, defaultData: DBData | undefined = undefined, readonly serializer: Serializer = new JSONSerializer()) {
    let newFileCreated = false;
    this.data = {};

    if (!fs.existsSync(this.fileName)) {
      fs.createFileSync(this.fileName);
      newFileCreated = true;
    }

    if (!newFileCreated) {
      const initialRawData = fs.readFileSync(this.fileName);
      const initialData = this.serializer.deserialize(initialRawData.toString('utf8'));
      this.data = initialData;
    }

    this.stream = fs.createWriteStream(this.fileName, { flags: 'a' });

    if (newFileCreated && defaultData) {
      this.data = defaultData;
      this.stream.write(this.serializer.serializeAll(defaultData));
    }
  }

  read = (): DBData => {
    return this.data;
  };

  write = (data: DBData) => {
    for (const [key, value] of Object.entries(data)) {
      this.data[key] = value;
      this.stream.write(this.serializer.serialize(key, value));
    }
  };

  close = () => {
    this.stream.end();
  };
}
