import { Module } from 'vuex';
import { userGetters } from './getter';
import { UserModuleState } from './type';
import { userMutations } from './mutations';
import { userActions } from './actions';
import { RootState } from '../type';

export const UserModule: Module<UserModuleState, RootState> = {
  getters: userGetters,
  mutations: userMutations,
  actions: userActions,
  namespaced: true
};
