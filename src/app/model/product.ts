export interface Product {
    productID: string;
    name: string;
    isActive: boolean;
    sku: Sku[];
    categoryID: string;
}

export interface Sku {
    skuID: string;
    sku: string;
    price: number;
    variantOptions: string[];
    images: string[];
}