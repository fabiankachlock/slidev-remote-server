import { RouteRecordRaw } from 'vue-router';
import LoginCallback from '../pages/auth/LoginCallback.vue';
import Logout from '../pages/auth/Logout.vue';

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    redirect: '/auth/login/github'
  },
  {
    path: '/logout',
    component: Logout
  },
  {
    path: '/login/callback',
    component: LoginCallback
  }
];
