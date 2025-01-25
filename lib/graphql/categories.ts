export const GET_CATEGORIES_QUERY = `
    query GetCategories {
        amazonProductCategoryTaxonomy {
            id
            name
            subcategories {
                id
            }
        }
    }
`;

export const GET_CATEGORY_DETAILS_QUERY = `
    query GetCategoryDetails($categoryId: String = "") {
        amazonProductCategory(input: {categoryId: $categoryId}) {
            id
            name
            subcategories {
            id
            name
            subcategories {
                    id
                    name
                }
            }
        }
    }
`;

export const GET_SUBCATEGORY_DETAILS_QUERY = `
    query GetSubcategoryDetails($categoryId: String = "", $page: BigInt = 1) {
        amazonProductCategory(input: {categoryId: $categoryId}) {
            name
            id
            productResults(input: {page: $page}) {
                results {
                    price {
                        value
                        currency
                    }
                    mainImageUrl
                    title
                    asin
                }
                pageInfo {
                    currentPage
                    hasNextPage
                    hasPrevPage
                    totalPages
                }
            }
        }
    }
`;
