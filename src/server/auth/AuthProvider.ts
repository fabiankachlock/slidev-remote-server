import type { Request, Response } from 'express';

export abstract class AuthProvider {
  abstract name: string;
  abstract login(req: Request, res: Response);
  abstract handleCallback(req: Request, res: Response): Promise<AuthProviderLoginInfo | undefined>;
  abstract setRedirectUri(uri: string);
}

export type AuthProviderLoginInfo = {
  id: string;
  email: string;
  token: string;
};
