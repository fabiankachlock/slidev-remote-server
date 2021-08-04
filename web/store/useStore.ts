import { Store, useStore as baseUseStore } from 'vuex';
import { key } from './index.js';
import { StateType } from './type.js';

export function useStore(): Store<StateType> {
  return baseUseStore(key);
}
