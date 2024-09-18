export type Category = {
    id: number;
    name: string;
    description: string;
    products: Product[];
    sub_categories: Category[];
    parent_category: Category;
};

export type Product = {
    id: number;
    sku: string;
    name: string;
    description?: string;
    price?: string;
    thumbnail?: string;
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

export type Cart = {
    id: number;
    customer?: User;
    session_id?: string;
    items: CartItem[];
    items_sum_quantity: number;
};

export type CartItem = {
    cart: Cart;
    product: Product;
    quantity: number;
    price: number;
};
