"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import React from "react";

const BreadCrumbsComponent = React.memo(() => {
    return (
        <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/code">Code</BreadcrumbItem>
        </Breadcrumbs>
    );
});

export default BreadCrumbsComponent;
