import { Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FormEventHandler } from "react";

import { Button } from "@/Components/ui/button";
import { FormInputFile } from "@/Components/FormInputs/FormInputFile";
import { FormInputText } from "@/Components/FormInputs/FormInputText";
import { FormInputTextarea } from "@/Components/FormInputs/FormInputTextarea";
import { FormType, ProductForm } from "@/types/form";
import { Switch } from "@/Components/ui/switch";
import InputLabel from "@/Components/InputLabel";
import FormInputNumber from "@/Components/FormInputs/FormInputNumber";

export function Form({
    type,
    initialData,
    productId,
}: {
    type: FormType;
    initialData: ProductForm;
    productId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors } = useForm<ProductForm>({
        ...initialData,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route("admin.products.store"));
                break;
            case FormType.Edit:
                post(route("admin.products.update", productId));
                break;
            default:
                break;
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData("thumbnail", e.target.files[0]);
        }
    };

    const submitButtonText = {
        [FormType.Create]: "Add",
        [FormType.Edit]: "Save",
    }[type];

    return (
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col gap-6">
            <div className="flex gap-2 items-center">
                <InputLabel value="Enable Product" />
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

                <FormInputText
                    id="sku"
                    type="text"
                    label={t("SKU")}
                    value={data.sku}
                    onChange={(e) => setData("sku", e.target.value)}
                    error={errors.sku}
                />

                <FormInputText
                    id="price"
                    type="text"
                    label={t("Price")}
                    value={String(data.price || 0.0)}
                    onChange={(e) =>
                        setData("price", parseFloat(e.target.value))
                    }
                    error={errors.sku}
                />

                <FormInputFile
                    id="thumbnail"
                    type={type}
                    label={t("Thumbnail")}
                    onChange={handleFileChange}
                    error={errors.thumbnail}
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
