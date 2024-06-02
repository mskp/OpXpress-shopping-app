import { Skeleton } from "../ui/skeleton";

function ProductsSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="group relative shadow-sm p-4 rounded-lg">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="mt-4 flex justify-between truncate gap-2">
              <div className="truncate">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductsSkeleton;
