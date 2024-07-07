import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt, { JwtPayload } from 'jsonwebtoken'
import CustomError from "../utils/customError";
import { UserInterface } from "@interface";
import { User } from "@models";

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface,
        }
    }
}

export class AuthenticateUser {
    private User: mongoose.Model<UserInterface>

    constructor(userModel: mongoose.Model<UserInterface>) { 
        this.User = userModel;
        this.authorizeUser = this.authorizeUser.bind(this);
    }

    async authorizeUser(req: Request, res: Response, next: NextFunction) {
        let token: string | undefined = req.header('Authorization');

        if (!token) {
            return next(new CustomError(400, 'Token is not set in header of request'))
        }

        token = token.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
        const user: UserInterface | null = await this.User.findById(decodedToken.userId);

        if (!user) {
            return next(new CustomError(401, 'The Username and Password you have entered is Incorrect.'))
        }

        req.user = user;
        next();
    }

}

export default new AuthenticateUser(User)