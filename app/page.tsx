import { EmailSignup } from "@/components/EmailSignup";
import { IngredientHighlights } from "@/components/IngredientHighlights";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-heading">
        <p className="eyebrow">Copper Peptide Moisturizer</p>
        <h1 id="hero-heading">Cuivré.</h1>
        <p className="hero-copy">
          GHK-Cu is the foundation. Ceramides restore the barrier. Shea butter
          carries the moisture. A precise formula for skin that feels cared for,
          not coated.
        </p>
        <a className="button" href="/product">
          View the formula
        </a>
      </section>
      <IngredientHighlights />
      <section className="section split-section">
        <div className="section-heading">
          <p className="eyebrow">Barrier care</p>
          <h2>Less noise. More structure.</h2>
        </div>
        <p className="section-copy">
          This is not a single-ingredient bet. CUIVRÉ pairs the studied copper
          peptide GHK-Cu with barrier lipids and a rich moisturizing base so the
          formula works as a whole.
        </p>
      </section>
      <EmailSignup />
    </main>
  );
}
