import { NextResponse } from "next/server";
import { getCart } from "@/lib/shopify/cart";

function cartUrl(request: Request, reason: string) {
  const url = new URL("/cart", request.url);
  url.searchParams.set("checkout", reason);
  return url;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get("cartId");

  if (!cartId) {
    return NextResponse.redirect(cartUrl(request, "missing-cart"));
  }

  const cart = await getCart(cartId);

  if (!cart?.checkoutUrl || cart.totalQuantity < 1) {
    return NextResponse.redirect(cartUrl(request, "empty-cart"));
  }

  return NextResponse.redirect(cart.checkoutUrl);
}
