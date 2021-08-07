import { useStore as useBaseUseStore } from 'vuex';
import { key, StoreType } from './index';

export function useStore(): StoreType {
  return useBaseUseStore(key);
}
