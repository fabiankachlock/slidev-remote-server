import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore, createLogger } from 'vuex';
import { DashboardModule } from './dashboard/module';
import { DashboardModuleStore } from './dashboard/type';
import { RootState } from './type.js';
import { UserModule } from './user/module';
import { UserModuleStore } from './user/type';

// define injection key
export const key: InjectionKey<VuexStore<RootState>> = Symbol();

export const Store = createStore<RootState>({
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
  modules: {
    user: UserModule,
    dashboard: DashboardModule
  }
});

export type StoreType = UserModuleStore<Pick<RootState, 'user'>> & DashboardModuleStore<Pick<RootState, 'dashboard'>>;
