import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import routes from '@routes';

export const createApp = () => {
    const app = express();

    dotenv.config({ path: path.join(__dirname, 'config/config.env') });

    app.use(routes());
    return app;
};
