/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import { Providers } from "@/components/providers/providers";
import "@/lib/styles/globals.css";
import { appMetadata } from "@/lib/constants";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

/**
 * Setup the website metadata
 */
export const metadata: Metadata = appMetadata;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
            <body className="flex flex-col w-[100vw] min-h-[100vh]">
                <Providers>
                    <Header />
                    <main className="min-h-[90vh]">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
