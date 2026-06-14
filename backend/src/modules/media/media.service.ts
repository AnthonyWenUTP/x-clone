import { Injectable } from '@nestjs/common';
import type { Multer } from 'multer';

@Injectable()
export class MediaService {

    async saveFile(file: Express.Multer.File,) {
        const url = `/uploads/${file.filename}`;
        return {
            url,
            type: file.mimetype.startsWith('image') ? 'IMAGE' : 'VIDEO',
        };
    }
}