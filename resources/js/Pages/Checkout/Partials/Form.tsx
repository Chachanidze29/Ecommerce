import FormInputText from "@/Components/FormInputs/FormInputText";
import FormInputNumber from "@/Components/FormInputs/FormInputNumber";
import { CheckoutData, CheckoutFormErrors } from "../Index";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface FormSectionProps {
    prefix: "shipping" | "billing";
    data: CheckoutData;
    setData: (key: keyof CheckoutData, value: string | number) => void;
    errors: CheckoutFormErrors;
}

const Form = ({ prefix, data, setData, errors }: FormSectionProps) => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="flex flex-col gap-2">
            <FormInputText
                id={`${prefix}_first_name`}
                type="text"
                label={t("First Name")}
                value={data[`${prefix}_first_name`] || ""}
                onChange={(e) =>
                    setData(`${prefix}_first_name`, e.target.value)
                }
                error={errors[`${prefix}_first_name`]}
            />
            <FormInputText
                id={`${prefix}_last_name`}
                type="text"
                label={t("Last Name")}
                value={data[`${prefix}_last_name`] || ""}
                onChange={(e) => setData(`${prefix}_last_name`, e.target.value)}
                error={errors[`${prefix}_last_name`]}
            />
            <FormInputText
                id={`${prefix}_phone_number`}
                type="text"
                label={t("Phone Number")}
                value={data[`${prefix}_phone_number`] || ""}
                onChange={(e) =>
                    setData(`${prefix}_phone_number`, e.target.value)
                }
                error={errors[`${prefix}_phone_number`]}
            />
            <FormInputText
                id={`${prefix}_country`}
                type="text"
                label={t("Country")}
                value={data[`${prefix}_country`] || ""}
                onChange={(e) => setData(`${prefix}_country`, e.target.value)}
                error={errors[`${prefix}_country`]}
            />
            <FormInputNumber
                id={`${prefix}_zip_code`}
                label={t("Zip/Postal Code")}
                value={data[`${prefix}_zip_code`] || 0}
                onChange={(e) =>
                    setData(`${prefix}_zip_code`, Number(e.target.value))
                }
                error={errors[`${prefix}_zip_code`]}
            />
            <FormInputText
                id={`${prefix}_city`}
                type="text"
                label={t("City")}
                value={data[`${prefix}_city`] || ""}
                onChange={(e) => setData(`${prefix}_city`, e.target.value)}
                error={errors[`${prefix}_city`]}
            />
            <FormInputText
                id={`${prefix}_address`}
                type="text"
                label={t("Address")}
                value={data[`${prefix}_address`] || ""}
                onChange={(e) => setData(`${prefix}_address`, e.target.value)}
                error={errors[`${prefix}_address`]}
            />
        </div>
    );
};

export default Form;
