"use client";

import { cn } from "@heroui/theme";
import React, { CSSProperties } from "react";

interface Props {
    children: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    className?: string;
    styles?: CSSProperties;
}

export const SharedText: React.FC<React.HTMLAttributes<HTMLParagraphElement> & Props> = ({
    children,
    className = "",
    styles = {},
    variant = "p",
    ...rest
}: Props) => {
    const sharedClassName = "font-bold capitalize";

    if (variant === "h1")
        return (
            <h1
                className={cn(className, sharedClassName, "text-[60px]")}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </h1>
        );

    if (variant === "h2")
        return (
            <h2
                className={cn(className, sharedClassName, "text-[40px]")}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </h2>
        );

    if (variant === "h3")
        return (
            <h3
                className={cn(className, sharedClassName, "text-[30px]")}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </h3>
        );

    if (variant === "h4")
        return (
            <h4
                className={cn(className, sharedClassName, "text-[20px]")}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </h4>
        );

    if (variant === "span")
        return (
            <span
                className={className}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </span>
        );

    return (
        <p
            className={className}
            style={{
                ...styles,
            }}
            {...rest}
        >
            {children}
        </p>
    );
};
