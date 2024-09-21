// ShippingMethod.tsx
import FormSection from "./Form";
import { CheckoutData, CheckoutFormErrors } from "../Index";

interface ShippingMethodProps {
    data: CheckoutData;
    setData: (key: keyof CheckoutData, value: string | number) => void;
    errors: CheckoutFormErrors;
}

export const ShippingMethod = ({
    data,
    setData,
    errors,
}: ShippingMethodProps) => {
    return (
        <FormSection
            prefix="shipping"
            data={data}
            setData={setData}
            errors={errors}
        />
    );
};

export default ShippingMethod;
