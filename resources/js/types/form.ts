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
    images?: ImageData[];
    price: number | null;
    categories: number[];
};

export type ImageData = {
    path: File | string;
    type: ImageType;
    alt_text: string;
};

export enum ImageType {
    Thumbnail = "Thumbnail",
    Hover = "Hover",
    Gallery = "Gallery",
}
