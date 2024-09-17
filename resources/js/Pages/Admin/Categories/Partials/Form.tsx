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
import { Switch } from "@/Components/ui/switch";
import InputLabel from "@/Components/InputLabel";

export function Form({
    type,
    initialData,
    categories,
    products,
}: {
    type: FormType;
    initialData: CategoryForm;
    categories: Category[];
    products: Product[];
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<CategoryForm>({
            ...initialData,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route("admin.categories.store"));
                break;
            case FormType.Edit:
                put(route("admin.categories.update", data.id));
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
            <div className="flex gap-2 items-center">
                <InputLabel value="Enable Category" />
                <Switch
                    checked={data.enabled}
                    onCheckedChange={(value) => setData("enabled", value)}
                />
            </div>

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
                    value={data.parent_category?.toString() || ""}
                    options={categories}
                    onChange={(value) => {
                        const category = categories.find(
                            (category) => category.id === parseInt(value)
                        );
                        setData("parent_category", category?.id || null);
                    }}
                    error={errors.parent_category}
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
                    <Link href={route("admin.categories.index")}>
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
