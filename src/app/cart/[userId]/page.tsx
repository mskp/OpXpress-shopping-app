import {
  CheckoutButton,
  ClearCartButton,
  DecrementButton,
  DeleteFromCartButton,
  IncrementButton,
} from "@/components/cart/buttons";
import ErrorComponent from "@/components/misc/error-component";
import { prisma } from "@/config/prisma.config";
import Image from "next/image";
import { redirect } from "next/navigation";

/**
 * Represents the page where users can view and manage their cart items.
 *
 * @component
 * @param {object} props - The props object.
 * @param {object} props.params - The parameters object.
 * @param {string} props.params.userId - The ID of the user.
 * @returns {JSX.Element} The JSX representation of the CartPage component.
 */
async function CartPage({
  params: { userId },
}: {
  params: { userId: string };
}): Promise<JSX.Element> {
  const cartItems = await prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdOn: "desc",
    },
  });

  if (!userId) return redirect("/");

  if (cartItems?.length === 0)
    return <ErrorComponent message="Cart is empty" />;

  const grandTotal = cartItems.reduce((total, { product, quantity }) => {
    const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
    return total + price * quantity;
  }, 0);

  return (
    <section className="py-10 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        {cartItems.map(({ product, quantity }, index) => (
          <div
            key={index}
            className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 "
          >
            <div className="col-span-12 lg:col-span-2 img box">
              <Image
                height={500}
                width={200}
                src={product.imageUrl}
                alt="speaker image"
                className="max-lg:w-full lg:w-[180px] rounded-xl"
              />
            </div>
            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900 truncate">
                  {product.name}
                </h5>
                <DeleteFromCartButton productId={product.id} />
              </div>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6 capitalize flex gap-2">
                <span className="text-blue-500">
                  {product.price} X {quantity}
                </span>
                &bull;
                <span>{product.brand}</span> &bull;{" "}
                <span className="capitalize">{product.category}</span>
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <DecrementButton productId={product.id} quantity={quantity} />
                  <p className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center">
                    {quantity}
                  </p>
                  <IncrementButton productId={product.id} quantity={quantity} />
                </div>
                <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                  &#8377;
                  {parseFloat(product.price.replace(/[^0-9]/g, "")) * quantity}
                </h6>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
          <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
            Subtotal
          </h5>

          <div className="flex items-center justify-between gap-5 ">
            <ClearCartButton />
            <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
              &#8377;{grandTotal}
            </h6>
          </div>
        </div>
        <div className="max-lg:max-w-lg max-lg:mx-auto">
          <CheckoutButton />
        </div>
      </div>
    </section>
  );
}

export default CartPage;
