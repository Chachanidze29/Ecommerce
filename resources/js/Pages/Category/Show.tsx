import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Category as CategoryType } from "@/types/models";
import { Head } from "@inertiajs/react";

export default function Category({ category }: { category: CategoryType }) {
    return (
        <AuthenticatedLayout>
            <Head title={category.name} />
        </AuthenticatedLayout>
    );
}
