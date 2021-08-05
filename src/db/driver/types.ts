export type DBDriverOptions = {
  name: string;
  fileName?: string;
};

export type WherePredicate<T> = (object: T) => boolean;

export type DBMutation<A, B> = (object: A) => B;

export type DBEntry<T> = {
  id: string;
  value: T;
};
