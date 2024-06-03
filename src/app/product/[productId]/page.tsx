import { AddToCartButton } from "@/components/cart/buttons";
import { prisma } from "@/config/prisma.config";
import Image from "next/image";

/**
 * Displays detailed information about a specific product.
 *
 * @component
 * @param {object} props - The props object.
 * @param {object} props.params - The parameters object.
 * @param {string} props.params.productId - The ID of the product to display.
 * @returns {JSX.Element} The JSX representation of the ProductPage component.
 */
async function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}): Promise<JSX.Element> {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Image
              width={500}
              height={500}
              className="max-w-full h-auto object-cover rounded-lg"
              src={product?.imageUrl as string}
              alt="Product Image"
            />
          </div>
          <div className="p-6 w-full lg:w-1/2 lg:p-0">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-800 mb-4">
              {product?.name}
            </h1>
            <span className="block text-gray-600 mb-2">
              Brand: {product?.brand}
            </span>
            <p className="text-gray-600 mb-4 lg:text-lg">4.0 ★★★★</p>
            <div className="text-gray-600 mb-6">
              <p className="mt-4 md:text-lg lg:text-xl">
                Free Shipping & Returns
              </p>
              <p className="text-sm mt-2 md:text-base lg:text-lg">
                We offer free shipping on all orders with no minimum purchase
                required. If you are not completely satisfied with your
                purchase, you can return it within 30 days for a full refund.
              </p>
              <p className="mt-4 md:text-lg lg:text-xl">Customer Support</p>
              <p className="text-sm mt-2 md:text-base lg:text-lg">
                Our customer support team is available to assist you with any
                questions or concerns. Contact us via email or phone for prompt
                assistance.
              </p>
              <p className="mt-4 md:text-lg lg:text-xl">Product Quality</p>
              <ul className="text-sm mt-2 list-disc list-inside md:text-base lg:text-lg">
                <li>High-quality materials</li>
                <li>Ethically sourced</li>
                <li>Durable and long-lasting</li>
                <li>Easy to care for</li>
              </ul>
              <p className="mt-4 md:text-lg lg:text-xl">
                Satisfaction Guaranteed
              </p>
              <p className="text-sm mt-2 md:text-base lg:text-lg">
                We stand behind the quality of our products. If you are not
                satisfied with your purchase, please contact us for a
                hassle-free return or exchange.
              </p>
            </div>
            <AddToCartButton
              productId={productId}
              variant={"default"}
              className="mt-6 w-full py-2 rounded-lg focus:outline-none md:py-3 md:text-lg lg:py-4 lg:text-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
