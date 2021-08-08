import { Module } from 'vuex';
import { dashboardGetters } from './getter';
import { DashboardModuleState } from './type';
import { dashboardMutations } from './mutations';
import { dashboardActions } from './actions';
import { RootState } from '../type';

export const DashboardModule: Module<DashboardModuleState, RootState> = {
  state: {
    editModeActive: false,
    slidePreviews: []
  },
  getters: dashboardGetters,
  mutations: dashboardMutations,
  actions: dashboardActions,
  namespaced: false // TODO!
};
