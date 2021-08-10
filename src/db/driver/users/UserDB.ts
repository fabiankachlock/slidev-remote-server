import { DBDriver } from '../DBDriver';
import { UserDBEntry } from './types';

export class UserDB extends DBDriver<UserDBEntry> {
  private static db = new UserDB({ name: 'users', fileName: 'db/users.db' });

  static shutdown = UserDB.db.shutdown;

  static user = UserDB.db.select;

  static userExists = (providerId: string) => UserDB.db.selectWhere(user => user.authInfo.providerId === providerId) !== undefined;

  static userAuthorized = (userId: string) => {
    const user = UserDB.db.select(userId);
    return user && user.loggedIn;
  };

  static createUser = (provider: string, providerId: string, email: string) => {
    const data: UserDBEntry = {
      id: '',
      loggedIn: false,
      email,
      authInfo: {
        provider,
        providerId,
        activeToken: ''
      },
      slides: []
    };
    const id = UserDB.db.create(data);
    UserDB.db.update(id, {
      ...data,
      id
    });
  };

  static loginWithGithub = (githubId: string, token: string): string => {
    const userRecord = UserDB.db.selectWhere(user => user.authInfo.providerId === githubId);

    if (userRecord) {
      UserDB.db.update(userRecord.id, {
        ...userRecord.value,
        loggedIn: true,
        authInfo: {
          ...userRecord.value.authInfo,
          activeToken: token
        }
      });
      return userRecord.value.id;
    }
    return '';
  };

  static logout = (userId: string) => {
    const userRecord = UserDB.db.select(userId);

    if (userRecord) {
      UserDB.db.update(userId, {
        ...userRecord,
        loggedIn: false
      });
    }
  };

  static withUser = (userId: string) => ({
    registerSlide: (id: string) =>
      UserDB.db.mutate(userId, data => ({
        ...data,
        slides: [...data.slides, id]
      })),
    deleteSlide: (id: string) =>
      UserDB.db.mutate(userId, data => ({
        ...data,
        slides: data.slides.filter(sid => sid !== id)
      }))
  });
}
