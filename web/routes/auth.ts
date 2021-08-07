import { RouteRecordRaw } from 'vue-router';
import Login from '../pages/auth/Login.vue';
import Logout from '../pages/auth/Logout.vue';

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    redirect: '/auth/login/github'
    // component: Login
  },
  {
    path: '/logout',
    component: Logout
  }
];
