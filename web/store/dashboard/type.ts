import { ActionContext, DispatchOptions, Store as VuexStore } from 'vuex';
import { UserSlidesPreview } from '../../model/UserSlides';
import { RootState } from '../type';

// State
export type DashboardModuleState = {
  editModeActive: boolean;
  slidePreviews: UserSlidesPreview[];
};

// getters
export type DashboardGetter = {
  isDashboardEditMode(state: DashboardModuleState): boolean;
  dashboardSlidesPreview(state: DashboardModuleState): UserSlidesPreview[];
};

// Mutations
export enum DashboardMutationType {
  ChangeEditMode = 'DASHBOARD_CHANGE_EDIT_MODE',
  AddSlidePreview = 'DASHBOARD_ADD_PREVIEW',
  DeleteSlidePreview = 'DASHBOARD_DELETE_PREVIEW'
}

export type DashboardMutation = {
  [DashboardMutationType.ChangeEditMode](state: DashboardModuleState, isActive: boolean): void;
  [DashboardMutationType.AddSlidePreview](state: DashboardModuleState, preview: UserSlidesPreview): void;
  [DashboardMutationType.DeleteSlidePreview](state: DashboardModuleState, preview: UserSlidesPreview): void;
};

// Actions
export enum DashboardActionType {
  LoadPreviews = 'DASHBOARD_LOAD_PREVIEWS',
  ResetPreviews = 'DASHBOARD_RESET_PREVIEWS'
}

export type DashboardAction = {
  [DashboardActionType.LoadPreviews](context: DashboardModuleActionArguments): void;
  [DashboardActionType.ResetPreviews](context: DashboardModuleActionArguments): void;
};

export type DashboardModuleActionArguments = Omit<ActionContext<DashboardModuleState, RootState>, 'commit'> & DashboardModuleCommit;

// commit
export type DashboardModuleCommit = {
  commit<K extends keyof DashboardMutation>(key: K, payload: Parameters<DashboardMutation[K]>[1]): ReturnType<DashboardMutation[K]>;
};

// dispatch
export type DashboardModuleDispatch = {
  dispatch<K extends keyof DashboardAction>(
    key: K,
    payload: Parameters<DashboardAction[K]>[1],
    options?: DispatchOptions
  ): ReturnType<DashboardAction[K]>;
};

export type DashboardModuleStore<S = DashboardModuleState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> &
  DashboardModuleCommit &
  DashboardModuleDispatch & {
    getters: {
      [K in keyof DashboardGetter]: ReturnType<DashboardGetter[K]>;
    };
  };
