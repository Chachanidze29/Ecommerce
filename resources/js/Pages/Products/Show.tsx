import ProductDetails from "@/Components/ProductDetails";
import MainLayout from "@/Layouts/MainLayout";
import { Product } from "@/types/models";
import { Head } from "@inertiajs/react";

export default function Show({ product }: { product: Product }) {
    return (
        <MainLayout>
            <Head title={product.name} />
            <ProductDetails product={product} />
        </MainLayout>
    );
}
