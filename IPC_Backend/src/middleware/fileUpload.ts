import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fileUtilities, { FileUtilities } from '../utils/fileUtility';
import CustomError from '../utils/customError';

class Upload {
  private _uploader: multer.Multer;

  constructor(fileUtilities: FileUtilities) {
    this._uploader = fileUtilities.getUploader();
    this.uploadFile = this.uploadFile.bind(this)
  }

  public uploadFile(req: Request, res: Response, next: NextFunction) {
    this._uploader.single('file')(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return next(new CustomError(400, err.message));
      } else if (err) {
        return next(new CustomError(500, 'Something went wrong, Please try again later.'));
      }

      next();
    });
  }
}

export default new Upload(fileUtilities);
