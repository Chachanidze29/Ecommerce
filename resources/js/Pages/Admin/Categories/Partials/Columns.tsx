import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Actions } from "@/Pages/Admin/Categories/Partials/Actions";
import { Category } from "@/types/models";

export const columns: ColumnDef<Category>[] = [
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
                    href={route("admin.categories.show", row.original.id)}
                    className="font-medium hover:underline"
                >
                    {row.getValue("name")}
                </Link>
            );
        },
    },
    {
        accessorKey: "parent_category",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const category: Category = row.getValue("parent_category");
            return category ? (
                <Link
                    href={route("admin.categories.show", row.original.id)}
                    className="font-medium hover:underline"
                >
                    {category.name}
                </Link>
            ) : (
                "None"
            );
        },
    },
    {
        accessorKey: "products_count",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
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
                    <Actions category={row.original} />
                </div>
            );
        },
    },
];
