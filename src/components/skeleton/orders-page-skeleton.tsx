import { Skeleton } from "../ui/skeleton";

/**
 * A skeleton loader component for the Orders Page.
 *
 * This component displays a skeleton loading state for the orders page, which includes placeholders
 * for three orders. Each order has placeholders for an image, title, and multiple lines of details.
 *
 * @returns {JSX.Element} The skeleton loader for the orders page.
 */
export default function OrdersPageSkeleton(): JSX.Element {
  return (
    <section className="py-10 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
          >
            <div className="col-span-12 lg:col-span-2 img-box">
              <Skeleton className="h-52 w-full lg:w-[180px] rounded-xl" />
            </div>
            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <Skeleton className="h-8 w-1/2" />
              </div>
              <Skeleton className="h-5 w-full mb-6" />
              <Skeleton className="h-5 w-3/4 mb-6" />
              <Skeleton className="h-5 w-3/4 mb-6" />
              <Skeleton className="h-5 w-3/4 mb-6" />
              <Skeleton className="h-5 w-3/4 mb-6" />
              <Skeleton className="h-5 w-3/4 mb-6" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
