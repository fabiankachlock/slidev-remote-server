import express from 'express';
import { FrontendRouter } from './frontend';
import { ApiRouter } from './api';

const server = express();

server.use(async (req, _res, next) => {
  console.info(`[${req.method}]  ${req.url}`);
  next();
});
server.use(express.json());

server.use('/api', ApiRouter);
server.use('/', FrontendRouter);

export const startServer = () => {
  server.listen(5000, () => console.info('Server started!'));
};
