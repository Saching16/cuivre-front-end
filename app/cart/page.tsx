import type { Metadata } from "next";
import { CartSummary } from "@/components/CartSummary";

export const metadata: Metadata = {
  title: "Cart | CUIVRÉ",
  description: "Review your CUIVRÉ cart before Shopify hosted checkout."
};

export default function CartPage() {
  return (
    <main className="page-shell narrow-shell">
      <CartSummary />
    </main>
  );
}
