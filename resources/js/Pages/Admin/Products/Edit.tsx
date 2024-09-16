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
import { Form } from "@/Pages/Admin/Products/Partials/Form";
import { FormType, ProductForm } from "@/types/form";
import { Category } from "@/types/models";

export default function Edit({
    productId,
    product,
    categories,
}: {
    productId: number;
    product: ProductForm;
    categories: Category[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t("Edit Product")} />

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t("Add Product")}</CardTitle>
                    <CardDescription>
                        {t("Create and add a new product")}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                    <Form
                        type={FormType.Edit}
                        productId={productId}
                        categories={categories}
                        initialData={product}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
