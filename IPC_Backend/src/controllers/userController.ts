import { NextFunction, Request, Response } from "express";
import { UserInterface } from "@interface";
import { UserService, userService } from "@services";

class UserController {
    private _userService: UserService;

    constructor(userService: UserService) {
        this._userService = userService;
        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this)
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser: UserInterface = req.body;

            await this._userService.createUser(newUser);

            res.status(201).json({ message: "User registered successfully" })
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const email: string = req.body.email;
            const password: string = req.body.password;

            const token = await this._userService.login(email, password);

            res.status(200).json({ message: "User successfully login", data: token })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController(userService)