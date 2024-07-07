import mongoose, { Schema } from 'mongoose';
import { CategoryInterface } from '@interface';

const CategorySchema = new mongoose.Schema<CategoryInterface>(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true,
            unique: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model<CategoryInterface>('Category', CategorySchema);

export default Category;