import AxiosClient from "@/lib/configs/axios/client";
import { PAGE_SIZE_OBJ } from "@/lib/constants";
import { GET_CATEGORIES_QUERY } from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "backend";
import { CategoryType } from "products";

export const useGetCategories = ({
    page_size = PAGE_SIZE_OBJ.categories,
    page = 1,
}: PaginationParams) => {
    const client = new AxiosClient<unknown, { amazonProductCategoryTaxonomy: CategoryType[] }>({
        endpoint: "api/gql",
    });

    const formData = new FormData();
    formData.append("gqlQuery", GET_CATEGORIES_QUERY);

    return useQuery({
        queryKey: ["GetCategories", page_size, page],
        queryFn: async () => await client.post(formData),
    });
};
