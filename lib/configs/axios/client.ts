/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { BACKEND_BASE } from "@/lib/constants";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
    AxiosAcceptType,
    AxiosContentType,
    AxiosResponseType,
    ListPaginatedResponse,
} from "backend";

type AxiosWrapperType<GenericRes> = {
    data: GenericRes;
};

export type AxiosClientProps = {
    endpoint?: string;
    contentType?: AxiosContentType;
    acceptType?: AxiosAcceptType;
    responseType?: AxiosResponseType;
    baseURL?: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
class AxiosClient<GenericReq, GenericRes = {}> {
    endpoint: string;
    instance: AxiosInstance;
    headers: Record<string, string>;
    url: string;

    constructor({
        endpoint,
        contentType = "multipart/form-data",
        acceptType,
        baseURL = BACKEND_BASE,
        responseType,
    }: AxiosClientProps) {
        const axiosInstance = axios.create({
            baseURL,
        });

        // intercept all outgoing requests and attach a Bearer token to them if the user is signed-in
        axiosInstance.interceptors.request.use((config) => {
            // set the headers
            config.headers["Content-Type"] = contentType;

            acceptType && (config.headers["Accept"] = acceptType);
            responseType && (config.headers["Content-Type"] = responseType);

            return config;
        });

        this.endpoint = endpoint || "";
        this.instance = axiosInstance;
        this.url = baseURL;
        this.headers = {};
    }

    private combineConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => ({
        ...config,
        headers: { ...this.headers, ...config?.headers },
    });

    getItem = async (config?: AxiosRequestConfig) =>
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

    getList = async (config?: AxiosRequestConfig) =>
        await this.instance
            .get<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res?.response?.data as GenericRes;
            });

    getPaginated = async (config?: AxiosRequestConfig) =>
        await this.instance
            .get<GenericReq, AxiosWrapperType<ListPaginatedResponse<GenericRes>>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res?.response?.data as ListPaginatedResponse<GenericRes>;
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
}

export default AxiosClient;
