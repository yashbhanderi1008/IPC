import path from 'path';
import fs from 'fs';
import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

interface MulterFile extends Express.Multer.File { }

export class FileUtilities {
    private publicDir: string;
    private storage: StorageEngine;
    private upload: multer.Multer;

    constructor(publicDir: string) {
        this.publicDir = publicDir;
        this.storage = multer.diskStorage({
            destination: this._getDestination.bind(this),
            filename: this._getFilename.bind(this),
        });
        
        this.upload = multer({ storage: this.storage });
    }

    private _getDestination(req: Request, file: MulterFile, cb: (error: Error | null, destination: string) => void): void {
        try {
            if (!fs.existsSync(this.publicDir)) {
                fs.mkdirSync(this.publicDir, { recursive: true });
            }
            cb(null, this.publicDir);
        } catch (error) {
            cb(error as Error, '');
        }
    }

    private _getFilename(req: Request, file: MulterFile, cb: (error: Error | null, filename: string) => void): void {
        const productName = req.body.name;
        const fileExtension = path.extname(file.originalname);
        cb(null, `${productName}${fileExtension}`);
    }

    public getUploader(): multer.Multer {
        return this.upload;
    }

    public removeFileFromStorage(mediaPath: { path: string }[]) {
        mediaPath.forEach((media) => {
            const filePath = path.join(this.publicDir, media.path);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }
}

const publicDir = path.join(__dirname, '..', '..', 'public');

export default new FileUtilities(publicDir);
