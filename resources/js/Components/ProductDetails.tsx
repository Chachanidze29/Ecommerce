import H1 from "@/Components/Typography/H1";
import { H3 } from "@/Components/Typography/H3";
import { Progress } from "@/Components/ui/progress";
import { Product } from "@/types/models";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useState } from "react";
import ItemQtyButtons from "@/Components/ItemQtyButtons";
import AddToCartButton from "@/Components/AddToCartButton";

export default function ProductDetails({ product }: { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const [quantity, setQuantity] = useState(1);

    const handleImageClick = (index: number) => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex(index);
            setFade(true);
        }, 200);
    };

    const handlePreviousImage = () => {
        const prevIndex =
            currentImageIndex === 0
                ? product.images.length - 1
                : currentImageIndex - 1;
        handleImageClick(prevIndex);
    };

    const handleNextImage = () => {
        const nextIndex =
            currentImageIndex === product.images.length - 1
                ? 0
                : currentImageIndex + 1;
        handleImageClick(nextIndex);
    };

    const progressValue =
        ((currentImageIndex + 1) / product.images.length) * 100;

    return (
        <div className="flex">
            <div className="flex flex-col gap-4">
                {product.images.map(({ path, alt_text }, index) => (
                    <img
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`max-h-16 max-w-16 object-contain mr-4 cursor-pointer transition-opacity duration-500 ${
                            fade ? "opacity-100" : "opacity-0"
                        } ${
                            index === currentImageIndex
                                ? "border-2 border-black"
                                : "border"
                        }`}
                        src={"/storage/" + path}
                        alt={alt_text}
                    />
                ))}
            </div>
            <div className="flex flex-row gap-3 w-full">
                <div className="basis-1/2">
                    <img
                        className={`object-contain rounded-md mr-4 transition-opacity duration-500 ${
                            fade ? "opacity-100" : "opacity-0"
                        }`}
                        src={
                            "/storage/" + product.images[currentImageIndex].path
                        }
                        alt={product.images[currentImageIndex].alt_text}
                    />
                    <div className="mt-2 flex flex-row justify-between items-center">
                        <Progress
                            max={100}
                            value={progressValue}
                            className="w-full"
                        />
                        <div className="flex justify-between items-center">
                            <ArrowBigLeft
                                onClick={handlePreviousImage}
                                className="cursor-pointer text-gray-500 hover:text-black transition-colors duration-300"
                            />
                            <ArrowBigRight
                                onClick={handleNextImage}
                                className="cursor-pointer text-gray-500 hover:text-black transition-colors duration-300"
                            />
                        </div>
                    </div>
                </div>
                <div className="basis-1/2">
                    <H1>{product.name}</H1>
                    <H3>{product.price}</H3>
                    <p>{product.description}</p>
                    <div className="flex justify-between items-center mt-2">
                        <ItemQtyButtons
                            quantity={quantity}
                            handleIncrement={() => {
                                setQuantity((prevQty) => prevQty + 1);
                            }}
                            handleDecrement={() => {
                                setQuantity((prevQty) => prevQty - 1);
                            }}
                        />
                        <AddToCartButton
                            className="basis-3/4"
                            item={{
                                id: product.id,
                                quantity: quantity,
                                price: product.price ?? 0.0,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
