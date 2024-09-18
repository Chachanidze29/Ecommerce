import { DataTable } from "@/Components/DataTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Category } from "@/types/models";
import { Head } from "@inertiajs/react";
import { columns } from "@/Pages/Admin/Products/Partials/Columns";
import { Card, CardContent } from "@/Components/ui/card";
import { useLaravelReactI18n } from "laravel-react-i18n";
import H1 from "@/Components/Typography/H1";

export default function Show({ category }: { category: Category }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={category.name} />
            <Card className="flex flex-grow flex-col">
                <CardContent className="flex flex-grow flex-col m-1">
                    <section>
                        <H1>{t("Name")}</H1>
                        <p>{category.name}</p>
                    </section>

                    <section>
                        <H1>{t("Description")}</H1>
                        <p>{category.description}</p>
                    </section>
                    <section className="flex flex-grow flex-col">
                        <H1>{t("Products")}</H1>
                        <DataTable
                            data={category.products}
                            columns={columns}
                            filterBy="name"
                            massDeleteRoute="admin.products.massDelete"
                        />
                    </section>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
