"use client"; // Error boundaries must be Client Components

import { SharedText } from "@/components";
import { useEffect, useState } from "react";
import { useSuperRouter } from "@/lib/hooks";
import { Routs } from "@/lib/enums";
import { Button, cn, Divider } from "@heroui/react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [errorData, setErrorData] = useState<Error & { digest?: string }>();
    const { navigate } = useSuperRouter();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
        setErrorData(error);
    }, [error]);

    return (
        <div
            className={cn(
                "w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-7 p-10 overflow-hidden",
            )}
        >
            <SharedText className="text-center w-[400px] text-[30px] font-bold">
                Unexpected error occurred in the server
            </SharedText>

            <SharedText className="text-center text-[20px] text-danger">
                {errorData?.message}
            </SharedText>

            <Divider className="w-[400px]" />

            <div className="flex flex-col w-[300px] gap-5">
                <Button
                    color="primary"
                    className="w-full"
                    onPress={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try Again
                </Button>

                <Button color="primary" className="w-full" onPress={() => window.location.reload()}>
                    Reload
                </Button>

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
