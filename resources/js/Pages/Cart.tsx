import MainLayout from "@/Layouts/MainLayout";
import { Cart as CartType, CartItem } from "@/types/models";
import { Button } from "@/Components/ui/button";
import { Head, Link, router } from "@inertiajs/react";
import { MouseEventHandler } from "react";

export const Cart = ({ cart }: { cart: CartType }) => {
    const handleClearCart: MouseEventHandler = (e) => {
        e.preventDefault();
        router.delete(route("cart.destroy", cart.id));
    };

    const handleIncrement = (itemId: number) => {
        router.patch(route("cart.item.increment", itemId));
    };

    const handleDecrement = (itemId: number) => {
        router.patch(route("cart.item.decrement", itemId));
    };

    const handleRemove = (itemId: number) => {
        router.delete(route("cart.item.destroy", itemId));
    };

    const renderCartItems = (items: CartItem[]) => {
        return items.map((item) => (
            <div
                key={item.product.id}
                className="flex justify-between items-center py-4 border-b"
            >
                <div className="flex items-center">
                    <img
                        src={"/storage/" + item.product.thumbnail}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">
                            {item.product.name}
                        </h2>
                        <p className="text-gray-600">${item.price}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <p className="mr-4">Quantity: {item.quantity}</p>
                    <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() => handleDecrement(item.id)}
                    >
                        -
                    </Button>
                    <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() => handleIncrement(item.id)}
                    >
                        +
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleRemove(item.id)}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        ));
    };

    return (
        <MainLayout>
            <Head title="Card" />
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Your Cart
                </h1>
                {cart.items_sum_quantity > 0 ? (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold mr-4">
                            Total Quantity: {cart.items_sum_quantity}
                        </h2>
                        <div>{renderCartItems(cart.items)}</div>
                        <div className="flex justify-end gap-3 items-center">
                            <h2 className="text-lg font-semibold">
                                Subtotal: {cart.subtotal}
                            </h2>
                            <Button variant="default">
                                Proceed to Checkout
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p>Your cart is empty</p>
                        <Button>
                            <Link href={route("home")}>Go Shopping</Link>
                        </Button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Cart;
