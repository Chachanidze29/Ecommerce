import { Cart, Category, User } from "@/types/models";

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
