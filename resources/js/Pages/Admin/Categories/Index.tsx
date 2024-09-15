import { DataTable } from "@/Components/DataTable";
import H1 from "@/Components/Typography/H1";
import AdminLayout from "@/Layouts/AdminLayout";
import { Category } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { columns } from "@/Pages/Admin/Categories/Partials/Columns";
import { Button } from "@/Components/ui/button";

export default function Index({ categories }: { categories: Category[] }) {
    return (
        <AdminLayout>
            <Head title="Categories" />
            <div className="flex flex-row justify-between">
                <H1>Manage Categories</H1>
                <Button>
                    <Link href={route("admin.categories.create")}>
                        Add New Category
                    </Link>
                </Button>
            </div>
            <DataTable
                data={categories}
                columns={columns}
                filterBy="name"
                massDeleteRoute="admin.categories.massDelete"
            />
        </AdminLayout>
    );
}
