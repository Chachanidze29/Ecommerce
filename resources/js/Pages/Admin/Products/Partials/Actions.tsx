import { Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { PageProps } from "@/types";
import { Product } from "@/types/models";

export function Actions({ product }: { product: Product }) {
    const { t } = useLaravelReactI18n();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const {
        auth: { user },
    } = usePage<PageProps>().props;

    const handleDelete = () => {
        router.delete(route("admin.products.destroy", product.id), {
            preserveScroll: true,
            onSuccess: () => setIsDeleteDialogOpen(false),
        });
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">{t("Open actions")}</span>
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={route("admin.products.show", product.id)}>
                        {t("View")}
                    </Link>
                </DropdownMenuItem>
                {user?.is_admin && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link
                                href={route("admin.products.edit", product.id)}
                            >
                                {t("Edit")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setIsDeleteDialogOpen(true)}
                        >
                            {t("Delete")}
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t("Delete product")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t(
                                "Are you sure you want to delete this product? This action cannot be undone."
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button onClick={handleDelete}>
                                {t("Delete")}
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenu>
    );
}
