import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import { UserInterface } from '@interface';
import { User } from '@models';


export class UserService {
    private User: mongoose.Model<UserInterface>

    constructor(userModel: mongoose.Model<UserInterface>) {
        this.User = userModel
    }

    async createUser(user: UserInterface) {
        const isExist = await this.User.findOne({ email: user.email });

        if (isExist) {
            throw new Error('User already exist');
        }

        const newUser = await this.User.create(user);
        
        return newUser
    }

    async login(email: string, password: string) {
        const user: UserInterface | null = await this.User.findOne({ email: email })

        if (!user) {
            throw new Error('User not found');
        }

        const isValid = await (user as UserInterface).comparePassword(password);

        if (!isValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY!, { algorithm: 'HS256' })

        return token;
    }
}

export default new UserService(User);