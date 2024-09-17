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
import { FormType } from "@/types/form";
import { Category } from "@/types/models";

const initialData = {
    id: 0,
    name: "",
    sku: "",
    description: "",
    thumbnail: undefined,
    enabled: true,
    price: null,
    categories: [],
};

export default function Create({ categories }: { categories: Category[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t("Add Product")} />

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t("Add Product")}</CardTitle>
                    <CardDescription>
                        {t("Create and add a new product")}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                    <Form
                        type={FormType.Create}
                        categories={categories}
                        initialData={initialData}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
