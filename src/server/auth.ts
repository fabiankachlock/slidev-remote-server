import express, { RequestHandler } from 'express';
import session from 'express-session';
import { UserDB } from '../db/driver/users/UserDB';
import { AuthProviders } from './auth/providers';

require('dotenv').config();

export const AuthRouter = express.Router();

const { SESSION_SECRET } = process.env;

AuthRouter.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false, cookie: { maxAge: 7776000 /* 90 Days */ } }));

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.session && req.session.user && UserDB.userAuthorized(req.session.user.internalId)) {
    return next();
  }
  res.redirect('/notAuthendicated');
};

for (const authProvider of AuthProviders) {
  AuthRouter.get('/login/' + authProvider.name, authProvider.login);

  AuthRouter.get('/' + authProvider.name + '/callback', async (req, res) => {
    // store in db
    const creds = await authProvider.handleCallback(req, res);

    if (!creds) {
      res.redirect('/notAuthenticated');
      return;
    }

    if (!UserDB.userExists(creds.id)) {
      UserDB.createUser(authProvider.name, creds.id, creds.email);
    }
    const internalId = UserDB.loginWithGithub(creds.id, creds.token);

    // prepare session

    if (!req.session.user) {
      // @ts-ignore
      req.session.user = {};
    }
    if (req.session.user) {
      req.session.user.email = creds.email;
      req.session.user.token = creds.token;
      req.session.user.providerId = creds.id;
      req.session.user.provider = authProvider.name;
      req.session.user.internalId = internalId;
    }
    res.redirect('/loggedIn');
  });
}

AuthRouter.get('/secret', isAuthenticated, async (req, res) => {
  res.send('dont tell anybody!');
});

AuthRouter.get('/logout', (req, res) => {
  if (req.session) {
    UserDB.logout(req.session.user?.internalId || '');
    // @ts-ignore
    req.session = null;
  }
  res.redirect('/');
});
