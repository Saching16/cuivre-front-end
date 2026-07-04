const ingredients = [
  {
    name: "GHK-Cu",
    description:
      "A copper peptide selected as the foundation of the formula."
  },
  {
    name: "Ceramides",
    description: "Barrier-supporting lipids that help skin hold moisture."
  },
  {
    name: "Shea butter",
    description: "A rich emollient that gives the cream its cushioned finish."
  }
];

export function IngredientHighlights() {
  return (
    <section className="section" aria-labelledby="ingredients-heading">
      <div className="section-heading">
        <p className="eyebrow">Formula</p>
        <h2 id="ingredients-heading">Built as a complete moisturizer.</h2>
      </div>
      <div className="ingredient-grid">
        {ingredients.map((ingredient) => (
          <article className="ingredient-card" key={ingredient.name}>
            <h3>{ingredient.name}</h3>
            <p>{ingredient.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
