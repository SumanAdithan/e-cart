export interface Product {
    name: string;
    price?: number;
    description: string;
    ratings?: number;
    images?: { image: string }[];
    category: string;
    seller: string;
    stock: number;
    numOfReviews?: number;
    reviews?: {
        name: string;
        rating: number;
        comment: string;
    }[];
}

export interface UpdateProduct {
    updatedItems: Partial<Product>;
}
