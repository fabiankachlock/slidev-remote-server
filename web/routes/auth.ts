import { RouteRecordRaw } from 'vue-router';
import Auth from '../pages/auth/Auth.vue';
import Login from '../pages/auth/Login.vue';
import Logout from '../pages/auth/Logout.vue';

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: 'login',
        component: Login
      },
      {
        path: 'logout',
        component: Logout
      }
    ]
  }
];
