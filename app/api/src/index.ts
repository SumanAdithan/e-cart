import { createApp } from 'createApp';
import { connectDatabase } from '@config';

const app = createApp();
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server running on Port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
