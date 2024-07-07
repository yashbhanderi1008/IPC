import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";


class ErrorHandler {
    public static async errorHandlerMiddlerWare(err: CustomError, req: Request, res: Response, next: NextFunction): Promise<void> {
        err.message = err.message || 'Somthing went wrong'
        err.status = err.status || 500
        res.status(err.status).json({ message: err.message })
    }
}

export default ErrorHandler;