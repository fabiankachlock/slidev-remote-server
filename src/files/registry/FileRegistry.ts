import { SlidesDB } from '../../db/driver/slides/SlidesDB';
import path from 'path';
import fs from 'fs-extra';
import { createCoverUrl, uploadDir } from '../upload/constants';

export const FileRegistry = {
  registerUpload: (owner: string) => {
    const id = SlidesDB.createUpload(owner, Date.now());
    if (FileRegistry.folderFree(owner, id)) {
      const folderPath = path.join(uploadDir, owner, id);
      SlidesDB.withSlide(id).updateUrls(folderPath, path.join(folderPath, createCoverUrl(id)));
      return folderPath;
    } else {
      SlidesDB.delete(id);
      FileRegistry.registerUpload(owner);
    }
  },

  folderFree: (userId: string, id: string) => {
    const folderPath = path.join(uploadDir, userId, id);
    return !fs.existsSync(folderPath);
  }
};
