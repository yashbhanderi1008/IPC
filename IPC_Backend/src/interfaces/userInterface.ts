import { Document } from "mongoose";

interface UserInterface extends Document {
    comparePassword(password: string): boolean;
    username: string,
    email: string,
    password: string,
    role: string,
}

export default UserInterface