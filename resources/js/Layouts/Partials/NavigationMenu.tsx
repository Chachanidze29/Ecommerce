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
import { Category } from "@/types/models";
import { Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Navigation = ({ categories }: { categories: Category[] }) => {
    const { t } = useLaravelReactI18n();

    return (
        <NavigationMenu className="flex basis-4/12 items-end justify-end">
            <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                active={route().current("catalog")}
            >
                <Link href={route("catalog")}>{t("Catalog")}</Link>
            </NavigationMenuLink>
            <NavigationMenuList>
                {categories.map((category) =>
                    category.sub_categories &&
                    category.sub_categories.length > 0 ? (
                        <NavigationMenuItem key={category.id}>
                            <NavigationMenuTrigger
                                onClick={() =>
                                    router.visit(route("category", category))
                                }
                            >
                                {t(category.name)}
                            </NavigationMenuTrigger>

                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4">
                                    {category.sub_categories.map(
                                        (subCategory) => (
                                            <NavigationMenuLink
                                                active={route().current(
                                                    "category",
                                                    subCategory.name
                                                )}
                                                key={subCategory.id}
                                            >
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
                                            </NavigationMenuLink>
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
                                <Link href={route("category", category.name)}>
                                    {t(category.name)}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navigation;
