"use client";

import { Container, LoadingSpinner, SharedText } from "@/components";
import { useGetCategories } from "@/lib/hooks";
import React, { useId } from "react";
import CategoryCard from "../blocks/CategoryCard";
import { useCategoryStore } from "@/lib/store";

const LandingPage = React.memo(() => {
    const id = useId();
    const { isPending } = useGetCategories();
    const { categories } = useCategoryStore();

    if (isPending) return <LoadingSpinner isHalfPage />;

    if (!categories || categories?.length === 0)
        return (
            <div className="flex w-full h-[40vh] justify-center items-center">
                <SharedText variant="h3">No Data</SharedText>
            </div>
        );

    return (
        <Container className="flex flex-col gap-5">
            <SharedText variant="h3">Categories</SharedText>

            <section className="grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-5 p-3">
                {categories?.map((category, index) => (
                    <CategoryCard key={id + index + "category-type"} category={category} />
                ))}
            </section>
        </Container>
    );
});

export default LandingPage;
