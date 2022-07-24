import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';
import multer, { memoryStorage } from 'multer';
import { resolve } from 'path';

export const fileFetch = multer({ storage: memoryStorage() });

export const saveFile = (file: Express.Multer.File) => {
    const { mimetype, buffer } = file;
    let ext = mimetype.split('/')[1];

    const filename = `${Date.now()}${randomBytes(20).toString('hex')}.${ext}`;
    writeFileSync(resolve(`dist/files/${filename}`), buffer);
    return filename;
};
