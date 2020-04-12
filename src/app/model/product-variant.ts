export interface ProductVariant {
    variantID: string;
    name: string;
    options: Option[];
}

export interface Option {
    variantOptionsID: string;
    value: string;
}
