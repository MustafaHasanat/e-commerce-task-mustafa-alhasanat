/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FRONTEND_BASE } from "@/lib/constants";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosContentType } from "backend";
import { GraphQLClient } from "graphql-request";

type AxiosWrapperType<GenericRes> = {
    data: GenericRes;
};

export type AxiosClientProps = {
    endpoint?: string;
    contentType?: AxiosContentType;
    baseURL?: string;
    gqlQuery?: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
class AxiosClient<GenericReq, GenericRes = {}> {
    endpoint: string;
    instance: AxiosInstance;
    gqlInstance: GraphQLClient;
    headers: Record<string, string>;
    url: string;
    query: string;

    constructor({
        endpoint,
        contentType = "application/json",
        baseURL = FRONTEND_BASE,
        gqlQuery = "",
    }: AxiosClientProps) {
        const axiosInstance = axios.create({
            baseURL,
        });

        const gqlInstance = new GraphQLClient(baseURL, {
            headers: {
                "CANOPY-API-KEY": process.env.CANOPY_API_KEY || "none",
                "Content-Type": contentType,
            } as unknown as { [key: string]: string },
        });

        this.endpoint = endpoint || "";
        this.gqlInstance = gqlInstance;
        this.instance = axiosInstance;
        this.url = baseURL;
        this.query = gqlQuery;
        this.headers = {};
    }

    private combineConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => ({
        ...config,
        headers: { ...this.headers, ...config?.headers },
    });

    get = async (config?: AxiosRequestConfig) =>
        await this.instance
            .get<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res as GenericRes;
            });

    post = async (body?: GenericReq, config?: AxiosRequestConfig) =>
        await this.instance
            .post<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                body,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res?.response?.data as GenericRes;
            });

    put = async (body?: GenericReq, config?: AxiosRequestConfig) =>
        await this.instance
            .put<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                body,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res?.response?.data as GenericRes;
            });

    delete = async (config?: AxiosRequestConfig) =>
        await this.instance
            .delete<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                return res?.response?.data as GenericRes;
            });

    gql = async (variables?: { [key: string]: string }) =>
        await this.gqlInstance.request(this.query, { first: 10, ...variables });
}

export default AxiosClient;
