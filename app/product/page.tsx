import type { Metadata } from "next";
import { IngredientHighlights } from "@/components/IngredientHighlights";
import { ProductDetails } from "@/components/ProductDetails";
import { FEATURED_PRODUCT_HANDLE } from "@/lib/shopify/constants";
import { getProductByHandle } from "@/lib/shopify/product";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Product | CUIVRÉ",
  description:
    "Cuivré Copper Peptide Moisturizer, formulated with GHK-Cu, ceramides, and shea butter."
};

export default async function ProductPage() {
  const product = await getProductByHandle(FEATURED_PRODUCT_HANDLE);

  return (
    <main className="page-shell">
      <ProductDetails product={product} />
      <IngredientHighlights />
    </main>
  );
}
