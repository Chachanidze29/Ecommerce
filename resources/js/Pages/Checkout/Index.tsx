import FormInputText from "@/Components/FormInputs/FormInputText";
import {
    AccordionItem,
    Accordion,
    AccordionTrigger,
    AccordionContent,
} from "@/Components/ui/accordion";
import { Cart } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import ShippingMethod from "./Partials/ShippingMethod";
import BillingMethod from "./Partials/BillingMethod";
import { H3 } from "@/Components/Typography/H3";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import InputLabel from "@/Components/InputLabel";
import { CartInformation } from "./Partials/CartInformation";
import H1 from "@/Components/Typography/H1";
import { SkipBackIcon, StepBack, StepBackIcon } from "lucide-react";

export type CheckoutData = {
    email: string;
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_phone_number: string;
    shipping_country: string;
    shipping_zip_code: number;
    shipping_city: string;
    shipping_address: string;
    billing_first_name?: string;
    billing_last_name?: string;
    billing_phone_number?: string;
    billing_country?: string;
    billing_zip_code?: number;
    billing_city?: string;
    billing_address?: string;
};

export type CheckoutFormErrors = Partial<Record<keyof CheckoutData, string>>;

export default function Index({ cart }: { cart: Cart }) {
    const { data, setData, post, processing, errors, reset } =
        useForm<CheckoutData>({
            email: "",
            shipping_first_name: "",
            shipping_last_name: "",
            shipping_phone_number: "",
            shipping_country: "",
            shipping_zip_code: 0,
            shipping_city: "",
            shipping_address: "",
            billing_first_name: "",
            billing_last_name: "",
            billing_phone_number: "",
            billing_country: "",
            billing_zip_code: 0,
            billing_city: "",
            billing_address: "",
        });

    const [activeAccordion, setActiveAccordion] =
        useState<string>("shipping_method");
    const [isBillingSame, setIsBillingSame] = useState<boolean>(true);

    const { t } = useLaravelReactI18n();

    const handleContinueToPayment = () => {
        setActiveAccordion("payment_method");
    };

    const handleCheckboxChange = (value: boolean) => {
        setIsBillingSame(value);
    };

    return (
        <main>
            <Head title="Checkout" />
            <div className="flex justify-center bg-gray-200">
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
                            onValueChange={(value) => setActiveAccordion(value)}
                            collapsible
                        >
                            <AccordionItem value="shipping_method">
                                <AccordionTrigger>
                                    <H3>{t("Shipping Information")}</H3>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ShippingMethod
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                    />
                                    <div className="flex m-2 gap-2 items-center">
                                        <InputLabel
                                            value={t(
                                                "Shipping address is the same as billing"
                                            )}
                                        />
                                        <Switch
                                            checked={isBillingSame}
                                            onCheckedChange={(value) =>
                                                handleCheckboxChange(value)
                                            }
                                        />
                                    </div>

                                    {!isBillingSame && (
                                        <BillingMethod
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                        />
                                    )}

                                    <Button
                                        type="button"
                                        onClick={handleContinueToPayment}
                                        className="mt-4"
                                    >
                                        {t("Continue to Payment")}
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="payment_method">
                                <AccordionTrigger>
                                    <H3>{t("Payment Method")}</H3>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>{t("Payment details go here...")}</p>
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
