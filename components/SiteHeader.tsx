import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-mark" href="/">
        CUIVRÉ
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/product">Product</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  );
}
