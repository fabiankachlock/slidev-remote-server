import fs from 'fs-extra';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { uploadDir } from './constants';

export const FileUploader = {
  upload(files: Express.Multer.File[]) {
    const id = uuid();

    fs.mkdir(path.join(uploadDir, id));

    for (const file of files) {
      console.log('Writing POSTed data :', file.originalname);
      // import sanitize from 'sanitize-filename';
      //var sanitized_filename = sanitize(file.originalname);
      const fileName = path.join(uploadDir, id, file.originalname);

      return fs.writeFile(fileName, file.buffer);
    }
  }
};
