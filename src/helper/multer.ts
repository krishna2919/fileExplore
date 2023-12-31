/* eslint-disable prettier/prettier */
import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cd) {
    cd(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
  },
});