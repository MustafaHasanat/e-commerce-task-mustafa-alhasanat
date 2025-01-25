/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { HeroUIProvider } from "@heroui/react";
import TanStackProvider from "./TanStackProvider";
import { Toaster } from "sonner";
import { ZustandHydrateGate } from "./ZustandHydrateGate";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <TanStackProvider>
                <ZustandHydrateGate>
                    <Toaster richColors closeButton />
                    {children}
                </ZustandHydrateGate>
            </TanStackProvider>
        </HeroUIProvider>
    );
}
