import { RouteRecordRaw } from 'vue-router';
import Dashboard from '../pages/dashboard/Dashboard.vue';
import DashboardMainContent from '../components/dashboard/DashboardMainContent.vue';
import DashboardUpload from '../components/dashboard/DashboardUpload.vue';
import DashboardDetail from '../components/dashboard/DashboardDetail.vue';

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: DashboardMainContent,
        meta: { requiresAuth: true }
      },
      {
        path: 'upload',
        component: DashboardUpload,
        meta: { requiresAuth: true }
      },
      {
        path: 'detail/:id',
        component: DashboardDetail,
        meta: { requiresAuth: true }
      }
    ]
  }
];
