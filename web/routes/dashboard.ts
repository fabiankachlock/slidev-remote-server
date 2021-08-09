import { RouteRecordRaw } from 'vue-router';
import Dashboard from '../pages/dashboard/Dashboard.vue';
import DashboardMainContent from '../components/dashboard/DashboardMainContent.vue';
import DashboardUpload from '../components/dashboard/DashboardUpload.vue';
import DashboardDetail from '../components/dashboard/DashboardDetail.vue';

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        component: DashboardMainContent
      },
      {
        path: 'upload',
        component: DashboardUpload
      },
      {
        path: 'detail',
        component: DashboardDetail
      }
    ]
  }
];
