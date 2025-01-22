"use client";

import { cn } from "@heroui/theme";
import React from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
    return <div className={cn("w-full p-5", className)}>{children}</div>;
};
