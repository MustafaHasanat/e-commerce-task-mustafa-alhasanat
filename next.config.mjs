/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["crypto-js"],
    },

    reactStrictMode: true,

    typescript: {
        tsconfigPath: "./tsconfig.json",
        ignoreBuildErrors: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "m.media-amazon.com",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
