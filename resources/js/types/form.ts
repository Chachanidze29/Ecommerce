export enum FormType {
    Create,
    Edit,
}

export type CategoryForm = {
    enabled: boolean;
    name: string;
    description: string | null;
    parent: number | null;
    products: number[];
};

export type ProductForm = {
    enabled: boolean;
    name: string;
    sku: string;
    description: string | null;
    thumbnail?: File;
    price: number | null;
};
