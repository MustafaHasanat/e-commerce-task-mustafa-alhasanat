"use client"; // Error boundaries must be Client Components

import { SharedText } from "@/components";
import { Button } from "@heroui/button";
import { useSuperRouter } from "@/lib/hooks";
import { Routs } from "@/lib/enums";
import { Divider } from "@heroui/react";
import React from "react";

export default function NotFoundPage() {
    const { navigate } = useSuperRouter();

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-7 p-10 overflow-hidden">
            <SharedText className="text-center w-[400px] text-[30px] font-bold">
                You have reached nowhere!{" "}
            </SharedText>

            <Divider className="w-[400px]" />

            <div className="flex flex-col w-[300px] gap-5">
                <Button
                    color="primary"
                    className="w-full"
                    onPress={() =>
                        navigate({
                            href: Routs.HOME,
                        })
                    }
                >
                    Go to home page
                </Button>
            </div>
        </div>
    );
}
