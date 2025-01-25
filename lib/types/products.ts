export type SharedItem = {
    id: string;
    name: string;
};

export type PaginatedReturns = {
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
};

export type PaginatedParams = {
    page: number;
};

export type CategoryType = SharedItem & {
    subcategories: { id: string }[];
};

export type CategoryDetailsType = SharedItem & {
    subcategories: (SharedItem & {
        subcategories: SharedItem[];
    })[];
};

export type SubcategoryDetailsType = SharedItem & {
    productResults: {
        results: ProductType[];
        pageInfo: PaginatedReturns;
    };
};

export type ProductType = {
    price: {
        value: number;
        currency: string;
    };
    mainImageUrl: string;
    title: string;
    asin: string;
};

export type ProductDetailsType = {
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
