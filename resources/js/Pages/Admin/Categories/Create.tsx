import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Form } from "@/Pages/Admin/Categories/Partials/Form";
import { FormType } from "@/types/form";
import { Category, Product } from "@/types/models";

const initialData = {
    name: "",
    description: "",
    parent: null,
    products: [],
    enabled: true,
};

export default function Create({
    categories,
    products,
}: {
    categories: Category[];
    products: Product[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t("Add Category")} />

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t("Add Category")}</CardTitle>
                    <CardDescription>
                        {t("Create and add a new category")}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                    <Form
                        type={FormType.Create}
                        initialData={initialData}
                        categories={categories}
                        products={products}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
