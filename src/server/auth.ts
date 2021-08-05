import express, { RequestHandler } from 'express';
import fetch from 'node-fetch';
import session from 'express-session';

require('dotenv').config();

export const AuthRouter = express.Router();

const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, SESSION_SECRET } = process.env;

AuthRouter.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.internalId in ['???']) {
    return next();
  }
  res.redirect('/notAuthendicated');
};

AuthRouter.get('/test', isAuthenticated, (req, res) => {
  res.send(`<h2>yo ${req.session.user?.email}</h2>`);
});

const redirectURI = 'http://localhost:5000/auth/github/callback';
AuthRouter.get('/login/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${redirectURI}&scope=user:email`);
});

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

const fetchGitHubUser = async (token: string) => {
  const request = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: 'token ' + token
    }
  });
  return await request.json();
};

const fetchGithubUserEmail = async (token: string): Promise<string> => {
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

AuthRouter.get('/github/callback', async (req, res) => {
  const code = <string>req.query['code'] || 'no-code';
  const accessToken = await getAccessToken(code, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
  const user = await fetchGitHubUser(accessToken);
  if (user) {
    const email = await fetchGithubUserEmail(accessToken);
    if (!req.session.user) {
      // @ts-ignore
      req.session.user = {};
    }
    if (req.session.user) {
      req.session.user.email = email;
      req.session.user.token = accessToken;
      req.session.user.providerId = user.id;
      req.session.user.provider = 'github';
    }
    console.log(req.session.user);
    res.redirect('/loggedIn');
  } else {
    res.send('Login did not succeed!');
  }
});

AuthRouter.get('/logout', (req, res) => {
  // @ts-ignore
  if (req.session) req.session = null;
  res.redirect('/');
});
