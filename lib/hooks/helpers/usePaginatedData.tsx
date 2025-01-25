/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Pagination } from "@heroui/react";
import React, { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginatedParams, SubcategoryDetailsType } from "@/lib/types";

interface Props<FnParamsType, FnReturnType> {
    useGetterFn: (params: FnParamsType & PaginatedParams) => UseQueryResult<FnReturnType, Error>;
    params: any;
}

type ReturnProps<FnReturnType> = {
    Pagination: () => React.JSX.Element;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    data?: FnReturnType;
} & Omit<UseQueryResult<FnReturnType, Error>, "data">;

export function usePaginatedData<FnParamsType, FnReturnType>({
    params,
    useGetterFn,
}: Props<FnParamsType, FnReturnType>): ReturnProps<FnReturnType> {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, ...rest } = useGetterFn({ ...params, page: currentPage });

    const handleChange = (page: number) => {
        setCurrentPage(page);
    };

    const PaginationComponent = () => (
        <div className="w-full m-auto p-3 flex justify-center items-center">
            <Pagination
                total={(data as SubcategoryDetailsType)?.productResults?.pageInfo?.totalPages}
                page={currentPage}
                onChange={handleChange}
                size="lg"
                showControls
                loop
                siblings={1}
                initialPage={1}
            />
        </div>
    );

    return {
        Pagination: PaginationComponent,
        currentPage,
        setCurrentPage,
        data,
        ...(rest as Omit<UseQueryResult<FnReturnType, Error>, "data">),
    };
}
