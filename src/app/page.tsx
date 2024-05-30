import Products from "@/components/products";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<p className="text-5xl">Loading...</p>}>
        <Products />
      </Suspense>
    </main>
  );
}
