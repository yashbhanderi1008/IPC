import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";

export class RoleAuthorize{
    private endUsers: string[];

    constructor(endUsers: string[]){
        this.endUsers = endUsers;
        this.authorizeUser = this.authorizeUser.bind(this);
    }

    public authorizeUser(req: Request, res: Response, next: NextFunction){
        const role = req.user?.role;

        if(!this.endUsers.includes(role!)){
            return next(new CustomError(401, 'You are not authorized to perform this action'))
        }

        next();
    }
}

export default RoleAuthorize;