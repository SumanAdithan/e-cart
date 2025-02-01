import { Request, Response } from 'express';

export const getProducts = (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'This route will show all the products in the database' });
};
