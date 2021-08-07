import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { FrontendRouter } from './frontend';
import { ApiRouter } from './api';
import { AuthRouter } from './auth';

const server = express();

server.use(async (req, _res, next) => {
  console.info(`[${req.method}]  ${req.url}`);
  next();
});
server.use(express.json());
server.use(cors());

const { SESSION_SECRET } = process.env;

server.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false, cookie: { maxAge: 7776000 /* 90 Days */ } }));

server.use('/api', ApiRouter);
server.use('/auth', AuthRouter);
server.use('/', FrontendRouter);

export const startServer = () => {
  server.listen(5000, () => console.info('Server started!'));
};
