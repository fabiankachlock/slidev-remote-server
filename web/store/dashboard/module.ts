import { Module } from 'vuex';
import { dashboardGetters } from './getter';
import { DashboardModuleState } from './type';
import { dashboardMutations } from './mutations';
import { dashboardActions } from './actions';
import { RootState } from '../type';

export const DashboardModule: Module<DashboardModuleState, RootState> = {
  state: {
    editModeActive: false,
    slidePreviews: [
      {
        id: 'abc',
        title: 'test',
        coverUrl:
          'https://images.unsplash.com/photo-1586672806791-3a67d24186c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
        uploaded: 0
      },
      {
        id: 'abcd',
        title: 'test2',
        coverUrl: '',
        uploaded: Date.now()
      }
    ]
  },
  getters: dashboardGetters,
  mutations: dashboardMutations,
  actions: dashboardActions,
  namespaced: false // TODO!
};
