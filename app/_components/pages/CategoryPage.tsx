"use client";

import { Container, LoadingSpinner, SharedText } from "@/components";
import { useGetCategoryDetails } from "@/lib/hooks";
import React from "react";
import SubcategoryAccordion from "../blocks/SubcategoryAccordion";
import { Accordion, AccordionItem } from "@heroui/react";

const CategoryPage = React.memo(() => {
    const { data, isPending } = useGetCategoryDetails();

    if (isPending) return <LoadingSpinner isHalfPage />;

    if (!data)
        return (
            <div className="flex w-full h-[40vh] justify-center items-center">
                <SharedText variant="h3">No Data</SharedText>
            </div>
        );

    return (
        <Container className="flex flex-col gap-5">
            <SharedText variant="h3">{data?.name} Category</SharedText>

            <Accordion variant="splitted" className="grid gap-5 p-3">
                {data?.subcategories?.map((subcategory) => (
                    <AccordionItem
                        key={subcategory?.id}
                        title={<SharedText className="font-bold">{subcategory?.name}</SharedText>}
                    >
                        <SubcategoryAccordion subcategory={subcategory} />
                    </AccordionItem>
                ))}
            </Accordion>
        </Container>
    );
});

export default CategoryPage;
