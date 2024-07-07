import { NextFunction, Request, Response } from 'express';
import { CategoryService, categoryService } from '@services';
import { CategoryInterface } from '@interface';

class CategoryController {
    private _categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this._categoryService = categoryService;
        this.createCategory = this.createCategory.bind(this);
        this.getAllCategories = this.getAllCategories.bind(this);
        this.getCategoryById = this.getCategoryById.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    public async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newCategory: Partial<CategoryInterface> = req.body;

            const category = await this._categoryService.createCategory(newCategory);

            res.status(201).json({ message: "Category created successfully", data: category });
        } catch (error: any) {
            next(error)
        }
    }

    public async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await this._categoryService.getAllCategories();

            res.status(201).json({ data: categories });
        } catch (error: any) {
            next(error)
        }
    }

    public async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = req.params.id;

            const category = await this._categoryService.getCategoryById(categoryId);

            res.status(201).json({ data: category });
        } catch (error: any) {
            next(error)
        }
    }

    public async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = req.params.id;
            const updateData: Partial<CategoryInterface> = req.body;

            const category = await this._categoryService.updateCategory(categoryId, updateData);

            res.status(200).json({ message: 'Category updated successfully', data: category });
        } catch (error: any) {
            next(error)
        }
    }

    public async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = req.params.id;

            await this._categoryService.deleteCategory(categoryId);

            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error: any) {
            next(error)
        }
    }
}

export default new CategoryController(categoryService);
