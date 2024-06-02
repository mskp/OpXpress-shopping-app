import { prisma } from "@/config/prisma.config";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "../cart/buttons";
import ErrorComponent from "./error-component";
import { Category } from "@/app/product/category/[categoryName]/page";

async function Products({ category = "all" }: { category?: Category }) {
  let products: Product[];

  try {
    if (!category || category === "all") {
      products = await prisma.product.findMany();
    } else {
      products = await prisma.product.findMany({
        where: {
          category,
        },
      });
    }
  } catch (error) {
    return <ErrorComponent message="Products could not be fetched" />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="group relative shadow-sm lg:hover:scale-105 transition-all p-4 rounded-lg"
          >
            <Link href={`/product/${product.id}`}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  width={500}
                  height={250}
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-top lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between truncate gap-2">
                <div className="truncate ">
                  <h3 className="text-sm text-gray-700 truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 capitalize">
                    {product.category} &bull; {product.brand}
                  </p>
                </div>
                <div>
                  {product.price !== product.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </p>
                  )}
                  <p className="text-lg font-semibold">{product.price}</p>
                </div>
              </div>
            </Link>
            <div className="flex justify-between items-center mt-4">
              <p>{product.discount}</p>
              <AddToCartButton productId={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
