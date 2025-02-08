import { Type } from 'class-transformer';
import 'reflect-metadata';
import {
    IsString,
    IsNumber,
    IsOptional,
    IsEnum,
    MaxLength,
    Min,
    Max,
    ValidateNested,
    IsArray,
    IsNotEmpty,
    MinLength,
    IsEmail,
} from 'class-validator';

class ImageDTO {
    @IsString({ message: 'Image URL must be a string' })
    @IsNotEmpty({ message: 'Image URL is required' })
    image: string;
}

class ReviewDTO {
    @IsNotEmpty({ message: 'Reviewer name is required' })
    @IsString({ message: 'Reviewer name must be a string' })
    name: string;

    @IsNumber({}, { message: 'Rating must be a number' })
    @IsNotEmpty({ message: 'Rating is required' })
    rating: number;

    @IsString({ message: 'Comment must be a string' })
    @IsNotEmpty({ message: 'Comment is required' })
    comment: string;
}

export class NewProductDTO {
    @IsNotEmpty({ message: 'Please enter the product name' })
    @IsString({ message: 'Product name must be a string' })
    @MaxLength(100, { message: 'Product name cannot exceed 100 characters' })
    name: string;

    @IsNumber({}, { message: 'Price must be a valid number' })
    @IsOptional()
    price?: number = 0.0;

    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Please enter the product description' })
    description: string;

    @IsNumber({}, { message: 'Ratings must be a valid number' })
    @IsOptional()
    ratings?: number = 0;

    @IsArray({ message: 'Images must be an array' })
    @ValidateNested({ each: true })
    @Type(() => ImageDTO)
    @IsOptional()
    images?: ImageDTO[];

    @IsString({ message: 'Category must be a string' })
    @IsNotEmpty({ message: 'Please enter the product category' })
    @IsEnum(
        [
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
        { message: 'Invalid category. Choose from the allowed categories.' }
    )
    category: string;

    @IsString({ message: 'Seller name must be a string' })
    @IsNotEmpty({ message: 'Please enter the seller name' })
    seller: string;

    @IsNumber({}, { message: 'Stock must be a valid number' })
    @IsNotEmpty({ message: 'Please enter the stock quantity' })
    @Min(0, { message: 'Stock cannot be negative' })
    @Max(20, { message: 'Stock cannot exceed 20 items' })
    stock: number;

    @IsNumber({}, { message: 'Number of reviews must be a number' })
    @IsOptional()
    numOfReviews?: number = 0;

    @IsArray({ message: 'Reviews must be an array' })
    @ValidateNested({ each: true })
    @Type(() => ReviewDTO)
    @IsOptional()
    reviews?: ReviewDTO[];
}

export class UpdateProductDTO {
    @ValidateNested()
    @Type(() => NewProductDTO)
    updatedItems: Partial<NewProductDTO>;
}
