# CUIVRÉ Storefront

## Business Requirements

This project is a custom storefront for CUIVRÉ, a skincare brand launching a single product. Key features:
- A visitor can browse the homepage and product page
- A visitor can add the product to a cart and check out
- Checkout completes through Shopify's hosted checkout — Shopify handles payment, tax, shipping, and order creation
- An email signup section captures early-access / waitlist interest

## Limitations

For the MVP, this is a single-product store — no multi-product catalog browsing UI is needed beyond the homepage and one product page.

No customer accounts or login are required. Checkout is guest checkout via Shopify's hosted checkout page.

Payment, tax, shipping, and order management are entirely Shopify's responsibility. This frontend never touches card data or payment logic directly — it only creates a cart and redirects to the `checkoutUrl` Shopify returns.

## Technical Decisions

- Next.js frontend (App Router)
- Shopify Storefront API (GraphQL) for product/collection data and cart management — NOT the Admin API
- Cart is created and updated via the Storefront API (`cartCreate`, `cartLinesAdd`, etc.); checkout is handled by redirecting to the cart's `checkoutUrl` (Shopify-hosted)
- Public Storefront API access token is used client-side; if a private token is needed for server-side requests, it must stay server-only and never be exposed to the browser
- Environment variables: `PUBLIC_STOREFRONT_API_TOKEN`, `PUBLIC_STORE_DOMAIN=ajwufe-0z.myshopify.com`, `PRIVATE_STOREFRONT_API_TOKEN` (server-only, if used)
- Use npm for package management unless there's a reason to switch
- Deployment target: Vercel or an equivalent Node.js host

## Starting Point

No frontend code exists yet for this build — start from scratch.

The Shopify backend is already configured: one product exists in Shopify admin (status: Draft) — "Cuivré Copper Peptide Moisturizer — Coconut", placeholder price $68, full description and ingredient list already set.

Product images are not yet uploaded in Shopify. Handle missing product images gracefully until they're added.

A previous attempt styled the storefront through Shopify's built-in theme editor. That approach has been abandoned in favor of this custom frontend — ignore any existing theme customizations in Shopify admin.

## Color Scheme

- Deep Navy (background): `#141631`
- Cream (foreground/text): `#F5F0E6`
- Copper (accent — buttons, highlights): `#C08A5C`
- Muted Navy (borders/dividers): `#39406B`
- Headings: Playfair Display (serif)
- Body text: a clean sans-serif (e.g. Inter or Work Sans)

## Brand Voice

CUIVRÉ is built around GHK-Cu, one of the most studied copper peptides in skincare — but GHK-Cu is the foundation, not the whole formula. Ceramides restore the barrier; shea butter carries the moisture. The result is a complete formula, not a single-ingredient bet.
Voice: confident and precise, never clinical. We say what an ingredient does and stop — no exclamation points, no "miracle" language, no urgency. Understated luxury: the product should feel considered, not marketed at.
## Coding standards

1. Use latest stable versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No speculative features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
4. When hitting issues, always identify root cause before trying a fix. Do not guess. Prove with evidence, then fix the root cause.

## Working documentation

All documents for planning and executing this project will be in the docs/ directory. None exist yet — create docs/PLAN.md before starting a large or multi-step change.