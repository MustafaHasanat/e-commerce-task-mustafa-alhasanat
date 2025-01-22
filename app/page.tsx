import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const LandingPage = dynamic(() => import("@/app/_components/LandingPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <LandingPage />;
}
