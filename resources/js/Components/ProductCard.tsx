import { Product } from "@/types/models";
import { Link } from "@inertiajs/react";
import AddToCartButton from "@/Components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={route("product.show", product)}>
            <div className="border flex flex-col justify-between rounded-lg p-4 shadow-md transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2 text-lg font-bold">${product.price}</p>
                <AddToCartButton
                    item={{
                        id: product.id,
                        quantity: 1,
                        price: product.price ?? 0.0,
                    }}
                />
            </div>
        </Link>
    );
}
