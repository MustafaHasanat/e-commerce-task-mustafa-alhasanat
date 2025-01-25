"use client";

import { useId } from "react";
import { cn } from "@heroui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { SharedImage } from "./SharedImage";

interface Props {
    images: string[];
    className?: string;
}

export const ImagesCarousel = ({ images, className }: Props) => {
    const id = useId();

    return (
        <Carousel
            className={cn(
                "aspect-square flex flex-col justify-center items-center",
                "border-2 rounded-xl",
                className,
            )}
        >
            {images?.map((imageUrl, index) => (
                <SharedImage
                    key={id + index}
                    src={imageUrl}
                    className={cn("w-full h-[40vh]")}
                    alt={imageUrl}
                    width={300}
                    height={300}
                    priority
                />
            ))}
        </Carousel>
    );
};
