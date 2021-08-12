import { ActionTree } from 'vuex';
import { ServerUserSlidesResponse } from '../../../types/server';
import { queryPreviews } from '../../serverApi/slides';
import { RootState } from '../type';
import { DashboardAction, DashboardActionType, DashboardModuleState, DashboardMutationType } from './type';

export const dashboardActions: ActionTree<DashboardModuleState, RootState> & DashboardAction = {
  async [DashboardActionType.LoadPreviews]({ commit, dispatch }) {
    dispatch(DashboardActionType.ResetPreviews);

    const slides = await queryPreviews();
    console.log(slides);
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
