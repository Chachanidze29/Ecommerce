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
        name: "Dashboard",
        url: route("admin.dashboard"),
    },
    {
        name: "Catalog",
        url: "",
        children: [
            { name: "Products", url: route("admin.products.index") },
            { name: "Categories", url: route("admin.categories.index") },
        ],
    },
    {
        name: "Sales",
        url: "",
        children: [
            { name: "Orders", url: "dummy" },
            { name: "Invoices", url: "dummy2" },
            { name: "Shipments", url: "dummy3" },
        ],
    },
    {
        name: "Customers",
        url: "",
        // url: route("admin.customers.index"),
    },
    {
        name: "Content",
        url: "",
        children: [
            { name: "Home", url: route("admin.content.home") },
            { name: "Product List Page", url: route("admin.content.plp") },
            { name: "Product Details Page", url: route("admin.content.pdp") },
        ],
    },
    {
        name: "Marketing",
        url: "",
        children: [
            {
                name: "Cart Price Rules",
                url: "cumcum",
                // route("admin.content.home")
            },
            {
                name: "Coupons",
                url: "dumcum",
                // route("admin.content.plp")
            },
        ],
    },
    {
        name: "Stores",
        url: "",
        children: [
            {
                name: "Configuration",
                url: "dumdum",
                // url: route("admin.content.home")
            },
        ],
    },
];

export const SideMenu = () => (
    <div className="h-screen bg-gray-200 flex flex-col gap-4 p-10 py-3">
        {menuItems.map((menuItem) => {
            return menuItem.children ? (
                <Sheet key={menuItem.name}>
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
                </Sheet>
            ) : (
                <Button variant="outline">
                    <Link href={menuItem.url}>{menuItem.name}</Link>
                </Button>
            );
        })}
    </div>
);

export default SideMenu;
