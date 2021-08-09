import { DashboardModuleState } from './dashboard/type';
import { UserModuleState } from './user/type';

export type RootState = {
  user: UserModuleState;
  dashboard: DashboardModuleState;
};
