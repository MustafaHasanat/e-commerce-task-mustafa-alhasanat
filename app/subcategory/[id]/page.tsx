import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const SubcategoryPage = dynamic(() => import("@/app/_components/pages/SubcategoryPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page({ params: { id } }: { params: { id: string } }) {
    if (!id) return <LoadingSpinner isHalfPage />;

    return <SubcategoryPage />;
}
