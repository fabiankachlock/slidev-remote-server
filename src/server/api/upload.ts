/// <reference path="../../express-session.d.ts" />
import express from 'express';
import multer from 'multer';
import { FileUploader } from '../../files/upload/Upload';
import { isAuthenticated } from '../auth';
import { readSession } from '../auth/utils';

const fileUpload = multer();
export const UploadApi = express.Router();

const resolveFiles = async (req: Express.Request): Promise<Express.Multer.File[]> => {
  const files = await Promise.resolve(req.files)
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

      return allFiles;
    })
    .catch(err => {
      console.log(err);
      return Promise.resolve(err);
    });

  return files;
};

UploadApi.post('/slides', isAuthenticated, fileUpload.array('upload-files'), async (req, res) => {
  if (req.files) {
    console.log('req.files.length = ', req.files.length);
    const files = await resolveFiles(req).catch(err => console.log(err));

    const userData = readSession(req);

    if (!userData) return res.sendStatus(401);

    if (Array.isArray(files)) {
      FileUploader.upload(files, userData.internalId);
      return res.sendStatus(200);
    }
    return res.sendStatus(401);
  }
});
