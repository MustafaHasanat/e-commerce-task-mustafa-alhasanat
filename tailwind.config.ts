import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            mobile: "412px",
            tablet: "820px",
            laptop: "1240px",
            desktop: "1500px",
        },
        colors: {
            white: "#ffffff",
            black: "#1B1C1E",
            gray: "#7c7c7c",
            lightGray: "#f5f5f5",
        },
    },
    darkMode: "class",
    plugins: [heroui({})],
};

export default config;
