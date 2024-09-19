import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

export const ItemQtyButtons = ({
    quantity,
    handleIncrement,
    handleDecrement,
    className,
}: {
    quantity: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
    className?: string;
}) => (
    <div className={cn("flex items-center border-2 rounded p-1", className)}>
        <Button
            variant="outline"
            className="mr-2 border-none"
            onClick={handleDecrement}
        >
            -
        </Button>
        <p className="mr-2">{quantity}</p>
        <Button
            variant="outline"
            className="border-none"
            onClick={handleIncrement}
        >
            +
        </Button>
    </div>
);

export default ItemQtyButtons;
