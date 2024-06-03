import accessories from "@/assets/category-carousel-image/accessories.webp";
import menFashion from "@/assets/category-carousel-image/men-fashion.webp";
import womenFashion from "@/assets/category-carousel-image/women-fashion.webp";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "women's clothing", image: womenFashion },
  { name: "men's clothing", image: menFashion },
  { name: "accessories", image: accessories },
];

/**
 * The CategoryCarousel component displays a carousel of product categories.
 * Each category is displayed as a card with an image and a link to the respective category page.
 *
 * @returns {JSX.Element} The rendered CategoryCarousel component.
 */
export default function CategoryCarousel(): JSX.Element {
  return (
    <div className="flex justify-center">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 cursor-pointer"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Link href={`/product/category/${category.name}`}>
                      <Image
                        height={category.image.height}
                        width={category.image.width}
                        alt="category"
                        src={category.image.src}
                      />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
