import { Cart, Category, Product, User } from "@/types/models";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    categories: Category[];
    flash: {
        success: string;
        error: string;
    };
    cart: Cart;
    config: {
        stripe_key: string;
    };
};

export type MenuItem = {
    name: string;
    url: string;
    children?: MenuItem[];
};

export type SelectOption = {
    id: number;
    name: string;
};

export interface Pagination {
    data: Product[];
    links: PaginationLink[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
