import { GetterTree } from 'vuex';
import { RootState } from '../type';
import { DashboardGetter, DashboardModuleState } from './type';

export const dashboardGetters: GetterTree<DashboardModuleState, RootState> & DashboardGetter = {
  isDashboardEditMode: state => state.editModeActive,
  dashboardSlidesPreview: state => state.slidePreviews
};
