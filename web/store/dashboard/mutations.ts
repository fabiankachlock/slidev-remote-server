import { MutationTree } from 'vuex';
import { UserSlidesPreview } from '../../model/UserSlides';
import { DashboardMutationType, DashboardModuleState, DashboardMutation } from './type';

export const dashboardMutations: MutationTree<DashboardModuleState> & DashboardMutation = {
  [DashboardMutationType.ChangeEditMode](state: DashboardModuleState, isActive: boolean) {
    state.editModeActive = isActive;
  },
  [DashboardMutationType.AddSlidePreview](state: DashboardModuleState, preview: UserSlidesPreview) {
    state.slidePreviews.push(preview);
  },
  [DashboardMutationType.DeleteSlidevPreview](state: DashboardModuleState, preview: UserSlidesPreview) {
    state.slidePreviews = state.slidePreviews.filter(p => p !== preview);
  }
};
