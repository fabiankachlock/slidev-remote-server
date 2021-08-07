import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore, createLogger } from 'vuex';
import { RootState } from './type.js';
import { UserModule } from './user/module';
import { UserModuleCommit, UserModuleStore, UserMutation } from './user/type.js';

// define injection key
export const key: InjectionKey<VuexStore<RootState>> = Symbol();

export const Store = createStore<RootState>({
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
  modules: {
    user: UserModule
  }
});

export type StoreType = UserModuleStore<Pick<RootState, 'user'>>;
