import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/Components/ui/sheet";
import { MenuItem } from "@/types";
import { Link } from "@inertiajs/react";

const menuItems: MenuItem[] = [
    {
        name: "Catalog",
        url: "",
        children: [
            { name: "Products", url: route("admin.products.index") },
            { name: "Categories", url: route("admin.categories.index") },
        ],
    },
];

export const SideMenu = () => (
    <div className="h-4/5 bg-brown-400 flex flex-col">
        <Sheet>
            {menuItems.map((menuItem) => {
                return (
                    <div key={menuItem.url}>
                        <SheetTrigger asChild>
                            <Button variant="outline">{menuItem.name}</Button>
                        </SheetTrigger>

                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>{menuItem.name}</SheetTitle>
                                <SheetDescription>
                                    {menuItem.name} Management
                                </SheetDescription>
                            </SheetHeader>
                            <div className="p-4">
                                <ul>
                                    {menuItem.children &&
                                        menuItem.children.map((childItem) => {
                                            return (
                                                <li key={childItem.url}>
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={childItem.url}
                                                            className="block py-2 hover:text-sky-700"
                                                        >
                                                            {childItem.name}
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </SheetContent>
                    </div>
                );
            })}
        </Sheet>
    </div>
);

export default SideMenu;
