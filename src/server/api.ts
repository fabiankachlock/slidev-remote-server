import express from 'express';
import { UploadApi } from './api/upload';
import { UserApi } from './api/user';

export const ApiRouter = express.Router();

ApiRouter.get('/ping', async (req, res) => {
  res.send('pong');
});

ApiRouter.use('/user', UserApi);
ApiRouter.use('/upload', UploadApi);
