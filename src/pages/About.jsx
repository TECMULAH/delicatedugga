import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { aboutImages } from "../data/site";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Delicate Dugga Pottery"
        lede="A Harare studio carrying the Ros Byrne collection forward, and painting a range of its own."
      />
      <section className="story" data-reveal>
        <img
          src={aboutImages.wheel}
          alt="Hands throwing a pot on the wheel"
        />
        <div className="prose">
          <p>
            Delicate Dugga is a home-run business established in Harare, Zimbabwe
            in June 2018, when we acquired Ros Byrne Pottery. We continue to
            produce the iconic Ros Byrne collection, and we are developing our
            own unique style and range, the Delicate Dugga Collection.
          </p>
          <p>
            These new designs, along with the Ros Byrne Collection, are an
            eclectic array of wild African animals and ethnic designs, inspired
            by the beauty of Africa. Each piece is hand thrown and individually
            hand painted by local artists: a synthesis of function and art.
          </p>
          <p>
            Their skill and workmanship are second to none, with particular
            focus on the quality and attention to the detail of each design.
          </p>
          <Link className="text-link" to="/team">
            Meet the people who make it
          </Link>
        </div>
      </section>
      <section className="trio" data-reveal>
        <figure>
          <img src={aboutImages.brushes} alt="Brushes standing in a painted mug" />
          <figcaption>Underglaze, brushes, and a steady hand.</figcaption>
        </figure>
        <figure>
          <img src={aboutImages.studio} alt="An artist decorating a mug" />
          <figcaption>Every design is painted individually.</figcaption>
        </figure>
        <figure>
          <img src={aboutImages.detail} alt="Detail of painted pottery" />
          <figcaption>Animals, plants, and patterns from this part of Africa.</figcaption>
        </figure>
      </section>
      <section className="quote-band" data-reveal>
        <img src={aboutImages.group} alt="The Delicate Dugga team" />
        <blockquote>
          <p>
            There is something special about being creative and designing pottery
            that feeds the soul.
          </p>
          <footer>Sascha Barr, owner</footer>
        </blockquote>
      </section>
    </>
  );
}
