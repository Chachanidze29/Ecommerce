import { Image } from "./models";

export enum FormType {
    Create,
    Edit,
}

export type CategoryForm = {
    id: number;
    enabled: boolean;
    name: string;
    description: string | null;
    parent_category: number | null;
    products: number[];
};

export type ProductForm = {
    id: number;
    enabled: boolean;
    name: string;
    sku: string;
    description: string | null;
    images?: Image[];
    price: number | null;
    categories: number[];
};
