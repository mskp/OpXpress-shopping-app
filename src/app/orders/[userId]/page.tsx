import ErrorComponent from "@/components/misc/error-component";
import OrdersPageSkeleton from "@/components/skeleton/orders-page-skeleton";
import { prisma } from "@/config/prisma.config";
import Image from "next/image";
import { redirect } from "next/navigation";

async function OrdersPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  if (!userId) return redirect("/");

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
      orderInfo: true,
    },
    orderBy: {
      createdOn: "desc",
    },
  });

  if (orders?.length === 0) return <ErrorComponent message="No orders found" />;

  return (
    <section className="py-10 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
          >
            <div className="col-span-12 lg:col-span-2 img-box">
              <Image
                height={500}
                width={200}
                src={order.product.imageUrl}
                alt="product image"
                className="max-lg:w-full lg:w-[180px] rounded-xl"
              />
            </div>
            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900 truncate">
                  {order.product.name}
                </h5>
              </div>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6 capitalize flex gap-2">
                <span className="text-blue-500">
                  {order.product.price} X {order.quantity}
                </span>
                &bull;
                <span>{order.product.brand}</span> &bull;{" "}
                <span className="capitalize">{order.product.category}</span>
              </p>

              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                <strong>Order ID:</strong> {order.id}
              </p>

              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                <strong>Customer Name:</strong> {order.orderInfo.fullname}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                <strong>Phone:</strong> {order.orderInfo.phone}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                <strong>Address:</strong> {order.orderInfo.address},{" "}
                {order.orderInfo.city} - {order.orderInfo.pincode}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                <strong>Ordered On:</strong>{" "}
                {new Date(order.createdOn).toLocaleDateString()}
              </p>

              <div className="flex justify-between items-center">
                <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                  &#8377;
                  {parseFloat(order.product.price.replace(/[^0-9]/g, "")) *
                    order.quantity}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;
