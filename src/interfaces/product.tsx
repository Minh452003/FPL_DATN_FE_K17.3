export interface IProduct{
    id?: string
    product_name?: string;
    product_price?: number;
    product_image?: {
        url?: string;
        publicId?: string;
    };
    sold_quantity?: number;
    stock_quantity?: number;
    description?: string;
    categoryId?: string;
    brandId?: string;
    materialId?: string;
    _id?: string;
    createdAt?: any;
    updatedAt?: string;
}