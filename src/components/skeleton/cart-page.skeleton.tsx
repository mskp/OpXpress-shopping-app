import { Skeleton } from "../ui/skeleton";

function CartPageSkeleton() {
  return (
    <section className="py-10 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 "
          >
            <div className="col-span-12 lg:col-span-2 img box">
              <Skeleton className="h-52 w-full lg:w-[180px] rounded-xl" />
            </div>
            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-8 w-8" />
              </div>
              <Skeleton className="h-5 w-full mb-6" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
          <Skeleton className="h-8 w-1/2 mb-4 max-md:text-center max-md:mb-4" />
          <div className="flex items-center justify-between gap-5">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="max-lg:max-w-lg max-lg:mx-auto">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </section>
  );
}
export default CartPageSkeleton;
