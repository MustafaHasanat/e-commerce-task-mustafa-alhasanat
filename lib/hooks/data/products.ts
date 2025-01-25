import AxiosClient from "@/lib/configs/axios/client";
import { GET_PRODUCT_DETAILS_QUERY } from "@/lib/graphql";
import { useProductStore } from "@/lib/store";
import { ProductDetailsType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const fetchProductDetails = async ({ asin }: { asin: string }) => {
    const client = new AxiosClient<unknown, { amazonProduct: ProductDetailsType }>({
        endpoint: "api/gql",
    });

    const formData = new FormData();

    formData.append("gqlQuery", GET_PRODUCT_DETAILS_QUERY);
    formData.append(
        "variables",
        JSON.stringify({
            productAsin: asin,
        }),
    );

    const response = await client.post(formData);

    return response?.amazonProduct;
};

export const useGetProductDetails = () => {
    const { asin } = useParams();
    const { currentProduct, setCurrentProduct, isHydrated } = useProductStore();

    return useQuery({
        queryKey: ["GetProductDetails", asin],
        queryFn: async (): Promise<Partial<ProductDetailsType>> => {
            try {
                const response = await fetchProductDetails({ asin: asin as string });

                response && setCurrentProduct(response);

                return response || {};
            } catch (error) {
                return {};
            }
        },
        enabled: currentProduct ? currentProduct?.asin !== asin?.toString() : isHydrated,
    });
};
