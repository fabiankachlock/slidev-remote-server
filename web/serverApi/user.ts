import { ServerUserInfoResponse } from '../../types/server';
import { handleJsonServerResponse } from './handler';

export const queryAuthStatus = () => fetch('/api/user/info').then(res => handleJsonServerResponse<ServerUserInfoResponse>(res));

export const logoutUser = () => fetch('auth/logout');
