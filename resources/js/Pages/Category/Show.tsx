import { Category as CategoryType, Product } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import ProductCard from "@/Components/ProductCard";
import H1 from "@/Components/Typography/H1";
import { H3 } from "@/Components/Typography/H3";
import MainLayout from "@/Layouts/MainLayout";
import CategoryBreadCrumbs from "@/Pages/Category/Partials/Breadcrumbs";

export default function Category({
    category,
    products,
}: {
    category: CategoryType;
    products: Product[];
}) {
    const renderSubLinks =
        category.sub_categories && category.sub_categories.length > 0;

    return (
        <MainLayout>
            <Head title={category.name} />

            <CategoryBreadCrumbs category={category} />

            <div className="bg-main p-5 rounded text-white">
                <H1 className="text-center">{category.name}</H1>
                <H3 className="text-center mt-2">{category.description}</H3>
            </div>

            {renderSubLinks && (
                <div className="flex flex-wrap gap-4 mt-2">
                    {category.sub_categories.map((subCategory) => {
                        return (
                            <Link
                                key={subCategory.id}
                                href={route("category", subCategory)}
                                className="border-b-2 border-transparent hover:border-b-blue-300 transition duration-300"
                            >
                                {subCategory.name}
                            </Link>
                        );
                    })}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                {products.map((product: Product) => (
                    <ProductCard key={product.sku} product={product} />
                ))}
            </div>
        </MainLayout>
    );
}
