import { ActionTree } from 'vuex';
import { logoutUser, queryAuthStatus } from '../../serverApi/user';
import { RootState } from '../type';
import { UserAction, UserActionType, UserModuleState, UserMutationType } from './type';

export const userActions: ActionTree<UserModuleState, RootState> & UserAction = {
  async [UserActionType.Login]({ commit }) {
    const userInfo = await queryAuthStatus();
    commit(UserMutationType.ChangeEmail, userInfo.email);
    commit(UserMutationType.ChangeLogInStatus, userInfo.loggedIn);
    commit(UserMutationType.ChangeAuthStatusLoaded, true);
  },
  [UserActionType.Logout]({ commit }) {
    commit(UserMutationType.ChangeEmail, undefined);
    commit(UserMutationType.ChangeLogInStatus, false);
    logoutUser();
  }
};
