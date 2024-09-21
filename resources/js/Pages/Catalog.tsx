import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useCallback, useEffect, useState } from "react";

import SideMenu from "@/Components/SideMenu";
import MainLayout from "@/Layouts/MainLayout";
import { Pagination } from "@/types";
import ProductCard from "@/Components/ProductCard";
import { Category } from "@/types/models";

const Catalog = ({
    products,
    catalogCategories,
}: {
    products: Pagination;
    catalogCategories: Category[];
}) => {
    const { t } = useLaravelReactI18n();

    const { data, links } = products;

    const [filteredData, setFilteredData] = useState(data);

    // const handleFilterChange = useCallback((filters) => {
    //     router.get("/catalog", filters, {
    //         preserveState: true,
    //         preserveScroll: true,
    //         onSuccess: () => {
    //             setFilteredData(data);
    //         },
    //     });
    // }, []);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    return (
        <MainLayout>
            <Head title={t("Catalog")} />
            <div className="container flex flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/4">
                    <SideMenu
                        categories={catalogCategories}
                        // onFilterChange={handleFilterChange}
                    />
                </div>

                <div className="w-full lg:w-3/4">
                    {filteredData.length === 0 ? (
                        <div className="p-6 text-center">
                            <h2 className="text-xl font-bold text-gray-700 lg:text-2xl">
                                {t("No products available")}
                            </h2>
                            <p className="mt-2 text-gray-500 lg:mt-4">
                                {t(
                                    "Please adjust your filters or check back later."
                                )}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                                {filteredData.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-center">
                                    {links.map((link, index) => (
                                        <Link
                                            key={index}
                                            disabled={!link.url}
                                            className={`mx-1 px-2 py-1 text-sm lg:text-base ${
                                                link.active
                                                    ? "font-bold"
                                                    : "text-gray-500"
                                            }`}
                                            href={link.url ? link.url : "#"}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default Catalog;
