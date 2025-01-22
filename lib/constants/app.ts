import { Metadata } from "next";

export const FRONTEND_BASE = `${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}`;
export const BACKEND_BASE = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}`;

export const SCREENS = {
    mobile: 412,
    tablet: 820,
    laptop: 1240,
    desktop: 1500,
};

// * website metadata

const title = "Light Amazon";
const description = "Light Amazon Website";
const icon = "/favicon.svg";
const siteName = "Light Amazon";

export const appMetadata: Metadata = {
    title,
    description,
    icons: {
        icon,
    },
    openGraph: {
        title,
        description,
        siteName,
        type: "website",
    },
    twitter: {
        title,
        description,
        card: "summary_large_image",
    },
};
