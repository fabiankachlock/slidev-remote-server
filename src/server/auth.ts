import express, { RequestHandler } from 'express';
import passport from 'passport';
import session from 'express-session';
import GitHubStrategy from 'passport-github2';
import type { VerifyFunction } from 'passport-oauth2';

require('dotenv').config();

export const AuthRouter = express.Router();

AuthRouter.use(session({ secret: 'abc123', resave: false, saveUninitialized: false }));
AuthRouter.use(passport.initialize());
AuthRouter.use(passport.session());

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/notAuthendicated');
};

passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log('deserializeUser', obj);
  // @ts-ignore
  done(null, obj);
});

// @ts-ignore
const verifyFunction: VerifyFunction = (accessToken, refreshToken, profile, done) => {
  // asynchronous verification, for effect...
  console.log({ accessToken, refreshToken, profile });

  // an example of how you might save a user
  // new User({ username: profile.username }).fetch().then(user => {
  //   if (!user) {
  //     user = User.forge({ username: profile.username })
  //   }
  //
  //   user.save({ profile: profile, access_token: accessToken }).then(() => {
  //     return done(null, user)
  //   })
  // })
};

passport.use(
  new GitHubStrategy.Strategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID ?? '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET ?? '',
      callbackURL: process.env.OAUTH_REDIRECT_URI ?? ''
    },
    verifyFunction
  )
);

AuthRouter.get('/test', isAuthenticated, (req, res) => {
  res.send(`<h2>yo ${req.user}</h2>`);
});

AuthRouter.get('test');

AuthRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
  console.log('after auth');
});

AuthRouter.get(
  '/github/callback',
  (req, res) => {
    console.log('on callback');
  },
  passport.authenticate('github', { failureRedirect: '/authFailure' }),
  (req, res) => {
    console.log('after callback');
    res.redirect('/');
  }
);
