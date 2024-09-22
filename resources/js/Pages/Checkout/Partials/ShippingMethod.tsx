import FormSection from "./Form";
import { ShippingAndBillingMethodProps } from "../Index";

export const ShippingMethod = ({
    data,
    setData,
    errors,
}: ShippingAndBillingMethodProps) => {
    return <FormSection data={data} setData={setData} errors={errors} />;
};

export default ShippingMethod;
