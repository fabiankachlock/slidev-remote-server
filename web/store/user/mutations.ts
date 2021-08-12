import { MutationTree } from 'vuex';
import { UserMutationType, UserModuleState, UserMutation } from './type';

export const userMutations: MutationTree<UserModuleState> & UserMutation = {
  [UserMutationType.ChangeLogInStatus](state: UserModuleState, loggedIn: boolean) {
    state.loggedIn = loggedIn;
  },
  [UserMutationType.ChangeEmail](state: UserModuleState, email: string | undefined) {
    state.email = email;
  },
  [UserMutationType.ChangeAuthStatusLoaded](state: UserModuleState, loaded: boolean) {
    state.loaded = loaded;
  }
};
