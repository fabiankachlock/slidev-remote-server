import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore } from 'vuex';
import { StateType } from './type.js';

// define injection key
export const key: InjectionKey<VuexStore<StateType>> = Symbol();

export const Store = createStore<StateType>({});
