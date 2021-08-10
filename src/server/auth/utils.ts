/// <reference path="../../express-session.d.ts" />

export const readSession = (
  req: Express.Request
):
  | {
      email: string;
      token: string;
      internalId: string;
      providerId: string;
      provider: string;
    }
  | undefined => {
  if (!req.session || !req.session.user) {
    return undefined;
  } else {
    return req.session.user;
  }
};
