import { DataTable } from "@/Components/DataTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Category } from "@/types/models";
import { Head } from "@inertiajs/react";
import { columns } from "@/Pages/Admin/Products/Partials/Columns";
import { Card, CardContent } from "@/Components/ui/card";
import { useLaravelReactI18n } from "laravel-react-i18n";
import H1 from "@/Components/Typography/H1";
import { H3 } from "@/Components/Typography/H3";

export default function Show({ category }: { category: Category }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={category.name} />
            <Card className="flex flex-grow flex-col">
                <CardContent className="flex flex-grow flex-col m-1">
                    <section>
                        <H3>{t("Name")}</H3>
                        <p>{category.name}</p>
                    </section>

                    <section>
                        <H3>{t("Description")}</H3>
                        <p>{category.description}</p>
                    </section>
                    <section className="flex flex-grow flex-col">
                        <H3>{t("Products")}</H3>
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
