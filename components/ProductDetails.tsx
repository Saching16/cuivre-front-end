import { AddToCartButton } from "./AddToCartButton";
import type { ShopifyProduct } from "@/lib/shopify/types";

type ProductDetailsProps = {
  product: ShopifyProduct | null;
};

function formatPrice(product: ShopifyProduct) {
  const variant = product.variants.nodes[0];

  if (!variant) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: variant.price.currencyCode
  }).format(Number(variant.price.amount));
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const variant = product?.variants.nodes[0];
  const canAddToCart = Boolean(product?.availableForSale && variant?.id);
  const price = product ? formatPrice(product) : "$68";
  const image = product?.featuredImage ?? product?.images.nodes[0] ?? null;

  return (
    <section className="product-grid">
      <div className="product-media">
        {image ? (
          <div
            aria-label={image.altText ?? product?.title ?? "CUIVRÉ product"}
            className="product-image"
            role="img"
            style={{ backgroundImage: `url("${image.url}")` }}
          />
        ) : (
          <div className="product-placeholder">
            <span>CUIVRÉ</span>
          </div>
        )}
      </div>
      <div className="product-copy">
        <p className="eyebrow">Moisturizer</p>
        <h1>{product?.title ?? "Cuivré Copper Peptide Moisturizer"}</h1>
        <p className="product-price">{price}</p>
        <p className="hero-copy">
          {product?.description ||
            "A copper peptide moisturizer formulated with GHK-Cu, ceramides, and shea butter for considered daily moisture."}
        </p>
        {product ? (
          <AddToCartButton merchandiseId={canAddToCart ? variant?.id : undefined} />
        ) : (
          <div className="availability-note">
            Product data is not available from Shopify yet. Publish the product
            to the Storefront sales channel to enable purchase.
          </div>
        )}
      </div>
    </section>
  );
}
