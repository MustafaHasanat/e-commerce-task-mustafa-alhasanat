declare module "products" {
    type CategoryType = {
        id?: string;
        name?: string;
        subcategories?: CategoryType[];
    };

    type CategoryType = {
        id?: string;
        name?: string;
    };
}
