import { Skeleton } from "@/components/ui/skeleton";

/**
 * Renders a skeleton loading animation while product details are being fetched.
 *
 * @component
 * @returns {JSX.Element}
 */
function LoadingProductDetails(): JSX.Element {
  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto">
        <div className="overflow-hidden flex flex-col lg:flex-row">
          <Skeleton className="w-full lg:w-[40%] h-64 lg:h-auto object-cover rounded-lg" />
          <div className="p-6 lg:w-1/2">
            <Skeleton className="w-3/4 h-10 mb-4 lg:mb-6" />
            <Skeleton className="w-1/2 h-6 mb-2 lg:h-8" />

            <Skeleton className="w-1/3 h-6 mt-6 md:h-8 lg:h-10" />
            <Skeleton className="w-full h-20 mt-2 md:h-24 lg:h-28" />
            <Skeleton className="w-1/3 h-6 mt-4 md:h-8 lg:h-10" />
            <div className="mt-2 space-y-2">
              <Skeleton className="w-3/4 h-6 md:h-8 lg:h-10" />
              <Skeleton className="w-2/3 h-6 md:h-8 lg:h-10" />
              <Skeleton className="w-1/2 h-6 md:h-8 lg:h-10" />
              <Skeleton className="w-full h-6 md:h-8 lg:h-10" />
            </div>
            <Skeleton className="mt-6 w-full h-12 lg:h-14" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoadingProductDetails;
