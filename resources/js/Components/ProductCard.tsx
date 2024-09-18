import { Product } from "@/types/models";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MouseEventHandler, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProductCard({ product }: { product: Product }) {
    const [wasSuccessful, setWasSuccessful] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const { t } = useLaravelReactI18n();

    const {
        flash: { success, error },
    } = usePage<PageProps>().props;

    const handleAddProduct: MouseEventHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        router.post(
            route("cart.create"),
            {
                product_id: product.id,
                quantity: 1,
                price: product.price,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setWasSuccessful(true);
                },
                onFinish: () => {
                    setLoading(false);
                },
            }
        );
    };

    useEffect(() => {
        if (wasSuccessful) {
            toast({
                title: t(error || success),
                variant: error ? "destructive" : "default",
            });
        }
    }, [wasSuccessful]);

    return (
        <Link href="">
            <div className="border flex flex-col justify-between rounded-lg p-4 shadow-md transform transition-transform duration-300 hover:scale-105">
                <img
                    src={"/storage/" + product.thumbnail}
                    alt={product.name}
                    className="w-full h-72 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2 text-lg font-bold">${product.price}</p>
                <Button
                    variant="outline"
                    onClick={handleAddProduct}
                    className="p-2"
                    type="button"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add To Cart"}{" "}
                </Button>
            </div>
        </Link>
    );
}
