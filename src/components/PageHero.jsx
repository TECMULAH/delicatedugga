export default function PageHero({ eyebrow, title, lede }) {
  return (
    <section className="page-hero" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </section>
  );
}
