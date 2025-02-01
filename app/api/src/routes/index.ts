import { Router } from 'express';
import { productRoutes } from './productRoutes';

const router = Router();

export default (): Router => {
    productRoutes(router);
    return router;
};
