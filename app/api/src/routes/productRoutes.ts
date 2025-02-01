import { getProducts } from '@controllers';
import { Router } from 'express';

export const productRoutes = (router: Router) => {
    router.get('/products', getProducts);
};
