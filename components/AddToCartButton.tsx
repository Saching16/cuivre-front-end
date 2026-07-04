"use client";

import { useState } from "react";
import { getStoredCartId, storeCartId } from "@/lib/browser/cart-storage";

type AddToCartButtonProps = {
  merchandiseId?: string;
};

export function AddToCartButton({ merchandiseId }: AddToCartButtonProps) {
  const [status, setStatus] = useState<"idle" | "adding" | "added" | "error">(
    "idle"
  );

  async function handleClick() {
    if (!merchandiseId) {
      return;
    }

    setStatus("adding");

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cartId: getStoredCartId(),
        merchandiseId,
        quantity: 1
      })
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const data = (await response.json()) as { cart: { id: string } };
    storeCartId(data.cart.id);
    setStatus("added");
  }

  return (
    <div className="action-stack">
      <button
        className="button"
        disabled={!merchandiseId || status === "adding"}
        onClick={handleClick}
        type="button"
      >
        {status === "adding" ? "Adding" : "Add to cart"}
      </button>
      {status === "added" ? (
        <a className="text-link" href="/cart">
          View cart
        </a>
      ) : null}
      {status === "error" ? (
        <p className="form-note form-note-error">
          The cart could not be updated. Please try again.
        </p>
      ) : null}
    </div>
  );
}
