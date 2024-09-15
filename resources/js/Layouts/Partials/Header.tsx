import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Navigation from "@/Layouts/Partials/NavigationMenu";
import AccountIcon from "@/Components/AccountIcon";
import HeartSolidIcon from "@/Components/HeartSolidIcon";

const Header = () => {
    const { categories, auth } = usePage<PageProps>().props;

    return (
        <header className="flex py-2 h-16 justify-between items-center shadow-sm sm:rounded-lg">
            <div className="basis-4/12">
                <Link href={route("home")}>Home</Link>
            </div>
            <Navigation categories={categories} />
            <div className="basis-4/12 flex justify-end items-center gap-2">
                <Link
                    href=""
                    // href={route("wishlist")}
                >
                    <HeartSolidIcon />
                </Link>
                <AccountIcon user={auth.user ?? null} />
            </div>
        </header>
    );
};

export default Header;
