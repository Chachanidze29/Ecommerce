import { DataTable } from "@/Components/DataTable";
import H1 from "@/Components/Typography/H1";
import AdminLayout from "@/Layouts/AdminLayout";
import { Product } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { columns } from "@/Pages/Admin/Products/Partials/Columns";
import { Button } from "@/Components/ui/button";

export default function Index({ products }: { products: Product[] }) {
    return (
        <AdminLayout>
            <Head title="Products" />
            <div className="flex flex-row justify-between">
                <H1>Manage Products</H1>
                <Button>
                    <Link href={route("admin.products.create")}>
                        Add New Product
                    </Link>
                </Button>
            </div>
            <DataTable
                data={products}
                columns={columns}
                filterBy="name"
                massDeleteRoute="admin.products.massDelete"
            />
        </AdminLayout>
    );
}
