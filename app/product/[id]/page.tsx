import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const ProductPage = dynamic(() => import("@/app/_components/ProductPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page({ params: { id } }: { params: { id: string } }) {
    if (!id) return <LoadingSpinner isHalfPage />;

    return <ProductPage />;
}
