import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AuthRoutes } from './auth';
import Error404 from '../pages/error/404.vue';
import Error401 from '../pages/error/401.vue';
import Landig from '../pages/LandingPage.vue';
import { DashboardRoutes } from './dashboard';
import { Store } from '../store';

export const Routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Landig
  },
  ...AuthRoutes,
  ...DashboardRoutes,
  {
    path: '/notAuthenticated',
    component: Error401
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error404
  }
];

export const Router = createRouter({
  history: createWebHistory(),
  routes: Routes
});

Router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (Store.getters.userLoggedIn) {
      next();
    } else {
      next('/notAuthenticated');
    }
  } else {
    next();
  }
});
