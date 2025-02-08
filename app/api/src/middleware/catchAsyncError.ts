import { Request, Response, NextFunction } from 'express-serve-static-core';

const catchAsyncError = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(func(req, res, next)).catch(next);
    };
};

export default catchAsyncError;
