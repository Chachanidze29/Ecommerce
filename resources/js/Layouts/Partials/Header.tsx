import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Navigation from "@/Layouts/Partials/NavigationMenu";
import AccountIcon from "@/Components/AccountIcon";
import HeartSolidIcon from "@/Components/HeartSolidIcon";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/Components/ui/button";

const Header = () => {
    const {
        categories,
        auth,
        cart: { items_sum_quantity },
    } = usePage<PageProps>().props;

    return (
        <header className="flex py-2 h-16 justify-between items-center shadow-sm sm:rounded-lg">
            <div className="basis-4/12">
                <Link href={route("home")}>Home</Link>
            </div>
            <Navigation categories={categories} />
            <div className="basis-4/12 flex justify-end items-center gap-2 m-1">
                <Link
                    href=""
                    // href={route("wishlist")}
                >
                    <Button variant="ghost" className="p-2">
                        <HeartSolidIcon />
                    </Button>
                </Link>
                <AccountIcon user={auth.user ?? null} />
                <Link href={route("cart")}>
                    <Button variant="ghost" className="p-2">
                        <FaShoppingCart className="h-6 w-6" />
                        {items_sum_quantity}
                    </Button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
