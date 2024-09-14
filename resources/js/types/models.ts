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

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    is_admin: boolean;
    phone_number: string;
    personal_number: string;
};
