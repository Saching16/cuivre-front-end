const CART_ID_STORAGE_KEY = "cuivre:shopify-cart-id";

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function getStoredCartId() {
  if (!canUseLocalStorage()) {
    return null;
  }

  return window.localStorage.getItem(CART_ID_STORAGE_KEY);
}

export function storeCartId(cartId: string) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(CART_ID_STORAGE_KEY, cartId);
}

export function clearStoredCartId() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(CART_ID_STORAGE_KEY);
}
