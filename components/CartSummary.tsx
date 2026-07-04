"use client";

import { useEffect, useState } from "react";
import {
  clearStoredCartId,
  getStoredCartId,
  storeCartId
} from "@/lib/browser/cart-storage";
import type { ShopifyCart, ShopifyCartLine } from "@/lib/shopify/types";

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode
  }).format(Number(amount));
}

export function CartSummary() {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">(
    "loading"
  );

  async function loadCart() {
    const cartId = getStoredCartId();

    if (!cartId) {
      setStatus("empty");
      return;
    }

    const response = await fetch(`/api/cart?cartId=${encodeURIComponent(cartId)}`);

    if (!response.ok) {
      clearStoredCartId();
      setStatus("empty");
      return;
    }

    const data = (await response.json()) as { cart: ShopifyCart | null };

    if (!data.cart || data.cart.totalQuantity === 0) {
      setCart(data.cart);
      setStatus("empty");
      return;
    }

    setCart(data.cart);
    storeCartId(data.cart.id);
    setStatus("ready");
  }

  async function updateLine(line: ShopifyCartLine, quantity: number) {
    if (!cart) {
      return;
    }

    setStatus("loading");

    const response = await fetch("/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cartId: cart.id,
        lineId: line.id,
        merchandiseId: line.merchandise.id,
        quantity
      })
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const data = (await response.json()) as { cart: ShopifyCart };
    setCart(data.cart);
    setStatus(data.cart.totalQuantity > 0 ? "ready" : "empty");
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadCart();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return <p className="muted-copy">Loading cart.</p>;
  }

  if (status === "empty") {
    return (
      <div className="empty-state">
        <h1>Your cart is empty.</h1>
        <p className="hero-copy">
          The moisturizer will appear here after it is added from the product
          page.
        </p>
        <a className="button" href="/product">
          View product
        </a>
      </div>
    );
  }

  if (status === "error" || !cart) {
    return (
      <div className="empty-state">
        <h1>Cart unavailable.</h1>
        <p className="hero-copy">The cart could not be updated. Try again.</p>
      </div>
    );
  }

  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      <h1 id="cart-heading">Your cart</h1>
      <div className="cart-lines">
        {cart.lines.nodes.map((line) => (
          <article className="cart-line" key={line.id}>
            <div>
              <h2>{line.merchandise.product.title}</h2>
              <p>{line.merchandise.title}</p>
              <p>
                {formatMoney(
                  line.cost.totalAmount.amount,
                  line.cost.totalAmount.currencyCode
                )}
              </p>
            </div>
            <div className="quantity-controls">
              <button
                aria-label="Decrease quantity"
                onClick={() => updateLine(line, line.quantity - 1)}
                type="button"
              >
                -
              </button>
              <span>{line.quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => updateLine(line, line.quantity + 1)}
                type="button"
              >
                +
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="cart-total">
        <span>Subtotal</span>
        <strong>
          {formatMoney(
            cart.cost.subtotalAmount.amount,
            cart.cost.subtotalAmount.currencyCode
          )}
        </strong>
      </div>
      <a className="button" href={cart.checkoutUrl}>
        Continue to checkout
      </a>
    </section>
  );
}
