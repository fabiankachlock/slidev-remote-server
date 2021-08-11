import { UserSlideData } from '../model/UserSlides';

export const querySlide = (id: string) => fetch('/api/user/slides/' + id).then(res => res.json() as Promise<UserSlideData>);
