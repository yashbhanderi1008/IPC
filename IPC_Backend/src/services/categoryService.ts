import mongoose from 'mongoose';
import { Category } from '@models';
import { CategoryInterface } from '@interface';

export class CategoryService {
    private Category: mongoose.Model<CategoryInterface>;

    constructor(categoryModel: mongoose.Model<CategoryInterface>) {
        this.Category = categoryModel;
    }

    public async createCategory(newCategory: Partial<CategoryInterface>): Promise<CategoryInterface> {
        const category = new this.Category(newCategory);
        return await category.save();
    }

    public async getAllCategories(): Promise<CategoryInterface[]> {
        return await this.Category.find().exec();
    }

    public async getCategoryById(id: string): Promise<CategoryInterface | null> {
        const category = await this.Category.findById(id).exec();
        if (!category) {
            throw new Error(`Category not found`);
        }
        return category;
    }

    public async updateCategory(categoryId: string, updateData: Partial<CategoryInterface>): Promise<CategoryInterface | null> {
        const category = await this.Category.findByIdAndUpdate(categoryId, updateData, { new: true }).exec();
        if (!category) {
            throw new Error(`Category is not found`);
        }
        return category;
    }

    public async deleteCategory(categoryId: string): Promise<CategoryInterface | null> {
        const category = await this.Category.findByIdAndDelete(categoryId).exec();
        if (!category) {
            throw new Error(`Category is not found`);
        }
        return category;
    }
}

export default new CategoryService(Category);
