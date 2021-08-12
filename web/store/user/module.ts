import { Module } from 'vuex';
import { userGetters } from './getter';
import { UserModuleState } from './type';
import { userMutations } from './mutations';
import { userActions } from './actions';
import { RootState } from '../type';

export const UserModule: Module<UserModuleState, RootState> = {
  state: {
    loggedIn: false,
    email: undefined,
    loaded: false
  },
  getters: userGetters,
  mutations: userMutations,
  actions: userActions,
  namespaced: false // TODO!
};
