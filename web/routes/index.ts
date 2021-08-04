import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AuthRoutes } from './auth';
import Error404 from '../pages/error/404.vue';
import Landig from '../pages/LandingPage.vue';

export const Routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Landig
  },
  ...AuthRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: Error404
  }
];

export const Router = createRouter({
  history: createWebHistory(),
  routes: Routes
});
