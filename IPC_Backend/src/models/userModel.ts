import mongoose from "mongoose";
import { UserInterface } from "@interface";
import bcrypt from 'bcrypt'


const userShema = new mongoose.Schema<UserInterface>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/, 'Please enter a valid email address']
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: {
                values: ['Admin', 'User'],
                message: 'Role must be User or Admin'
            },
            default: 'User'
        }
    },
    {
        timestamps: true
    }
)

userShema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
        return;
    }
    this.password = await bcrypt.hash(this.password, 12)
    next();
})

userShema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model<UserInterface>('User', userShema)

export default User