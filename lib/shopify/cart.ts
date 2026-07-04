import { ShopifyStorefrontError, storefrontRequest } from "./client";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY
} from "./queries";
import type { ShopifyCart, ShopifyUserError } from "./types";

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

type CartLineUpdateInput = {
  id: string;
  merchandiseId?: string;
  quantity: number;
};

type CartPayload = {
  cart: ShopifyCart | null;
  userErrors: ShopifyUserError[];
};

type CartResponse = {
  cart: ShopifyCart | null;
};

type CartCreateResponse = {
  cartCreate: CartPayload;
};

type CartLinesAddResponse = {
  cartLinesAdd: CartPayload;
};

type CartLinesUpdateResponse = {
  cartLinesUpdate: CartPayload;
};

type CartLinesRemoveResponse = {
  cartLinesRemove: CartPayload;
};

function readCartPayload(payload: CartPayload, action: string) {
  if (payload.userErrors.length) {
    throw new ShopifyStorefrontError(
      `${action} failed: ${payload.userErrors
        .map((error) => error.message)
        .join("; ")}`
    );
  }

  if (!payload.cart) {
    throw new ShopifyStorefrontError(`${action} returned no cart.`);
  }

  return payload.cart;
}

export async function getCart(cartId: string) {
  const data = await storefrontRequest<CartResponse>(CART_QUERY, {
    variables: { id: cartId }
  });

  return data.cart;
}

export async function createCart(line?: CartLineInput) {
  const data = await storefrontRequest<CartCreateResponse>(CART_CREATE_MUTATION, {
    variables: {
      input: line ? { lines: [line] } : {}
    }
  });

  return readCartPayload(data.cartCreate, "Cart creation");
}

export async function addCartLines(cartId: string, lines: CartLineInput[]) {
  const data = await storefrontRequest<CartLinesAddResponse>(
    CART_LINES_ADD_MUTATION,
    {
      variables: { cartId, lines }
    }
  );

  return readCartPayload(data.cartLinesAdd, "Adding cart lines");
}

export async function updateCartLines(
  cartId: string,
  lines: CartLineUpdateInput[]
) {
  const data = await storefrontRequest<CartLinesUpdateResponse>(
    CART_LINES_UPDATE_MUTATION,
    {
      variables: { cartId, lines }
    }
  );

  return readCartPayload(data.cartLinesUpdate, "Updating cart lines");
}

export async function removeCartLines(cartId: string, lineIds: string[]) {
  const data = await storefrontRequest<CartLinesRemoveResponse>(
    CART_LINES_REMOVE_MUTATION,
    {
      variables: { cartId, lineIds }
    }
  );

  return readCartPayload(data.cartLinesRemove, "Removing cart lines");
}
