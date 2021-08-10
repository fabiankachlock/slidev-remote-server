import fs from 'fs-extra';
import path from 'path';
import { FileRegistry } from '../registry/FileRegistry';
import { uploadDir } from './constants';
// import sanitize from 'sanitize-filename';

export const FileUploader = {
  prepare: () => {
    if (!fs.existsSync(path.join(uploadDir))) {
      fs.mkdirSync(path.join(uploadDir));
    }
  },

  upload: async (files: Express.Multer.File[], userId: string) => {
    const id = FileRegistry.registerUpload(userId);
    await FileUploader.prepareUpload(id);

    for (const file of files) {
      // var sanitized_filename = sanitize(file.originalname);
      const fileName = path.join(uploadDir, id, file.originalname);
      return fs.writeFile(fileName, file.buffer);
    }
  },

  prepareUpload: async (id: string) => fs.mkdir(path.join(uploadDir, id))
};
