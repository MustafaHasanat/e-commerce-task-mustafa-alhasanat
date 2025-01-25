"use client";

import { SharedImage, SharedText } from "@/components";
import { Routs } from "@/lib/enums";
import { useSuperRouter } from "@/lib/hooks";
import { fetchProductDetails } from "@/lib/hooks/data/products";
import { useProductStore } from "@/lib/store";
import { Card, CardBody, CardHeader, Divider, Tooltip } from "@heroui/react";
import { ProductType } from "products";
import React from "react";

interface Params {
    product: ProductType;
}

const ProductCard = React.memo(({ product }: Params) => {
    const { navigate } = useSuperRouter();
    const { setCurrentProduct } = useProductStore();

    const onPress = async (asin: string) => {
        const response = await fetchProductDetails({ asin });

        if (response) {
            setCurrentProduct(response);

            setTimeout(() => {
                navigate({
                    href: Routs.PRODUCT_PAGE,
                    replacements: {
                        PRODUCT_ID: product?.asin || "",
                    },
                });
            }, 300);
        }
    };

    return (
        <Tooltip content={product?.title} showArrow={true} placement="bottom">
            <Card
                className="flex flex-col gap-5 p-4 hover:scale-105 transition-transform"
                shadow="md"
                isPressable
                onPress={() => onPress(product?.asin)}
            >
                <CardHeader className="flex flex-col gap-4 justify-start items-start">
                    <SharedText className="text-[16px] font-bold text-left line-clamp-2">
                        {product?.title}
                    </SharedText>
                    <SharedText className="font-bold opacity-70">{`Price: ${product?.price?.value} ${product?.price?.currency}`}</SharedText>
                </CardHeader>

                <Divider />

                <CardBody className="py-3 flex flex-col justify-center items-center max-h-[300px]">
                    <SharedImage
                        alt={product?.title}
                        className="h-full rounded-xl object-contain"
                        src={product?.mainImageUrl}
                        width={300}
                        height={300}
                    />
                </CardBody>
            </Card>
        </Tooltip>
    );
});

export default ProductCard;
