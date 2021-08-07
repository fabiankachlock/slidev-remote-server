import express from 'express';
import multer from 'multer';
import { FileUploader } from '../files/upload/Upload';

export const ApiRouter = express.Router();
const fileUpload = multer();

ApiRouter.get('/ping', async (req, res) => {
  res.send('pong');
});

ApiRouter.post('/upload', fileUpload.array('upload-files'), (req, res) => {
  if (req.files) {
    console.log('req.files.length = ', req.files.length);
    Promise.resolve(req.files)
      .then(files => {
        const allFiles: Express.Multer.File[] = [];

        if (Array.isArray(files)) {
          allFiles.push(...files);
        } else {
          for (const [, file] of Object.entries(files)) {
            if (Array.isArray(file)) {
              allFiles.push(...file);
            } else {
              allFiles.push(file);
            }
          }
        }

        FileUploader.upload(allFiles);
      })
      .catch(err => console.log(err))
      .then(() => {
        console.log('Added files : Success');
        return res.sendStatus(200);
      });
  }
});

import './api/user';
