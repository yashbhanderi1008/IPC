import mongoose from 'mongoose';
import { ProductInterface } from '@interface';

const ProductSchema = new mongoose.Schema<ProductInterface>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true
        },
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Product price must be greater than zero']
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Product category is required']
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model<ProductInterface>('Product', ProductSchema);

export default Product;
