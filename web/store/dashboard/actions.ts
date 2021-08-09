import { ActionTree } from 'vuex';
import { ServerUserSlidesResponse } from '../../../types/server';
import { RootState } from '../type';
import { DashboardAction, DashboardActionType, DashboardModuleState, DashboardMutationType } from './type';

export const dashboardActions: ActionTree<DashboardModuleState, RootState> & DashboardAction = {
  async [DashboardActionType.LoadPreviews]({ commit }) {
    const slides = await fetch('/api/user/slides').then(res => res.json() as Promise<ServerUserSlidesResponse>);
    for (const slide of slides) {
      commit(DashboardMutationType.AddSlidePreview, {
        id: slide.id,
        title: slide.title,
        coverUrl: slide.coverUrl,
        uploaded: slide.uploaded
      });
    }
  },
  [DashboardActionType.ResetPreviews]({ commit, state }) {
    for (const preview of state.slidePreviews) {
      commit(DashboardMutationType.DeleteSlidePreview, preview);
    }
  }
};
