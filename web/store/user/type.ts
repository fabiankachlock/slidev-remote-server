import { ActionContext, DispatchOptions, Store as VuexStore } from 'vuex';
import { RootState } from '../type';

// State
export type UserModuleState = {
  loggedIn: boolean;
  email: string | undefined;
  loaded: boolean;
};

// getters
export type UserGetter = {
  userLoggedIn(state: UserModuleState): boolean;
  userEmail(state: UserModuleState): string | undefined;
  authStatusLoaded(state: UserModuleState): boolean;
};

// Mutations
export enum UserMutationType {
  ChangeLogInStatus = 'USER_CHANGE_LOGIN_STATUS',
  ChangeEmail = 'USER_CHANGE_EMAIL',
  ChangeAuthStatusLoaded = 'USER_CHANGE_AUTH_STATUS_LOADED'
}

export type UserMutation = {
  [UserMutationType.ChangeLogInStatus](state: UserModuleState, loggedIn: boolean): void;
  [UserMutationType.ChangeEmail](state: UserModuleState, email: string | undefined): void;
  [UserMutationType.ChangeAuthStatusLoaded](state: UserModuleState, loaded: boolean): void;
};

// Actions
export enum UserActionType {
  Login = 'USER_LOGIN',
  Logout = 'USER_LOGOUT'
}

export type UserAction = {
  [UserActionType.Login](context: UserModuleActionArguments): void;
  [UserActionType.Logout](context: UserModuleActionArguments): void;
};

export type UserModuleActionArguments = Omit<ActionContext<UserModuleState, RootState>, 'commit'> & UserModuleCommit;

// commit
export type UserModuleCommit = {
  commit<K extends keyof UserMutation>(key: K, payload: Parameters<UserMutation[K]>[1]): ReturnType<UserMutation[K]>;
};

// dispatch
export type UserModuleDispatch = {
  dispatch<K extends keyof UserAction>(key: K, payload: Parameters<UserAction[K]>[1], options?: DispatchOptions): ReturnType<UserAction[K]>;
};

export type UserModuleStore<S = UserModuleState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> &
  UserModuleCommit &
  UserModuleDispatch & {
    getters: {
      [K in keyof UserGetter]: ReturnType<UserGetter[K]>;
    };
  };
