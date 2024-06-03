"use client";

import image1 from "@/assets/carousel-image/image1.webp";
import image2 from "@/assets/carousel-image/image2.webp";
import image3 from "@/assets/carousel-image/image3.webp";
import image4 from "@/assets/carousel-image/image4.webp";
import image5 from "@/assets/carousel-image/image5.webp";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

const images = [image1, image2, image3, image4, image5];

/**
 * The BrandingCarousel component displays a carousel of branding images.
 * The carousel auto-plays and loops through the images with a delay of 2 seconds.
 *
 * @returns {JSX.Element} The rendered BrandingCarousel component.
 */
function BrandingCarousel(): JSX.Element {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full flex"
      orientation="horizontal"
    >
      <CarouselContent className="w-full h-full">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="w-full lg:hover:scale-105 transition-all cursor-pointer "
          >
            <div className="p-1">
              <Card className="w-full">
                <CardContent className="flex items-center justify-center w-full p-2">
                  <Image
                    height={image.height}
                    width={image.width}
                    src={image.src}
                    alt={"branding-image"}
                    className="w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default BrandingCarousel;
