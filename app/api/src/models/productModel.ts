import mongoose from 'mongoose';
import { Product, UpdateProduct } from '@e-cart/types';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
        type: Number,
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            image: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, 'please enter product category'],
        enum: {
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
            ],
            message: 'Please select correct category',
        },
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [20, 'Product stock cannot exceed 20'],
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    Reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export const ProductModel = mongoose.model('Product', productSchema);
export const getAllProducts = () => ProductModel.find();
export const createProduct = (product: Product) => ProductModel.create(product);
export const getProductById = (id: string) => ProductModel.findById(id);
export const updateProductById = (id: string, updatedItems: UpdateProduct) =>
    ProductModel.findByIdAndUpdate(id, updatedItems, { new: true, runValidators: true });
export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({ _id: id });
export const insertProductData = (data: Product[]) => ProductModel.insertMany(data);
export const deleteProductData = () => ProductModel.deleteMany();
