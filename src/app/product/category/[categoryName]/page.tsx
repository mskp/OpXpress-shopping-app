import Products from "@/components/misc/products";

export type Category =
  | "all"
  | "men's clothing"
  | "women's clothing"
  | "accessories";

function ProductsByCategoryPage({
  params: { categoryName },
}: {
  params: { categoryName: Category };
}) {
  const category = decodeURIComponent(categoryName) as Category;
  return <Products category={category} />;
}
export default ProductsByCategoryPage;
