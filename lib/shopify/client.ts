import "server-only";

const DEFAULT_STOREFRONT_API_VERSION = "2026-07";

type StorefrontRequestOptions = {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  variables?: Record<string, unknown>;
};

type ShopifyGraphQlError = {
  message: string;
};

type ShopifyGraphQlResponse<T> = {
  data?: T;
  errors?: ShopifyGraphQlError[];
};

export class ShopifyStorefrontError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyStorefrontError";
  }
}

function normalizeStoreDomain(domain: string) {
  return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function getStorefrontConfig() {
  const storeDomain = process.env.PUBLIC_STORE_DOMAIN;
  const publicToken = process.env.PUBLIC_STOREFRONT_API_TOKEN;
  const privateToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;
  const token = privateToken ?? publicToken;
  const apiVersion =
    process.env.SHOPIFY_STOREFRONT_API_VERSION ?? DEFAULT_STOREFRONT_API_VERSION;

  if (!storeDomain) {
    throw new ShopifyStorefrontError("Missing PUBLIC_STORE_DOMAIN.");
  }

  if (!token) {
    throw new ShopifyStorefrontError(
      "Missing PUBLIC_STOREFRONT_API_TOKEN or PRIVATE_STOREFRONT_API_TOKEN."
    );
  }

  return {
    apiVersion,
    endpoint: `https://${normalizeStoreDomain(storeDomain)}/api/${apiVersion}/graphql.json`,
    token,
    tokenHeader: privateToken
      ? "Shopify-Storefront-Private-Token"
      : "X-Shopify-Storefront-Access-Token"
  };
}

export async function storefrontRequest<T>(
  query: string,
  { cache = "no-store", next, variables }: StorefrontRequestOptions = {}
) {
  const config = getStorefrontConfig();

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [config.tokenHeader]: config.token
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next
  });

  if (!response.ok) {
    throw new ShopifyStorefrontError(
      `Shopify Storefront API request failed with ${response.status}.`
    );
  }

  const result = (await response.json()) as ShopifyGraphQlResponse<T>;

  if (result.errors?.length) {
    throw new ShopifyStorefrontError(
      result.errors.map((error) => error.message).join("; ")
    );
  }

  if (!result.data) {
    throw new ShopifyStorefrontError("Shopify Storefront API returned no data.");
  }

  return result.data;
}
