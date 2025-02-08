import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import routes from '@routes';
import { errorMiddleware } from '@middleware';

export const createApp = () => {
    const app = express();

    dotenv.config({ path: path.join(__dirname, 'config/config.env') });

    app.use(express.json());
    app.use('/api/v1', routes());
    app.use(errorMiddleware);
    return app;
};
