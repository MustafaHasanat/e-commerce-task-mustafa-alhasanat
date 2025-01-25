"use client";

import { Container, LoadingSpinner, ImagesCarousel, SharedText } from "@/components";
import { useGetProductDetails } from "@/lib/hooks";
import { useProductStore } from "@/lib/store";
import { Accordion, AccordionItem, Chip, cn, Divider } from "@heroui/react";
import { Star } from "lucide-react";
import React, { useId } from "react";

const ProductPage = React.memo(() => {
    const { currentProduct } = useProductStore();
    const { isLoading } = useGetProductDetails();
    const uniqueId = useId();

    if (isLoading) return <LoadingSpinner isHalfPage />;

    if (!currentProduct)
        return (
            <div className="flex w-full h-[40vh] justify-center items-center">
                <SharedText variant="h3">No Data</SharedText>
            </div>
        );

    return (
        <Container
            className={cn(
                "grid tablet:grid-cols-[300px_auto] laptop:grid-cols-[400px_auto] overflow-hidden",
                "gap-x-10 gap-y-5",
            )}
        >
            <section className="flex flex-col gap-4 order-1 tablet:order-2">
                <SharedText variant="h3" className="tablet:mb-5">
                    {currentProduct?.title}
                </SharedText>

                <section className="flex gap-3 items-center ">
                    <SharedText variant="h4">Price:</SharedText>
                    <Chip
                        color="secondary"
                        variant="bordered"
                        className="font-bold text-[16px]"
                    >{`${currentProduct?.price?.value} ${currentProduct?.price?.currency}`}</Chip>
                </section>

                <section className="flex gap-3 items-center ">
                    <SharedText variant="h4">Rating:</SharedText>

                    {new Array(Math.floor(Number(currentProduct?.rating)))
                        ?.fill(null)
                        ?.map((_num, index) => (
                            <Star key={index + "star"} className="text-gold" fill="var(--gold)" />
                        ))}

                    <SharedText className="opacity-60">{`(${currentProduct?.rating})`}</SharedText>
                </section>
            </section>

            <ImagesCarousel
                className="max-w-[85vw] max-h-[60vh] m-auto order-2 tablet:order-1 tablet:row-span-2"
                images={currentProduct?.imageUrls}
            />

            <Divider className="tablet:col-span-2 order-5" />

            <Accordion title="Features" className="tablet:col-span-2 order-6">
                <AccordionItem title={<SharedText variant="h4">Description</SharedText>}>
                    {currentProduct?.bookDescription || "No description available for this product"}
                </AccordionItem>

                <AccordionItem title={<SharedText variant="h4">Features</SharedText>}>
                    <ul className="fle flex-col gap-4 list-star pl-6 text-gray-700">
                        {currentProduct?.featureBullets?.map((feature, index) => (
                            <li key={index + uniqueId}>{feature}</li>
                        ))}
                    </ul>
                </AccordionItem>
            </Accordion>
        </Container>
    );
});

export default ProductPage;
