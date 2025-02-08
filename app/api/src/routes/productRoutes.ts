import { deleteProduct, getProducts, getSingleProduct, newProduct, updateProduct } from '@controllers';
import { Router } from 'express';

export const productRoutes = (router: Router) => {
    router.get('/products', getProducts);
    router.post('/product/new', newProduct);
    router.get('/product/:id', getSingleProduct);
    router.patch('/product/:id', updateProduct);
    router.delete('/product/:id', deleteProduct);
};
