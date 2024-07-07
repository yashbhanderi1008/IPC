import { NextFunction, Request, Response } from 'express';
import { ProductService, productService } from '@services';

class ProductController {
    private _productService: ProductService;

    constructor(productService: ProductService) {
        this._productService = productService;
        this.createProduct = this.createProduct.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this)
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    public async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newProduct = req.body;
            console.log(req);

            if (req.file) {
                console.log(req.file.path, "werty");

                let path = req.file.path.split('public')[1].replace(/\\/g, '/');
                const url = `http://localhost:8080/public${path}`;
                console.log(url);

                newProduct.imageUrl = url;
            }

            const product = await this._productService.createProduct(newProduct);

            res.status(201).json({ message: "Product listed successfully", data: product });
        } catch (error: any) {
            next(error);
        }
    }

    public async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productId = req.params.id;

            const product = await this._productService.getProductById(productId);

            res.status(201).json({ data: product });
        } catch (error: any) {
            next(error)
        }
    }

    public async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await this._productService.getAllProducts();

            res.status(201).json({ data: products });
        } catch (error: any) {
            next(error)
        }
    }

    public async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productId = req.params.id;
            const updateData = req.body;

            const product = await this._productService.updateProduct(productId, updateData);

            res.status(200).json({ message: 'Product updated successfully', data: product });
        } catch (error: any) {
            next(error)
        }
    }

    public async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productId = req.params.id;

            await this._productService.deleteProduct(productId);

            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error: any) {
            next(error)
        }
    }
}

export default new ProductController(productService);
