import { Skeleton } from "../ui/skeleton";

/**
 * The ProductCardSkeleton component displays a skeleton loading state for a product card.
 * It includes placeholders for an image, title, price, and additional details.
 *
 * @returns {JSX.Element} The rendered ProductCardSkeleton component.
 */
function ProductCardSkeleton(): JSX.Element {
  return (
    <div className="group relative shadow-sm p-4 rounded-lg">
      <Skeleton className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none h-80" />
      <div className="mt-4 flex justify-between gap-2">
        <Skeleton className="w-3/4 h-4 bg-gray-200 rounded" />
        <Skeleton className="w-1/4 h-4 bg-gray-200 rounded" />
      </div>
      <div className="mt-1 flex justify-between gap-2">
        <Skeleton className="w-1/2 h-4 bg-gray-200 rounded" />
        <Skeleton className="w-1/4 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
