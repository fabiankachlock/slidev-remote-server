export type UserDBEntry = {
  id: string;
  loggedIn: boolean;
  email: string;
  authInfo: {
    provider: string;
    providerId: string;
    activeToken: string;
  };
  slides: string[];
};
