import {
    useStripe,
    useElements,
    CardElement,
    Elements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { loadStripe } from "@stripe/stripe-js";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PaymentMethodData } from "../Index";

const PaymentForm = ({ data }: { data: PaymentMethodData }) => {
    const { t } = useLaravelReactI18n();
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const handlePayment = async () => {
        setProcessing(true);
        setPaymentError(null);

        if (!stripe || !elements) {
            setProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setProcessing(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            card: cardElement,
            type: "card",
            billing_details: {
                name: `${data.first_name} ${data.last_name}`,
                email: data.email,
                phone: data.phone_number,
                address: {
                    line1: data.address,
                    city: data.city,
                    postal_code: data.zip_code,
                    country: data.country,
                },
            },
        });

        if (error) {
            setPaymentError(error.message || "Payment failed");
            setProcessing(false);
        } else {
            router.post(
                "/checkout",
                {
                    ...data,
                    payment_method_id: paymentMethod.id,
                },
                {
                    onSuccess: () => {
                        setProcessing(false);
                    },
                }
            );
        }
    };

    return (
        <div className="flex flex-col">
            <CardElement className="p-5" />
            {paymentError && <div className="text-red-500">{paymentError}</div>}
            <Button
                className="mt-2"
                onClick={handlePayment}
                disabled={!stripe || processing}
            >
                {processing ? t("Processing...") : t("Pay Now")}
            </Button>
        </div>
    );
};

export const PaymentMethod = ({ data }: { data: PaymentMethodData }) => {
    const {
        config: { stripe_key },
    } = usePage<PageProps>().props;

    const stripePromise = loadStripe(stripe_key);

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm data={data} />
        </Elements>
    );
};

export default PaymentMethod;
