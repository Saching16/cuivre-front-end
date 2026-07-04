import { storefrontRequest } from "./client";
import { PRODUCT_BY_HANDLE_QUERY } from "./queries";
import type { ShopifyProduct } from "./types";

type ProductByHandleResponse = {
  product: ShopifyProduct | null;
};

export async function getProductByHandle(handle: string) {
  const data = await storefrontRequest<ProductByHandleResponse>(
    PRODUCT_BY_HANDLE_QUERY,
    {
      variables: { handle }
    }
  );

  return data.product;
}
