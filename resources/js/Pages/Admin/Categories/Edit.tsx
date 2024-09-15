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
import { CategoryForm, FormType } from "@/types/form";
import { Category, Product } from "@/types/models";

export default function Edit({
    categories,
    products,
    categoryId,
    category,
}: {
    categories: Category[];
    products: Product[];
    categoryId: number;
    category: CategoryForm;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t("Edit Category")} />

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t("Edit Category")}</CardTitle>
                    <CardDescription>
                        {t("Create and add a new category")}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                    <Form
                        type={FormType.Create}
                        categoryId={categoryId}
                        initialData={category}
                        categories={categories}
                        products={products}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
