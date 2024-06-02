import BrandingCarousel from "@/components/misc/branding-carousel";
import CategoryCarousel from "@/components/misc/category-carousel";
import Products from "@/components/misc/products";

export default function HomePage() {
  return (
    <main>
      <BrandingCarousel />
      <CategoryCarousel />
      <Products />
    </main>
  );
}
