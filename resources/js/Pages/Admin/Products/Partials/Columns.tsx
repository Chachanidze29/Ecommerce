import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Actions } from "@/Pages/Admin/Products/Partials/Actions";
import { Category, Product } from "@/types/models";

export const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return (
                <Link
                    href={route("admin.products.show", row.original.id)}
                    className="font-medium hover:underline"
                >
                    {row.getValue("name")}
                </Link>
            );
        },
    },
    {
        accessorKey: "sku",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: "price",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: "categories",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const categories: Category[] = row.getValue("categories");
            return (
                <div className="flex gap-1">
                    {categories.map((category) => {
                        return (
                            <Link
                                key={category.id}
                                href={route(
                                    "admin.categories.show",
                                    category.id
                                )}
                                className="font-medium hover:underline"
                            >
                                {category.name + ","}
                            </Link>
                        );
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const date = row.getValue("created_at") as string;
            return new Date(date).toLocaleDateString();
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex justify-end">
                    <Actions product={row.original} />
                </div>
            );
        },
    },
];
