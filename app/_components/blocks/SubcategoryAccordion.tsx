"use client";

import { Routs } from "@/lib/enums";
import { useSuperRouter } from "@/lib/hooks";
import { Button } from "@heroui/react";
import { SharedItem } from "products";
import React, { useId } from "react";

interface Params {
    subcategory: SharedItem & {
        subcategories?: SharedItem[];
    };
}

const SubcategoryAccordion = React.memo(({ subcategory }: Params) => {
    const { navigate } = useSuperRouter();
    const uniqueId = useId();

    const onPress = (key: string) => {
        navigate({
            href: Routs.SUB_CATEGORY_PAGE,
            replacements: {
                SUB_CATEGORY_ID: key as string,
            },
        });
    };

    return (
        <section className="flex flex-wrap gap-3">
            {subcategory?.subcategories?.map(({ id, name }) => (
                <Button
                    key={uniqueId + id + "btn"}
                    onPress={() => onPress(id)}
                    variant="flat"
                    color="secondary"
                >
                    {name}
                </Button>
            ))}
        </section>
    );
});

export default SubcategoryAccordion;
