import FormInputText from "@/Components/FormInputs/FormInputText";
import { ShippingAndBillingMethodProps } from "../Index";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Form = ({ data, setData, errors }: ShippingAndBillingMethodProps) => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="flex flex-col gap-2">
            <FormInputText
                id="first_name"
                type="text"
                label={t("First Name")}
                value={data.first_name}
                onChange={(e) => setData("first_name", e.target.value)}
                error={errors.first_name}
            />
            <FormInputText
                id="last_name"
                type="text"
                label={t("Last Name")}
                value={data.last_name}
                onChange={(e) => setData("last_name", e.target.value)}
                error={errors.last_name}
            />
            <FormInputText
                id="phone_number"
                type="text"
                label={t("Phone Number")}
                value={data.phone_number}
                onChange={(e) => setData("phone_number", e.target.value)}
                error={errors.phone_number}
            />
            <FormInputText
                id="country"
                type="text"
                label={t("Country")}
                value={data.country}
                onChange={(e) => setData("country", e.target.value)}
                error={errors.country}
            />
            <FormInputText
                id="zip_code"
                type="text"
                label={t("Zip code")}
                value={data.zip_code}
                onChange={(e) => setData("zip_code", e.target.value)}
                error={errors.zip_code}
            />
            <FormInputText
                id="city"
                type="text"
                label={t("City")}
                value={data.city}
                onChange={(e) => setData("city", e.target.value)}
                error={errors.city}
            />
            <FormInputText
                id="address"
                type="text"
                label={t("Address")}
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
                error={errors.address}
            />
        </div>
    );
};

export default Form;
