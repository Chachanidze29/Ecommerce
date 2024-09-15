import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Category } from "@/types/models";
import { Link } from "@inertiajs/react";

const CategoryBreadCrumbs = ({ category }: { category: Category }) => {
    const renderParent = !!category.parent_category;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href={route("home")}>
                        <BreadcrumbLink>Home</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <Link href={route("home")}>
                        <BreadcrumbLink>Catalog</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                {renderParent && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link
                                href={route(
                                    "category",
                                    category.parent_category
                                )}
                            >
                                <BreadcrumbLink>
                                    {category.parent_category.name}
                                </BreadcrumbLink>
                            </Link>
                        </BreadcrumbItem>
                    </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CategoryBreadCrumbs;
