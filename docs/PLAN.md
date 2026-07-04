# CUIVRÉ Storefront Plan

## Goal

Build a custom Next.js storefront for CUIVRÉ's single-product skincare launch. The site should feel considered and precise, let visitors understand the formula, add the product to a cart, and complete purchase through Shopify hosted checkout.

## Scope

- Homepage with brand story, product positioning, key ingredient benefits, and email signup.
- Product page for "Cuivré Copper Peptide Moisturizer — Coconut" with price, description, ingredients, and add-to-cart.
- Cart flow backed by Shopify Storefront API cart mutations.
- Checkout redirect using Shopify's returned `checkoutUrl`.
- Graceful handling for missing Shopify product images.
- Minimal documentation for setup, environment variables, and deployment.

## Out Of Scope

- Multi-product catalog browsing.
- Customer accounts or login.
- Payment, tax, shipping, or order management inside this frontend.
- Shopify Admin API usage.
- Custom checkout UI.

## Technical Foundation

- Create a Next.js App Router project with TypeScript.
- Use npm for package management.
- Use Shopify Storefront API GraphQL for product and cart data.
- Keep any private Storefront token server-only.
- Use public environment variables only where browser exposure is intentional:
  - `PUBLIC_STORE_DOMAIN=ajwufe-0z.myshopify.com`
  - `PUBLIC_STOREFRONT_API_TOKEN`
  - `PRIVATE_STOREFRONT_API_TOKEN` if server-only requests are needed.
- Target Vercel or an equivalent Node.js host.

## Design Direction

- Background: Deep Navy `#141631`.
- Text: Cream `#F5F0E6`.
- Accent: Copper `#C08A5C`.
- Borders and dividers: Muted Navy `#39406B`.
- Headings: Playfair Display.
- Body: Inter or Work Sans.
- Tone: confident, precise, and understated. No urgency language, exclamation points, or miracle claims.

## Implementation Steps

1. Initialize the app
   - Scaffold a Next.js App Router project.
   - Add TypeScript, ESLint, and basic formatting defaults.
   - Set up global styles, fonts, colors, and base layout metadata.

2. Build Shopify data access
   - Add a small Storefront API client.
   - Create GraphQL queries for the single product by handle or known identifier.
   - Create cart mutations for `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, and `cartLinesRemove` as needed.
   - Store the Shopify cart id in a browser cookie or local storage.

3. Build core pages
   - Homepage with hero, formula explanation, ingredient highlights, product CTA, and signup section.
   - Product page with product data from Shopify, fallback image treatment, ingredient content, and add-to-cart.
   - Cart view or cart drawer with line item quantity controls, subtotal display, and checkout CTA.

4. Implement checkout redirect
   - Use the cart's `checkoutUrl` from Shopify.
   - Redirect the visitor to Shopify hosted checkout.
   - Keep frontend payment responsibilities limited to cart creation and checkout redirect.

5. Add email signup
   - Start with a simple form and clear success/error states.
   - Wire to a provider or backend route once the destination is chosen.
   - Avoid blocking storefront launch on advanced email automation.

6. Handle content and edge cases
   - Display product title, price, description, and ingredients from Shopify when available.
   - Provide a polished placeholder state while product images are missing.
   - Show useful unavailable states if the product is draft, unpublished, or missing from the Storefront API.

7. Test the flow
   - Verify homepage and product page render without Shopify images.
   - Verify product data loads from Shopify Storefront API.
   - Verify add-to-cart creates or reuses a cart.
   - Verify checkout redirects to Shopify's hosted checkout URL.
   - Verify no private token appears in client bundles or browser-visible code.

8. Prepare for launch
   - Add minimal README setup instructions.
   - Configure Vercel environment variables.
   - Confirm Shopify product is published to the Storefront sales channel before launch.
   - Run lint and production build before deployment.

## Suggested File Structure

```text
app/
  layout.tsx
  page.tsx
  product/page.tsx
  cart/page.tsx
components/
  AddToCartButton.tsx
  CartSummary.tsx
  EmailSignup.tsx
  IngredientHighlights.tsx
  ProductDetails.tsx
lib/
  shopify/
    client.ts
    queries.ts
    cart.ts
styles/
  globals.css
docs/
  PLAN.md
```

## Key Risks

- The product is currently draft, so Storefront API reads may fail until it is published to the correct sales channel.
- Product images are not uploaded yet, so the first design pass must make placeholders look intentional.
- Email signup provider is not specified yet, so the form integration should stay isolated and easy to replace.
- Any server-side private token must not be exposed through public environment variables, client components, or serialized props.
