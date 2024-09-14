export type Category = {
    id: number;
    name: string;
    description: string;
    parent_id: number;
    products: Product[];
    sub_categories: Category[];
    parent_category: Category;
};

export type Product = {
    sku: string;
    name: string;
    description?: string;
    price?: string;
    image?: string;
};
