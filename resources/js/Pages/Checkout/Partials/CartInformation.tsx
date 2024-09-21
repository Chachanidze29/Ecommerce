import { Cart } from "@/types/models";
import { useLaravelReactI18n } from "laravel-react-i18n";

export const CartInformation = ({ cart }: { cart: Cart }) => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="basis-1/3 p-2">
            <h1>{t("Order Summary")}</h1>
            {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                    <span>{item.product.name}</span>
                    <span>{item.price}</span>
                </div>
            ))}
            <div className="mt-4">
                <h2>
                    {t("Total")}: {cart.subtotal}
                </h2>
            </div>
        </div>
    );
};
