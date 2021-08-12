import { ServerUserSlidesResponse } from '../../types/server';
import { UserSlideData } from '../model/UserSlides';
import { handleJsonServerResponse } from './handler';

export const querySlide = (id: string) => fetch('/api/user/slides/' + id).then(res => handleJsonServerResponse<UserSlideData>(res));

export const queryPreviews = () => fetch('/api/user/slides/previews').then(res => handleJsonServerResponse<ServerUserSlidesResponse>(res));
