export enum FormType {
    Create,
    Edit,
}

export type CategoryForm = {
    name: string;
    description: string | null;
    parent: number | null;
    products: number[];
};

export type ProductForm = {
    name: string;
    sku: string;
    description: string | null;
    thumbnail?: File;
};
