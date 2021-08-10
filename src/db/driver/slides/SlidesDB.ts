import { DBDriver } from '../DBDriver';
import { UserDB } from '../users/UserDB';
import { SlidesDBEntry } from './types';

export class SlidesDB extends DBDriver<SlidesDBEntry> {
  private static db = new SlidesDB({ name: 'slides', fileName: 'db/slides.db' });

  static shutdown = SlidesDB.db.shutdown;

  static createUpload = (owner: string, date: number) => {
    const data: SlidesDBEntry = {
      title: '',
      id: '',
      uploadDate: date,
      folderUrl: '',
      coverUrl: '',
      owner
    };

    const id = SlidesDB.db.create(data);
    SlidesDB.db.update(id, {
      ...data,
      id
    });
    return id;
  };

  static slidesForUser = (userId: string) => {
    const user = UserDB.user(userId);
    const slides: SlidesDBEntry[] = [];
    if (user) {
      for (const slideId of user.slides) {
        slides.push(SlidesDB.db.select(slideId));
      }
    }
    return slides;
  };

  static getPreviews = (userId: string) => {
    const slides = SlidesDB.slidesForUser(userId);
    return slides.map(slide => ({
      id: slide.id,
      coverUrl: slide.coverUrl,
      title: slide.title,
      uploaded: slide.uploadDate
    }));
  };

  static withSlide = (id: string) => ({
    updateUrls: (folderUrl: string, coverUrl: string) =>
      SlidesDB.db.mutate(id, data => ({
        ...data,
        folderUrl,
        coverUrl
      }))
  });

  static delete = SlidesDB.db.delete;
}
