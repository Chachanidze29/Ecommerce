import AdminLayout from "@/Layouts/AdminLayout";
import { Product } from "@/types/models";
import { Head } from "@inertiajs/react";

export default function Show({ product }: { product: Product }) {
    return (
        <AdminLayout>
            <Head title={product.name} />
        </AdminLayout>
    );
}
