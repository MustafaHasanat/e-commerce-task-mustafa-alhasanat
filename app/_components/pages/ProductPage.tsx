"use client";

import { Container, LoadingSpinner, ImagesCarousel, SharedText } from "@/components";
import { useGetProductDetails } from "@/lib/hooks";
import { useProductStore } from "@/lib/store";
import React from "react";

const ProductPage = React.memo(() => {
    const { currentProduct } = useProductStore();
    const { isLoading } = useGetProductDetails();

    if (isLoading) return <LoadingSpinner isHalfPage />;

    if (!currentProduct)
        return (
            <div className="flex w-full h-[40vh] justify-center items-center">
                <SharedText variant="h3">No Data</SharedText>
            </div>
        );

    return (
        <Container className="grid gap-5 overflow-hidden">
            <SharedText variant="h3">{currentProduct?.title}</SharedText>

            <ImagesCarousel className="max-h-[60vh]" images={currentProduct?.imageUrls} />
        </Container>
    );
});

export default ProductPage;
