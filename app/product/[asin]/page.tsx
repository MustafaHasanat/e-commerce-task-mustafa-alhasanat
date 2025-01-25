import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const ProductPage = dynamic(() => import("@/app/_components/pages/ProductPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page({ params: { asin } }: { params: { asin: string } }) {
    if (!asin) return <LoadingSpinner isHalfPage />;

    return <ProductPage />;
}
