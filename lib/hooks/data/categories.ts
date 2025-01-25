/* eslint-disable @typescript-eslint/no-unused-vars */
import AxiosClient from "@/lib/configs/axios/client";
import {
    GET_CATEGORIES_QUERY,
    GET_CATEGORY_DETAILS_QUERY,
    GET_SUBCATEGORY_DETAILS_QUERY,
} from "@/lib/graphql";
import { useCategoryStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
    CategoryDetailsType,
    CategoryType,
    PaginatedParams,
    SubcategoryDetailsType,
} from "@/lib/types";

export const useGetCategories = () => {
    const { categories, isHydrated, setCategories } = useCategoryStore();

    const client = new AxiosClient<unknown, { amazonProductCategoryTaxonomy: CategoryType[] }>({
        endpoint: "api/gql",
    });

    const formData = new FormData();
    formData.append("gqlQuery", GET_CATEGORIES_QUERY);

    return useQuery({
        queryKey: ["GetCategories"],
        queryFn: async () => {
            try {
                const response = await client.post(formData);
                setCategories(response?.amazonProductCategoryTaxonomy);

                return response?.amazonProductCategoryTaxonomy || categories || [];
            } catch (error) {
                return [];
            }
        },
        enabled: isHydrated && !categories,
        initialData: categories || undefined,
    });
};

export const useGetCategoryDetails = () => {
    const { id } = useParams();
    const { currentCategory, isHydrated, setCurrentCategory } = useCategoryStore();

    const client = new AxiosClient<unknown, { amazonProductCategory: CategoryDetailsType }>({
        endpoint: "api/gql",
    });

    const formData = new FormData();

    formData.append("gqlQuery", GET_CATEGORY_DETAILS_QUERY);
    formData.append(
        "variables",
        JSON.stringify({
            categoryId: id as string,
        }),
    );

    return useQuery({
        queryKey: ["GetCategoryDetails", id],
        queryFn: async () => {
            try {
                const response = await client.post(formData);

                response?.amazonProductCategory &&
                    setCurrentCategory(response?.amazonProductCategory);

                return response?.amazonProductCategory || undefined;
            } catch (error) {
                return undefined;
            }
        },
        enabled: currentCategory ? currentCategory?.id !== id : isHydrated,
    });
};

export const useGetSubcategoryDetails = ({ page }: PaginatedParams) => {
    const { id } = useParams();
    const { isHydrated } = useCategoryStore();

    const client = new AxiosClient<unknown, { amazonProductCategory: SubcategoryDetailsType }>({
        endpoint: "api/gql",
    });

    const formData = new FormData();

    formData.append("gqlQuery", GET_SUBCATEGORY_DETAILS_QUERY);
    formData.append(
        "variables",
        JSON.stringify({
            categoryId: id as string,
            page,
        }),
    );

    return useQuery({
        queryKey: ["GetSubcategoryDetails", id, page, isHydrated],
        queryFn: async () => {
            try {
                const response = await client.post(formData);
                return response?.amazonProductCategory || undefined;
            } catch (error) {
                return undefined;
            }
        },
        enabled: isHydrated,
    });
};
