import { ImageType, Product } from "@/types/models";
import { Link } from "@inertiajs/react";
import AddToCartButton from "@/Components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
    const thumbnail = product.images.find(
        (image) => image.type === ImageType.Thumbnail
    );
    const hover = product.images.find(
        (image) => image.type === ImageType.Hover
    );

    const truncateDescription = (description?: string) => {
        if (!description) return "";
        return description.length > 40
            ? description.substring(0, 40) + "..."
            : description;
    };

    return (
        <Link href={route("product.show", product)}>
            <div className="border flex flex-col justify-between rounded-lg p-4 shadow-md transform transition-transform duration-300 hover:scale-105 relative overflow-hidden group">
                <div className="relative overflow-hidden">
                    {thumbnail && (
                        <img
                            src={"/storage/" + thumbnail.path}
                            alt={thumbnail.alt_text}
                            className="w-full h-auto max-h-96 object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                    )}
                    {hover && (
                        <img
                            src={"/storage/" + hover.path}
                            alt={hover.alt_text}
                            className="w-full h-auto max-h-96 object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                    )}
                </div>
                <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
                <p className="text-gray-600">
                    {truncateDescription(product.description)}
                </p>
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
