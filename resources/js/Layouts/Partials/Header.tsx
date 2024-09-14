import { Category } from "@/types/models";
import { Link, usePage } from "@inertiajs/react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Header = () => {
    const { t } = useLaravelReactI18n();
    const categories = (usePage().props.categories || []) as Category[];

    return (
        <header className="flex justify-between items-end shadow-sm sm:rounded-lg">
            <div className="basis-4/12">
                <Link href={route("home")}>Home</Link>
            </div>

            <NavigationMenu className="flex basis-5/12 items-end justify-end">
                <NavigationMenuList>
                    {categories.map((category) => (
                        <NavigationMenuItem
                            key={category.id}
                            className="gap-20"
                        >
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                                active={route().current(
                                    "category",
                                    category.name
                                )}
                            >
                                <Link href={route("category", category.name)}>
                                    {t(category.name)}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};

export default Header;
