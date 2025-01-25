"use client";

import { Container, LoadingSpinner, SharedText } from "@/components";
import { useGetSubcategoryDetails } from "@/lib/hooks/data/categories";
import React, { useId } from "react";
import ProductCard from "../blocks/ProductCard";
import { usePaginatedData } from "@/lib/hooks";
import { PaginatedParams, SubcategoryDetailsType } from "@/lib/types";

const SubcategoryPage = React.memo(() => {
    const uniqueId = useId();

    const { data, isRefetching, isLoading, isFetching, isPending, Pagination } = usePaginatedData<
        PaginatedParams,
        SubcategoryDetailsType | undefined
    >({
        useGetterFn: useGetSubcategoryDetails,
        params: {},
    });    
    
    if (isRefetching || isLoading || isFetching || isPending) return <LoadingSpinner isHalfPage />;

    if (!data)
        return (
            <div className="flex w-full h-[40vh] justify-center items-center">
                <SharedText variant="h3">No Data</SharedText>
            </div>
        );

    return (
        <Container className="flex flex-col gap-5 justify-center items-center">
            <SharedText variant="h3">{data?.name} Subcategory</SharedText>

            <section className="grid mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-5 p-3">
                {data?.productResults?.results?.map((product, index) => (
                    <ProductCard
                        key={uniqueId + index + product?.asin + "product-type"}
                        product={product}
                    />
                ))}
            </section>

            <Pagination />
        </Container>
    );
});

export default SubcategoryPage;
