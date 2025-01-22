/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { HeroUIProvider } from "@heroui/react";
import TanStackProvider from "./TanStackProvider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <TanStackProvider>
                <Toaster richColors closeButton />
                {children}
            </TanStackProvider>
        </HeroUIProvider>
    );
}
