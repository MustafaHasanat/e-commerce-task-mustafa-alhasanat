export const GET_CATEGORIES_QUERY = (`
    query GetCategories {
        amazonProductCategoryTaxonomy {
            id
            name
            subcategories {
                id
            }
        }
    }
`);

export const GET_SUB_CATEGORY_PRODUCTS_QUERY = (`
   
`);