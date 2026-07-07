import type { Metadata } from "next";
import { CartSummary } from "@/components/CartSummary";

export const metadata: Metadata = {
  title: "Cart | CUIVRÉ",
  description: "Review your CUIVRÉ cart before Shopify hosted checkout."
};

type CartPageProps = {
  searchParams: Promise<{
    checkout?: string;
  }>;
};

export default async function CartPage({ searchParams }: CartPageProps) {
  const { checkout } = await searchParams;

  return (
    <main className="page-shell narrow-shell">
      <CartSummary checkoutStatus={checkout} />
    </main>
  );
}
