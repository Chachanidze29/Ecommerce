import { H3 } from "@/Components/Typography/H3";
import { Cart, ImageType } from "@/types/models";
import { useLaravelReactI18n } from "laravel-react-i18n";

export const CartInformation = ({ cart }: { cart: Cart }) => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="basis-1/3 p-2 mx-5 bg-main text-white h-max">
            <H3>{t("Order Summary")}</H3>
            {cart.items.map((item) => {
                const thumbnail = item.product.images.find(
                    ({ type }) => type === ImageType.Thumbnail
                );

                return (
                    <div
                        key={item.id}
                        className="flex p-5 rounded justify-between items-center h-50 w-50"
                    >
                        <div className="flex gap-2 items-start justify-center">
                            <img
                                className="h-20 w-20 rounded"
                                src={"/storage/" + thumbnail?.path}
                            />
                            <H3>{item.product.name}</H3>
                        </div>
                        <span>{item.price}</span>
                    </div>
                );
            })}
            <div className="mt-4 text-right">
                <H3>
                    {t("Subtotal")}: {cart.subtotal}
                </H3>
            </div>
        </div>
    );
};
