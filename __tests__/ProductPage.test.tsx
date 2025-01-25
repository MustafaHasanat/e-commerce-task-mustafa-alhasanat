import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useProductStore } from "@/lib/store";
import { useGetProductDetails } from "@/lib/hooks";
import ProductPage from "@/app/_components/pages/ProductPage";
import { TanStackMockProvider } from "@/__mocks__/tanstack";

// Mock useProductStore
jest.mock("@/lib/store", () => ({
    useProductStore: jest.fn(),
}));

// Mock useGetProductDetails
jest.mock("@/lib/hooks", () => ({
    useGetProductDetails: jest.fn(),
}));

const mockProduct = {
    asin: "123",
    title: "Test Product",
    price: { value: 100, currency: "USD" },
    rating: 4.3,
    imageUrls: ["image1.jpg", "image2.jpg", "image3.jpg"],
    featureBullets: ["Feature 1", "Feature 2", "Feature 3"],
    bookDescription: "Test Description",
};

describe("ProductPage Component", () => {
    const renderWithProviders = (ui: React.ReactNode) => {
        return render(<TanStackMockProvider>{ui}</TanStackMockProvider>);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        (useProductStore as unknown as jest.Mock).mockReturnValue({
            currentProduct: {},
        });

        (useGetProductDetails as jest.Mock).mockReturnValue({
            data: {},
            isLoading: true,
        });
    });

    it("renders loading spinner when data is loading", () => {
        (useProductStore as unknown as jest.Mock).mockReturnValue({
            currentProduct: null,
        });

        (useGetProductDetails as jest.Mock).mockReturnValue({
            data: {},
            isLoading: true,
        });

        renderWithProviders(<ProductPage />);

        expect(screen.getByText("loading")).toBeInTheDocument();
    });

    it("renders 'No Data' when no product data is available", async () => {
        (useProductStore as unknown as jest.Mock).mockReturnValue({
            currentProduct: null,
        });

        (useGetProductDetails as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
        });

        renderWithProviders(<ProductPage />);

        expect(screen.getByText("No Data")).toBeInTheDocument();
    });

    it("renders product details when data is available on the store", async () => {
        (useProductStore as unknown as jest.Mock).mockReturnValue({
            currentProduct: mockProduct,
        });

        (useGetProductDetails as jest.Mock).mockReturnValue({
            data: {},
            isLoading: false,
        });

        renderWithProviders(<ProductPage />);

        await waitFor(() => {
            expect(screen.getByText("Test Product")).toBeInTheDocument();
            expect(screen.getByText("100 USD")).toBeInTheDocument();
            expect(screen.getByText("Rating:")).toBeInTheDocument();
            expect(screen.getByText("Description")).toBeInTheDocument();
            expect(screen.getByText("Features")).toBeInTheDocument();
        });
    });

    it("renders product details when data is fetched from the query", async () => {
        (useProductStore as unknown as jest.Mock).mockReturnValue({
            currentProduct: {},
        });

        (useGetProductDetails as jest.Mock).mockReturnValue({
            data: mockProduct,
            isLoading: false,
        });

        renderWithProviders(<ProductPage />);

        await waitFor(() => {
            expect(screen.getByText("Test Product")).toBeInTheDocument();
            expect(screen.getByText("100 USD")).toBeInTheDocument();
            expect(screen.getByText("Rating:")).toBeInTheDocument();
            expect(screen.getByText("Description")).toBeInTheDocument();
            expect(screen.getByText("Features")).toBeInTheDocument();
        });
    });
});
