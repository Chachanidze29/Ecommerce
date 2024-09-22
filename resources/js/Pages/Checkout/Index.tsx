import FormInputText from "@/Components/FormInputs/FormInputText";
import {
    AccordionItem,
    Accordion,
    AccordionTrigger,
    AccordionContent,
} from "@/Components/ui/accordion";
import { Cart } from "@/types/models";
import { Head, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import ShippingMethod from "./Partials/ShippingMethod";
import BillingMethod from "./Partials/BillingMethod";
import { H3 } from "@/Components/Typography/H3";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import InputLabel from "@/Components/InputLabel";
import { CartInformation } from "./Partials/CartInformation";
import { StepBack } from "lucide-react";
import PaymentMethod from "./Partials/PaymentMethod";

export type CheckoutData = {
    email: string;
    billing_same: boolean;
    shipping: ShippingAndBillingData;
    billing: ShippingAndBillingData;
};

export type ShippingAndBillingData = {
    first_name: string;
    last_name: string;
    phone_number: string;
    country: string;
    zip_code: string;
    city: string;
    address: string;
};

export type PaymentMethodData = ShippingAndBillingData & { email: string };

export type ShippingAndBillingFormErrors = Partial<
    Record<keyof ShippingAndBillingData, string>
>;

export type ShippingAndBillingMethodProps = {
    data: ShippingAndBillingData;
    setData: (key: keyof ShippingAndBillingData, value: string) => void;
    errors: ShippingAndBillingFormErrors;
};

enum AccordionTypes {
    ShippingMethod = "shipping_method",
    PaymentMethod = "payment_method",
}

export default function Index({ cart }: { cart: Cart }) {
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors } = useForm<CheckoutData>({
        email: "",
        billing_same: true,
        shipping: {
            first_name: "",
            last_name: "",
            phone_number: "",
            country: "",
            zip_code: "",
            city: "",
            address: "",
        },
        billing: {
            first_name: "",
            last_name: "",
            phone_number: "",
            country: "",
            zip_code: "",
            city: "",
            address: "",
        },
    });

    const setShippingData = (
        name: keyof ShippingAndBillingData,
        value: string
    ) => {
        setData("shipping", {
            ...data.shipping,
            [name]: value,
        });
    };

    const setBillingData = (
        name: keyof ShippingAndBillingData,
        value: string
    ) => {
        setData("billing", {
            ...data.billing,
            [name]: value,
        });
    };

    const billingErrors: ShippingAndBillingFormErrors = {};
    const shippingErrors: ShippingAndBillingFormErrors = {};
    Object.entries(errors).forEach(([key, message]) => {
        if (key.startsWith("billing.")) {
            const billingKey = key.replace(
                "billing.",
                ""
            ) as keyof ShippingAndBillingData;
            billingErrors[billingKey] = message;
        } else if (key.startsWith("shipping.")) {
            const shippingKey = key.replace(
                "shipping.",
                ""
            ) as keyof ShippingAndBillingData;
            shippingErrors[shippingKey] = message;
        }
    });

    const [activeAccordion, setActiveAccordion] = useState<AccordionTypes>(
        AccordionTypes.ShippingMethod
    );

    const handleContinueToPayment = () => {
        post(route("checkout.shipping"), {
            onSuccess: () => {
                setActiveAccordion(AccordionTypes.PaymentMethod);
            },
        });
    };

    return (
        <main>
            <Head title="Checkout" />
            <div className="flex justify-center bg-gray-200 min-h-screen">
                <div className="basis-1/3 bg-white p-2">
                    <StepBack
                        className="m-2 cursor-pointer"
                        onClick={() => {
                            window.history.back();
                        }}
                    />
                    <form
                        className="m-2 p-2"
                        onSubmit={() => post("/checkout")}
                    >
                        <FormInputText
                            id="email"
                            type="email"
                            label={t("Email")}
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />
                        <Accordion
                            type="single"
                            value={activeAccordion}
                            onValueChange={(value) =>
                                setActiveAccordion(value as AccordionTypes)
                            }
                            collapsible
                        >
                            <AccordionItem
                                value={AccordionTypes.ShippingMethod}
                            >
                                <AccordionTrigger>
                                    <H3>{t("Shipping Information")}</H3>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ShippingMethod
                                        data={data.shipping}
                                        setData={setShippingData}
                                        errors={shippingErrors}
                                    />
                                    <div className="flex m-2 gap-2 items-center">
                                        <InputLabel
                                            value={t(
                                                "Shipping address is the same as billing"
                                            )}
                                        />
                                        <Switch
                                            checked={data.billing_same}
                                            onCheckedChange={(value) =>
                                                setData("billing_same", value)
                                            }
                                        />
                                    </div>

                                    {!data.billing_same && (
                                        <BillingMethod
                                            data={data.billing}
                                            setData={setBillingData}
                                            errors={billingErrors}
                                        />
                                    )}

                                    <Button
                                        type="button"
                                        onClick={handleContinueToPayment}
                                        className="mt-4"
                                        disabled={processing}
                                    >
                                        {t("Continue to Payment")}
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value={AccordionTypes.PaymentMethod}>
                                <AccordionTrigger
                                    className="cursor-pointer"
                                    disabled={true}
                                >
                                    <H3>{t("Payment Method")}</H3>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <PaymentMethod
                                        data={{
                                            email: data.email,
                                            ...data.billing,
                                        }}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </form>
                </div>
                <CartInformation cart={cart} />
            </div>
        </main>
    );
}
