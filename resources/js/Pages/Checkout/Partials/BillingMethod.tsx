import FormSection from "./Form";
import { CheckoutData, CheckoutFormErrors } from "../Index";

interface BillingMethodProps {
    data: CheckoutData;
    setData: (key: keyof CheckoutData, value: string | number) => void;
    errors: CheckoutFormErrors;
}

export const BillingMethod = ({
    data,
    setData,
    errors,
}: BillingMethodProps) => {
    return (
        <FormSection
            prefix="billing"
            data={data}
            setData={setData}
            errors={errors}
        />
    );
};

export default BillingMethod;
