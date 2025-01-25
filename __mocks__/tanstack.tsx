/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const tanstackQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 24 * 60 * 60 * 1000,
            retry: 3,
        },
    },
});

export const TanStackMockProvider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={tanstackQueryClient}>{children}</QueryClientProvider>;
};
