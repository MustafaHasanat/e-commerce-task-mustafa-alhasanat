"use client";

import { SharedText } from "@/components";
import { Routs } from "@/lib/enums";
import { useSuperRouter } from "@/lib/hooks";
import { Card, CardFooter, CardHeader, Divider } from "@heroui/react";
import { CategoryType } from "@/lib/types";
import React from "react";

interface Params {
    category: CategoryType;
}

const CategoryCard = React.memo(({ category }: Params) => {
    const { navigate } = useSuperRouter();

    const onPress = () => {
        navigate({
            href: Routs.CATEGORY_PAGE,
            replacements: {
                CATEGORY_ID: category?.id || "",
            },
        });
    };

    return (
        <Card
            shadow="md"
            isPressable
            onPress={onPress}
            className="p-2 hover:scale-105 transition-transform"
        >
            <CardHeader className="text-[18px] font-bold text-left">
                <SharedText>{category?.name}</SharedText>
            </CardHeader>

            <Divider />

            <CardFooter>
                <SharedText className="font-bold opacity-60 text-left text-[14px]">
                    {`Has ${category?.subcategories?.length || 0} subcategories`}
                </SharedText>
            </CardFooter>
        </Card>
    );
});

export default CategoryCard;
