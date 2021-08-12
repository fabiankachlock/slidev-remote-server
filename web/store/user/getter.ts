import { GetterTree } from 'vuex';
import { RootState } from '../type';
import { UserGetter, UserModuleState } from './type';

export const userGetters: GetterTree<UserModuleState, RootState> & UserGetter = {
  userLoggedIn: state => state.loggedIn,
  userEmail: state => state.email,
  authStatusLoaded: state => state.loaded
};
