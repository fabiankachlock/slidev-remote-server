export type DBData = Record<string, any>;

export interface Serializer {
  serialize(key: string, value: any): string;
  serializeAll(data: DBData): string;
  deserialize(raw: string): DBData;
}
