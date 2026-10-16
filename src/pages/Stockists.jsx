import PageHero from "../components/PageHero";
import { contact, stockists } from "../data/site";

export default function Stockists() {
  return (
    <>
      <PageHero
        eyebrow="Our stockists"
        title="Find a piece in person."
        lede="Our shop is in Harare. You will also find Delicate Dugga at Victoria Falls, and in Copenhagen."
      />
      <section className="stock-grid">
        {stockists.map((place) => (
          <article key={place.name} className="stock-card" data-reveal>
            {place.image ? (
              <img src={place.image} alt={place.alt || place.name} />
            ) : (
              <div className="stock-fallback">{place.region}</div>
            )}
            <div>
              <p className="eyebrow">{place.region}</p>
              <h2>{place.name}</h2>
              <p>
                {place.lines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <a className="text-link" href={place.map} target="_blank" rel="noreferrer">
                Locate us here
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="note">
        <p>
          The Harare shop is {contact.shop}. Call{" "}
          <a href={contact.phoneHref}>{contact.phone}</a> or email{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> before you
          visit if you are looking for a particular design.
        </p>
      </section>
    </>
  );
}
