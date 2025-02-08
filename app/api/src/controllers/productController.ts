import { NextFunction, Request, Response } from 'express-serve-static-core';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '@models';
import { NewProductDTO, UpdateProductDTO } from '@e-cart/types';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ErrorHandler, sendValidationErrors } from 'utils';
import { catchAsyncError } from '@middleware';

// Get Products - /api/v1/products
export const getProducts = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const product = await getAllProducts();
    res.status(200).json({
        success: true,
        product,
    });
    return;
});

// Create Product - /api/v1/product/new
export const newProduct = catchAsyncError(
    async (req: Request<{}, {}, NewProductDTO>, res: Response, next: NextFunction) => {
        const newProduct = plainToClass(NewProductDTO, req.body);
        const errors = await validate(newProduct);
        if (errors.length > 0) {
            return next(new ErrorHandler('Validation Failed', 404, errors, 'DTOValidationError'));
        }
        const product = await createProduct(newProduct);
        res.status(201).json({ success: true, product });
        return;
    }
);

// Get Single Product - /api/v1/product/:id
export const getSingleProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const product = await getProductById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({ success: true, product });
    return;
});

// Update Product - /api/v1/product/:id
export const updateProduct = catchAsyncError(
    async (req: Request<{ id?: string }, {}, UpdateProductDTO>, res: Response, next: NextFunction) => {
        let product = await getProductById(req.params.id);

        if (!product) {
            return next(new ErrorHandler('Product not found', 404));
        }

        const updatedItems = plainToClass(UpdateProductDTO, req.body);
        const errors = await validate(updatedItems);
        if (errors.length > 0) {
            sendValidationErrors(errors, res);
            return;
        }
        if (Object.keys(updatedItems).length === 0) {
            return next(new ErrorHandler('No update fields provided', 400));
        }
        product = await updateProductById(req.params.id, updatedItems);
        res.status(200).json({ success: true, product });
        return;
    }
);

// Delete Product - /api/v1/product/:id
export const deleteProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let product = await deleteProductById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).send({ success: true });
    return;
});
