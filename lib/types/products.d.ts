declare module "products" {
    type SharedItem = {
        id: string;
        name: string;
    };

    type PaginatedReturns = {
        currentPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        totalPages: number;
    };

    type PaginatedParams = {
        page: number;
    };

    type CategoryType = SharedItem & {
        subcategories: { id: string }[];
    };

    type CategoryDetailsType = SharedItem & {
        subcategories: (SharedItem & {
            subcategories: SharedItem[];
        })[];
    };

    type SubcategoryDetailsType = SharedItem & {
        productResults: {
            results: ProductType[];
            pageInfo: PaginatedReturns;
        };
    };

    type ProductType = {
        price: {
            value: number;
            currency: string;
        };
        mainImageUrl: string;
        title: string;
        asin: string;
    };

    type ProductDetailsType = {
        asin: string;
        title: string;
        imageUrls: string[];
        price: {
            currency: string;
            value: number;
        };
        rating: number;
        featureBullets: string[];
        bookDescription?: string;
    };
}
