import { AuthProvider, AuthProviderLoginInfo } from '../AuthProvider';
import fetch from 'node-fetch';
import type { Request, Response } from 'express';

require('dotenv').config();

const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

const getAccessToken = async (code: string, client_id: string, client_secret: string): Promise<string> => {
  const request = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  });
  const text = await request.text();
  const params = new URLSearchParams(text);
  return params.get('access_token') ?? 'no-code';
};

const fetchUser = async (token: string) => {
  const request = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: 'token ' + token
    }
  });
  return await request.json();
};

const fetchEmail = async (token: string): Promise<string> => {
  const request = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: 'token ' + token
    }
  });
  const response = await request.json();
  if (response && Array.isArray(response) && response.length > 0) {
    return <string>response[0].email;
  }
  return '';
};

export class GithubAuthProvider implements AuthProvider {
  private redirectUri: string = '';
  name = 'github';

  setRedirectUri = (uri: string) => (this.redirectUri = uri);

  login = (req: Request, res: Response) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${this.redirectUri}&scope=user:email`);
  };

  handleCallback = async (req: Request, res: Response): Promise<AuthProviderLoginInfo | undefined> => {
    const code = <string>req.query['code'] || 'no-code';

    // fetch data
    const accessToken = await getAccessToken(code, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    const user = await fetchUser(accessToken);
    const email = await fetchEmail(accessToken);

    // catch errors
    if (!user || !email) {
      return undefined;
    }

    return {
      id: user.id.toString(),
      email,
      token: accessToken
    };
  };
}
