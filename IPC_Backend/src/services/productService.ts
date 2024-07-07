import mongoose from 'mongoose';
import Product from '../models/productModel';
import { ProductInterface } from '@interface';

export class ProductService {
    private Product: mongoose.Model<ProductInterface>;

    constructor(productModel: mongoose.Model<ProductInterface>) {
        this.Product = productModel;
    }

    public async createProduct(newProduct: ProductInterface): Promise<ProductInterface> {
        const product = new this.Product(newProduct);
        return await product.save();
    }

    public async getProductById(productId: string): Promise<ProductInterface | null> {
        const product = await this.Product.findById(productId).exec();
        if (!product) {
            throw new Error(`Product not found`);
        }
        return product;
    }

    public async getAllProducts(): Promise<ProductInterface[]> {
        return await Product.find().populate('category', 'name');
    }

    public async updateProduct(productId: string, updateData: Partial<ProductInterface>): Promise<ProductInterface | null> {
        const product = await this.Product.findByIdAndUpdate(productId, updateData, { new: true }).exec();
        if (!product) {
            throw new Error(`Product is not found`);
        }
        return product;
    }

    public async deleteProduct(productId: string): Promise<void> {
        await Product.findByIdAndDelete(productId);
        const product = await this.Product.findByIdAndDelete(productId).exec();
        if (!product) {
            throw new Error(`Product is not found`);
        }
    }
}

export default new ProductService(Product);
