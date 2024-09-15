import { Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FormEventHandler } from "react";

import { Button } from "@/Components/ui/button";
import { FormInputText } from "@/Components/FormInputs/FormInputText";
import { FormInputTextarea } from "@/Components/FormInputs/FormInputTextarea";
import { FormType, CategoryForm } from "@/types/form";
import FormInputMultiSelect from "@/Components/FormInputs/FormInputMultiselect";
import { Category, Product } from "@/types/models";
import FormInputSelect from "@/Components/FormInputs/FormInputSelect";

export function Form({
    type,
    initialData,
    categoryId,
    categories,
    products,
}: {
    type: FormType;
    initialData: CategoryForm;
    categoryId?: number;
    categories: Category[];
    products: Product[];
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors } = useForm<CategoryForm>({
        ...initialData,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route("admin.categories.store"));
                break;
            case FormType.Edit:
                post(route("admin.categories.update", categoryId));
                break;
            default:
                break;
        }
    };

    const submitButtonText = {
        [FormType.Create]: "Add",
        [FormType.Edit]: "Save",
    }[type];

    return (
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col gap-6">
            <div className="grid items-start gap-4 sm:grid-cols-2">
                <FormInputText
                    id="name"
                    type="text"
                    label={t("Name")}
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                />

                <FormInputTextarea
                    id="description"
                    label={t("Description")}
                    value={data.description || ""}
                    onChange={(e) => setData("description", e.target.value)}
                    error={errors.description}
                />

                <FormInputSelect
                    label={t("Parent category")}
                    placeholder={t("Select a parent category")}
                    value={data.parent?.toString() || ""}
                    options={categories}
                    onChange={(value) => {
                        const category = categories.find(
                            (category) => category.id === parseInt(value)
                        );
                        setData("parent", category?.id || null);
                    }}
                    error={errors.parent}
                />

                <FormInputMultiSelect
                    id="products"
                    label={t("Products")}
                    options={products}
                    selectedOptions={data.products}
                    onChange={(options) => setData("products", options)}
                    error={errors.products}
                />
            </div>

            <div className="flex flex-grow items-end justify-between">
                <Button variant="ghost" asChild>
                    <Link href={route("admin.products.index")}>
                        {t("Back")}
                    </Link>
                </Button>
                <Button type="submit" disabled={processing}>
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
