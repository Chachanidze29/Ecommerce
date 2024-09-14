import { Category } from "@/types/models";
import { Link, router, usePage } from "@inertiajs/react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
    navigationMenuTriggerStyle,
    ListItem,
} from "@/Components/ui/navigation-menu";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";

const Header = () => {
    const { t } = useLaravelReactI18n();
    const { categories, auth } = usePage<PageProps>().props;

    return (
        <header className="flex py-2 h-16 justify-between items-center shadow-sm sm:rounded-lg">
            <div className="basis-4/12">
                <Link href={route("home")}>Home</Link>
            </div>

            <NavigationMenu className="flex basis-4/12 items-end justify-end">
                <NavigationMenuList>
                    {categories.map((category) =>
                        category.sub_categories &&
                        category.sub_categories.length > 0 ? (
                            <NavigationMenuItem key={category.id}>
                                <NavigationMenuTrigger
                                    onClick={() =>
                                        router.visit(
                                            route("category", category)
                                        )
                                    }
                                >
                                    {t(category.name)}
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4">
                                        {category.sub_categories.map(
                                            (subCategory) => (
                                                <Link
                                                    href={route(
                                                        "category",
                                                        subCategory.name
                                                    )}
                                                    key={subCategory.id}
                                                >
                                                    <ListItem>
                                                        {t(subCategory.name)}
                                                    </ListItem>
                                                </Link>
                                            )
                                        )}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ) : (
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
                                    <Link
                                        href={route("category", category.name)}
                                    >
                                        {t(category.name)}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    )}
                </NavigationMenuList>
            </NavigationMenu>

            <div className="basis-4/12 flex justify-end gap-2">
                {!auth?.user ? (
                    <>
                        <Button variant="outline" asChild>
                            <Link href={route("login")}>{t("Log in")}</Link>
                        </Button>
                        <Button asChild>
                            <Link href={route("register")}>
                                {t("Register")}
                            </Link>
                        </Button>
                    </>
                ) : (
                    <Button asChild>
                        <Link href={route("logout")} method="post" as="button">
                            {t("Log Out")}
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;
