"use client";

import { Container } from "@/components";
import { useGetCategories } from "@/lib/hooks";
import React from "react";

const LandingPage = React.memo(() => {
    const { data } = useGetCategories({});

    console.log(data);

    return <Container className="">LandingPage</Container>;
});

export default LandingPage;
