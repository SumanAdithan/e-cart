import { products } from '@data';
import { deleteProductData, insertProductData } from '@models';
import path from 'path';
import dotenv from 'dotenv';
import { connectDatabase } from '@config';

dotenv.config({ path: path.join(__dirname, '..', 'config/config.env') });
connectDatabase();

const seedProducts = async () => {
    try {
        await deleteProductData();
        console.log('Products deleted!');
        await insertProductData(products);
        console.log('All products added!');
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error while running seeder ${err.message}`);
        } else {
            console.error('An unknown error occured while running seeder');
        }
    }
    process.exit();
};

seedProducts();
