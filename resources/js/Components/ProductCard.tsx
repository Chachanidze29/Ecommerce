import { Product } from "@/types/models";
import { Link } from "@inertiajs/react";

export default function ProductCard({ product }: { product: Product }) {
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
            </div>
        </Link>
    );
}
