import { DBData, Serializer } from './interface';

export class JSONSerializer implements Serializer {
  serialize = (key: string, value: any) => `${key}:${JSON.stringify(value)}\n`;

  serializeAll = (data: DBData) =>
    Object.entries(data)
      .map(e => this.serialize(e[0], e[1]))
      .join('');

  deserialize = (raw: string) =>
    raw
      .split('\n')
      .map(entry => {
        const index = entry.indexOf(':');
        const [key, value] = [entry.substring(0, index), entry.substring(index + 1, entry.length)];

        if (key)
          return {
            key,
            value: value ? JSON.parse(value) : undefined
          };
        else return undefined;
      })
      .filter(e => e !== undefined)
      .reduce((prev, curr) => {
        if (curr && curr.value) {
          prev[curr?.key || 'no-index'] = curr?.value;
        } else {
          delete prev[curr?.key || 'no-index'];
        }
        return prev;
      }, <DBData>{});
}
