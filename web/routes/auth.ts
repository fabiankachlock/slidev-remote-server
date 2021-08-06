import { RouteRecordRaw } from 'vue-router';
import Login from '../pages/auth/Login.vue';
import Logout from '../pages/auth/Logout.vue';

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/auth/ogin',
    component: Login
  },
  {
    path: '/auth/logout',
    component: Logout
  }
];
