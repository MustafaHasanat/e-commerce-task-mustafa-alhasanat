export const GET_PRODUCT_DETAILS_QUERY = `
    query GetProductDetails($productAsin: String = "") {
        amazonProduct(input: {asinLookup: {asin: $productAsin}}) {
            title
            imageUrls
            price {
                currency
                value
            }
            rating
            featureBullets
            bookDescription
            asin
        }
    }
`;
