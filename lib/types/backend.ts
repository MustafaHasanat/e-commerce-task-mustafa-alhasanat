export type TGeneric<T> = T | null;

export type AxiosContentType =
    | "multipart/form-data"
    | "application/json"
    | "application/octet-stream"
    | "application/x-www-form-urlencoded"
    | "application/pdf"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
