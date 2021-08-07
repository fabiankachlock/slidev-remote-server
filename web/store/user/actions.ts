import { ActionTree } from 'vuex';
import { ServerUserInfoResponse } from '../../../types/server';
import { RootState } from '../type';
import { UserAction, UserActionType, UserModuleState, UserMutationType } from './type';

export const userActions: ActionTree<UserModuleState, RootState> & UserAction = {
  async [UserActionType.Login]({ commit }) {
    const userInfo: ServerUserInfoResponse = await fetch('/api/user/info').then(res => res.json());
    commit(UserMutationType.ChangeEmail, userInfo.email);
    commit(UserMutationType.ChangeLogInStatus, userInfo.loggedIn);
  },
  [UserActionType.Logout]({ commit }) {
    commit(UserMutationType.ChangeEmail, undefined);
    commit(UserMutationType.ChangeLogInStatus, false);
    fetch('auth/logout');
  }
};
