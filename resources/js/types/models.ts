export type Category = {
    id: number;
    name: string;
    parent_id: number;
    products: Product[];
};

export type Product = {
    sku: string;
    name: string;
    description?: string;
    price?: string;
    image?: string;
};
