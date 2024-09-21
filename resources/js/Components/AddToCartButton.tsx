import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { CartItem } from "@/types/models";
import { router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MouseEventHandler, useState } from "react";

type CartItemProp = {
    id: number;
    quantity: number;
    price: number;
};

export const AddToCartButton = ({
    item,
    className,
}: {
    item: CartItemProp;
    className?: string;
}) => {
    const { toast } = useToast();
    const { t } = useLaravelReactI18n();

    const [loading, setLoading] = useState(false);

    const handleAddProduct: MouseEventHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        router.post(
            route("cart.create"),
            {
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const {
                        flash: { success, error },
                    } = page.props as unknown as PageProps;
                    toast({
                        title: t(error || success),
                        variant: error ? "destructive" : "default",
                    });
                },
                onFinish: () => {
                    setLoading(false);
                },
            }
        );
    };

    return (
        <Button
            onClick={handleAddProduct}
            className={cn("p-2", className)}
            type="button"
            disabled={loading}
        >
            {loading ? "Adding..." : "Add To Cart"}{" "}
        </Button>
    );
};

export default AddToCartButton;
